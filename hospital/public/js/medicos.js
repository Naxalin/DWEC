
async function renderMedicos() {
  showLoading();
  try {
    const especialidades = await apiFetch('/api/especialidades');

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Médicos</h1>
        <a href="#/medicos/nuevo" class="btn btn-primary">+ Nuevo médico</a>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Especialidad</label>
          <select id="f-especialidad">
            <option value="">Todas</option>
            ${especialidades.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label>Estado</label>
          <select id="f-estado">
            <option value="">Todos</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Buscar</label>
          <input type="text" id="f-buscar" placeholder="Nombre o email..." style="min-width:180px"/>
        </div>
        <div class="filter-group" style="justify-content:flex-end">
          <label>&nbsp;</label>
          <button class="btn btn-secondary" onclick="cargarMedicos()">Filtrar</button>
        </div>
      </div>

      <div class="table-wrapper">
        <div id="medicos-tabla"><div class="loading">Cargando...</div></div>
      </div>
    `);

    // Filtrar también al pulsar Enter en el buscador
    document.getElementById('f-buscar').addEventListener('keydown', e => {
      if (e.key === 'Enter') cargarMedicos();
    });

    await cargarMedicos();
  } catch (err) {
    showError(err.message);
  }
}

async function cargarMedicos() {
  const especialidad = document.getElementById('f-especialidad')?.value || '';
  const estado       = document.getElementById('f-estado')?.value || '';
  const buscar       = document.getElementById('f-buscar')?.value || '';

  const params = new URLSearchParams();
  if (especialidad) params.append('especialidad', especialidad);
  if (estado)       params.append('estado', estado);
  if (buscar)       params.append('buscar', buscar);

  const contenedor = document.getElementById('medicos-tabla');
  if (!contenedor) return;
  contenedor.innerHTML = '<div class="loading">Cargando...</div>';

  try {
    const medicos = await apiFetch(`/api/medicos?${params}`);

    if (!medicos.length) {
      contenedor.innerHTML = '<p class="empty">No se encontraron médicos con esos filtros.</p>';
      return;
    }

    contenedor.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${medicos.map(m => `
            <tr>
              <td><a href="#/medicos/${m.id}">${m.nombre} ${m.apellidos}</a></td>
              <td>${m.especialidad?.nombre || '—'}</td>
              <td>${m.email}</td>
              <td>${m.telefono || '—'}</td>
              <td>${badgeMedico(m.estado)}</td>
              <td>
                <a href="#/medicos/editar/${m.id}" class="btn btn-secondary btn-sm">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${m.id})">Eliminar</button>
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

async function eliminarMedico(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar este médico?')) return;
  try {
    await apiFetch(`/api/medicos/${id}`, { method: 'DELETE' });
    await cargarMedicos();
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}