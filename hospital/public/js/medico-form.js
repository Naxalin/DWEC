
async function renderMedicoForm(id = null) {
  showLoading();
  try {
    const especialidades = await apiFetch('/api/especialidades');
    let medico = null;

    if (id) {
      medico = await apiFetch(`/api/medicos/${id}`);
    }

    const titulo = id ? 'Editar médico' : 'Nuevo médico';

    setApp(`
      <div class="page-header">
        <h1 class="page-title">${titulo}</h1>
        <a href="${id ? `#/medicos/${id}` : '#/medicos'}" class="btn btn-secondary">← Volver</a>
      </div>

      <div class="card">
        <div id="form-alert"></div>
        <form id="medico-form" onsubmit="submitMedicoForm(event, ${id || 'null'})">
          <div class="form-grid">
            <div class="form-group">
              <label for="nombre">Nombre *</label>
              <input
                type="text" id="nombre" name="nombre" required
                maxlength="100"
                value="${medico?.nombre || ''}"
              />
            </div>
            <div class="form-group">
              <label for="apellidos">Apellidos *</label>
              <input
                type="text" id="apellidos" name="apellidos" required
                maxlength="100"
                value="${medico?.apellidos || ''}"
              />
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email" id="email" name="email" required
                value="${medico?.email || ''}"
              />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input
                type="tel" id="telefono" name="telefono"
                pattern="[0-9+\\s\\-]{7,20}"
                value="${medico?.telefono || ''}"
              />
            </div>
            <div class="form-group">
              <label for="id_especialidad">Especialidad *</label>
              <select id="id_especialidad" name="id_especialidad" required>
                <option value="">Selecciona...</option>
                ${especialidades.map(e => `
                  <option value="${e.id}" ${medico?.id_especialidad === e.id ? 'selected' : ''}>
                    ${e.nombre}
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="estado">Estado *</label>
              <select id="estado" name="estado" required>
                <option value="Activo"   ${!medico || medico.estado === 'Activo'   ? 'selected' : ''}>Activo</option>
                <option value="Inactivo" ${medico?.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              ${id ? 'Guardar cambios' : 'Crear médico'}
            </button>
            <a href="${id ? `#/medicos/${id}` : '#/medicos'}" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function submitMedicoForm(event, id) {
  event.preventDefault();
  const alertEl = document.getElementById('form-alert');
  alertEl.innerHTML = '';

  const body = {
    nombre:          document.getElementById('nombre').value.trim(),
    apellidos:       document.getElementById('apellidos').value.trim(),
    email:           document.getElementById('email').value.trim(),
    telefono:        document.getElementById('telefono').value.trim(),
    id_especialidad: Number(document.getElementById('id_especialidad').value),
    estado:          document.getElementById('estado').value,
  };

  try {
    if (id) {
      await apiFetch(`/api/medicos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      navigate(`/medicos/${id}`);
    } else {
      const nuevo = await apiFetch('/api/medicos', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      navigate(`/medicos/${nuevo.id}`);
    }
  } catch (err) {
    alertEl.innerHTML = `<div class="alert alert-error">${err.message}</div>`;
  }
}