// ==========================================
// CITA — Formulario alta / edición
// ==========================================

async function renderCitaForm(id = null) {
  showLoading();
  try {
    const [medicos, pacientes] = await Promise.all([
      apiFetch('/api/medicos'),
      apiFetch('/api/pacientes'),
    ]);

    let cita = null;
    if (id) {
      cita = await apiFetch(`/api/citas/${id}`);
    }

    // Formatear fecha para input datetime-local
    let fechaValue = '';
    if (cita?.fecha_hora) {
      const d = new Date(cita.fecha_hora);
      // yyyy-MM-ddThh:mm
      fechaValue = d.toISOString().slice(0, 16);
    }

    const titulo = id ? 'Editar cita' : 'Nueva cita';

    setApp(`
      <div class="page-header">
        <h1 class="page-title">${titulo}</h1>
        <a href="${id ? `#/citas/${id}` : '#/citas'}" class="btn btn-secondary">← Volver</a>
      </div>

      <div class="card">
        <div id="form-alert"></div>
        <form id="cita-form" onsubmit="submitCitaForm(event, ${id || 'null'})">
          <div class="form-grid">
            <div class="form-group">
              <label for="id_medico">Médico *</label>
              <select id="id_medico" name="id_medico" required>
                <option value="">Selecciona un médico...</option>
                ${medicos.map(m => `
                  <option value="${m.id}" ${cita?.id_medico === m.id ? 'selected' : ''}>
                    ${m.nombre} ${m.apellidos} — ${m.especialidad?.nombre || ''}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="id_paciente">Paciente *</label>
              <select id="id_paciente" name="id_paciente" required>
                <option value="">Selecciona un paciente...</option>
                ${pacientes.map(p => `
                  <option value="${p.id}" ${cita?.id_paciente === p.id ? 'selected' : ''}>
                    ${p.nombre} ${p.apellidos}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="fecha_hora">Fecha y hora *</label>
              <input
                type="datetime-local" id="fecha_hora" name="fecha_hora" required
                value="${fechaValue}"
              />
            </div>
            <div class="form-group">
              <label for="estado">Estado *</label>
              <select id="estado" name="estado" required>
                <option value="Pendiente"  ${!cita || cita.estado === 'Pendiente'  ? 'selected' : ''}>Pendiente</option>
                <option value="Completada" ${cita?.estado === 'Completada' ? 'selected' : ''}>Completada</option>
                <option value="Cancelada"  ${cita?.estado === 'Cancelada'  ? 'selected' : ''}>Cancelada</option>
              </select>
            </div>
            <div class="form-group full">
              <label for="motivo">Motivo *</label>
              <input
                type="text" id="motivo" name="motivo" required
                maxlength="255"
                value="${cita?.motivo || ''}"
              />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              ${id ? 'Guardar cambios' : 'Crear cita'}
            </button>
            <a href="${id ? `#/citas/${id}` : '#/citas'}" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function submitCitaForm(event, id) {
  event.preventDefault();
  const alertEl = document.getElementById('form-alert');
  alertEl.innerHTML = '';

  const fechaHora = document.getElementById('fecha_hora').value;

  // Validación: la fecha no puede ser en el pasado (solo en alta)
  if (!id && new Date(fechaHora) < new Date()) {
    alertEl.innerHTML = '<div class="alert alert-error">La fecha y hora no puede ser en el pasado.</div>';
    return;
  }

  const body = {
    id_medico:   Number(document.getElementById('id_medico').value),
    id_paciente: Number(document.getElementById('id_paciente').value),
    fecha_hora:  fechaHora,
    motivo:      document.getElementById('motivo').value.trim(),
    estado:      document.getElementById('estado').value,
  };

  try {
    if (id) {
      await apiFetch(`/api/citas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      navigate(`/citas/${id}`);
    } else {
      const nueva = await apiFetch('/api/citas', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      navigate(`/citas/${nueva.id}`);
    }
  } catch (err) {
    alertEl.innerHTML = `<div class="alert alert-error">${err.message}</div>`;
  }
}