// ==========================================
// CITAS — Listado con filtros
// ==========================================

async function renderCitas() {
  showLoading();
  try {
    const medicos = await apiFetch('/api/medicos');

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Citas</h1>
        <a href="#/citas/nuevo" class="btn btn-primary">+ Nueva cita</a>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Estado</label>
          <select id="f-estado">
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Médico</label>
          <select id="f-medico">
            <option value="">Todos</option>
            ${medicos.map(m => `<option value="${m.id}">${m.nombre} ${m.apellidos}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label>Fecha</label>
          <input type="date" id="f-fecha" />
        </div>
        <div class="filter-group" style="justify-content:flex-end">
          <label>&nbsp;</label>
          <button class="btn btn-secondary" onclick="cargarCitas()">Filtrar</button>
        </div>
      </div>

      <div class="table-wrapper">
        <div id="citas-tabla"><div class="loading">Cargando...</div></div>
      </div>
    `);

    await cargarCitas();
  } catch (err) {
    showError(err.message);
  }
}

async function cargarCitas() {
  const estado = document.getElementById('f-estado')?.value || '';
  const medico = document.getElementById('f-medico')?.value || '';
  const fecha  = document.getElementById('f-fecha')?.value || '';

  const params = new URLSearchParams();
  if (estado) params.append('estado', estado);
  if (medico) params.append('medico', medico);
  if (fecha)  params.append('fecha', fecha);

  const contenedor = document.getElementById('citas-tabla');
  if (!contenedor) return;
  contenedor.innerHTML = '<div class="loading">Cargando...</div>';

  try {
    const citas = await apiFetch(`/api/citas?${params}`);

    if (!citas.length) {
      contenedor.innerHTML = '<p class="empty">No se encontraron citas con esos filtros.</p>';
      return;
    }

    contenedor.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Fecha y hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${citas.map(c => `
            <tr>
              <td>${new Date(c.fecha_hora).toLocaleString('es-ES')}</td>
              <td>
                <a href="#/pacientes/${c.paciente?.id}">
                  ${c.paciente?.nombre} ${c.paciente?.apellidos}
                </a>
              </td>
              <td>
                <a href="#/medicos/${c.medico?.id}">
                  ${c.medico?.nombre} ${c.medico?.apellidos}
                </a>
              </td>
              <td>${c.motivo}</td>
              <td>${badgeCita(c.estado)}</td>
              <td>
                <a href="#/citas/${c.id}" class="btn btn-secondary btn-sm">Ver</a>
                <a href="#/citas/editar/${c.id}" class="btn btn-secondary btn-sm">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="eliminarCita(${c.id})">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    contenedor.innerHTML = `<div class="alert alert-error">${err.message}</div>`;
  }
}

async function eliminarCita(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar esta cita?')) return;
  try {
    await apiFetch(`/api/citas/${id}`, { method: 'DELETE' });
    await cargarCitas();
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}