async function renderPacienteForm(id = null) {
  showLoading();
  try {
    let paciente = null;
    if (id) {
      paciente = await apiFetch(`/api/pacientes/${id}`);
    }

    const titulo = id ? 'Editar paciente' : 'Nuevo paciente';

    setApp(`
      <div class="page-header">
        <h1 class="page-title">${titulo}</h1>
        <a href="${id ? `#/pacientes/${id}` : '#/pacientes'}" class="btn btn-secondary">← Volver</a>
      </div>

      <div class="card">
        <form id="paciente-form" novalidate>
          <div class="form-grid">

            <div class="form-group">
              <label>Nombre *</label>
              <input type="text" name="nombre" required
                value="${paciente?.nombre || ''}"
                placeholder="Nombre del paciente"/>
            </div>

            <div class="form-group">
              <label>Apellidos *</label>
              <input type="text" name="apellidos" required
                value="${paciente?.apellidos || ''}"
                placeholder="Apellidos del paciente"/>
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input type="email" name="email" required
                value="${paciente?.email || ''}"
                placeholder="correo@ejemplo.com"/>
            </div>

            <div class="form-group">
              <label>Teléfono</label>
              <input type="tel" name="telefono"
                pattern="[0-9 +\\-]{9,15}"
                value="${paciente?.telefono || ''}"
                placeholder="612 345 678"/>
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento</label>
              <input type="date" name="fecha_nacimiento"
                value="${paciente?.fecha_nacimiento ? paciente.fecha_nacimiento.substring(0,10) : ''}"/>
            </div>

          </div>

          <div id="form-error" class="alert alert-error" style="display:none"></div>

          <div style="display:flex;gap:10px;margin-top:20px">
            <button type="submit" class="btn btn-primary">
              ${id ? 'Guardar cambios' : 'Crear paciente'}
            </button>
            <a href="${id ? `#/pacientes/${id}` : '#/pacientes'}" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    `);

    document.getElementById('paciente-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const datos = {
        nombre:           form.nombre.value.trim(),
        apellidos:        form.apellidos.value.trim(),
        email:            form.email.value.trim(),
        telefono:         form.telefono.value.trim() || null,
        fecha_nacimiento: form.fecha_nacimiento.value || null,
      };

      const errorDiv = document.getElementById('form-error');
      errorDiv.style.display = 'none';

      try {
        if (id) {
          await apiFetch(`/api/pacientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos)
          });
          navigate(`/pacientes/${id}`);
        } else {
          const nuevo = await apiFetch('/api/pacientes', {
            method: 'POST',
            body: JSON.stringify(datos)
          });
          navigate(`/pacientes/${nuevo.id}`);
        }
      } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
      }
    });

  } catch (err) {
    showError(err.message);
  }
}