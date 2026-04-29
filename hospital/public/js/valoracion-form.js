async function renderValoracionForm(id = null) {
  showLoading();
  try {
    const [medicos, pacientes] = await Promise.all([
      apiFetch('/api/medicos'),
      apiFetch('/api/pacientes'),
    ]);

    let v = null;
    if (id) {
      v = await apiFetch(`/api/valoraciones/${id}`);
    }

    const titulo = id ? 'Editar valoración' : 'Nueva valoración';

    setApp(`
      <div class="page-header">
        <h1 class="page-title">${titulo}</h1>
        <a href="${id ? `#/valoraciones/${id}` : '#/valoraciones'}" class="btn btn-secondary">← Volver</a>
      </div>

      <div class="card">
        <div id="form-alert"></div>
        <form id="valoracion-form" onsubmit="submitValoracionForm(event, ${id ? `'${id}'` : 'null'})">
          <div class="form-grid">
            <div class="form-group">
              <label for="id_medico">Médico *</label>
              <select id="id_medico" name="id_medico" required>
                <option value="">Selecciona un médico...</option>
                ${medicos.map(m => `
                  <option value="${m.id}" ${v?.id_medico === m.id ? 'selected' : ''}>
                    ${m.nombre} ${m.apellidos}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="id_paciente">Paciente *</label>
              <select id="id_paciente" name="id_paciente" required>
                <option value="">Selecciona un paciente...</option>
                ${pacientes.map(p => `
                  <option value="${p.id}" ${v?.id_paciente === p.id ? 'selected' : ''}>
                    ${p.nombre} ${p.apellidos}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="puntuacion">Puntuación (1-5) *</label>
              <input
                type="number" id="puntuacion" name="puntuacion"
                min="1" max="5" required
                value="${v?.puntuacion || ''}"
              />
            </div>
            <div class="form-group">
              <label for="estado">Estado *</label>
              <select id="estado" name="estado" required>
                <option value="Pendiente"  ${!v || v.estado === 'Pendiente'  ? 'selected' : ''}>Pendiente</option>
                <option value="Publicada"  ${v?.estado === 'Publicada'  ? 'selected' : ''}>Publicada</option>
                <option value="Ocultada"   ${v?.estado === 'Ocultada'   ? 'selected' : ''}>Ocultada</option>
              </select>
            </div>
            <div class="form-group full">
              <label for="comentario">Comentario</label>
              <textarea id="comentario" name="comentario" rows="4">${v?.comentario || ''}</textarea>
            </div>
            <div class="form-group">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input
                  type="checkbox" id="anonima" name="anonima"
                  ${v?.anonima ? 'checked' : ''}
                  style="width:16px;height:16px"
                />
                Publicar como anónima
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              ${id ? 'Guardar cambios' : 'Crear valoración'}
            </button>
            <a href="${id ? `#/valoraciones/${id}` : '#/valoraciones'}" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function submitValoracionForm(event, id) {
  event.preventDefault();
  const alertEl = document.getElementById('form-alert');
  alertEl.innerHTML = '';

  const puntuacion = Number(document.getElementById('puntuacion').value);

  if (puntuacion < 1 || puntuacion > 5) {
    alertEl.innerHTML = '<div class="alert alert-error">La puntuación debe estar entre 1 y 5.</div>';
    return;
  }

  const body = {
    id_medico:   Number(document.getElementById('id_medico').value),
    id_paciente: Number(document.getElementById('id_paciente').value),
    puntuacion,
    comentario:  document.getElementById('comentario').value.trim(),
    estado:      document.getElementById('estado').value,
    anonima:     document.getElementById('anonima').checked,
  };

  try {
    if (id) {
      await apiFetch(`/api/valoraciones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      navigate(`/valoraciones/${id}`);
    } else {
      const nueva = await apiFetch('/api/valoraciones', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      navigate(`/valoraciones/${nueva._id}`);
    }
  } catch (err) {
    alertEl.innerHTML = `<div class="alert alert-error">${err.message}</div>`;
  }
}