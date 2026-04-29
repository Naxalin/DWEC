// ==========================================
// PACIENTES — Listado
// ==========================================

async function renderPacientes() {
  showLoading();
  try {
    setApp(`
      <div class="page-header">
        <h1 class="page-title">Pacientes</h1>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Buscar</label>
          <input type="text" id="f-buscar" placeholder="Nombre, apellidos o email..." style="min-width:220px"/>
        </div>
        <div class="filter-group" style="justify-content:flex-end">
          <label>&nbsp;</label>
          <button class="btn btn-secondary" onclick="cargarPacientes()">Filtrar</button>
        </div>
      </div>

      <div class="table-wrapper">
        <div id="pacientes-tabla"><div class="loading">Cargando...</div></div>
      </div>
    `);

    document.getElementById('f-buscar').addEventListener('keydown', e => {
      if (e.key === 'Enter') cargarPacientes();
    });

    await cargarPacientes();
  } catch (err) {
    showError(err.message);
  }
}

async function cargarPacientes() {
  const buscar = document.getElementById('f-buscar')?.value || '';
  const params = new URLSearchParams();
  if (buscar) params.append('buscar', buscar);

  const contenedor = document.getElementById('pacientes-tabla');
  if (!contenedor) return;
  contenedor.innerHTML = '<div class="loading">Cargando...</div>';

  try {
    const pacientes = await apiFetch(`/api/pacientes?${params}`);

    if (!pacientes.length) {
      contenedor.innerHTML = '<p class="empty">No se encontraron pacientes.</p>';
      return;
    }

    contenedor.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${pacientes.map(p => `
            <tr>
              <td><a href="#/pacientes/${p.id}">${p.nombre} ${p.apellidos}</a></td>
              <td>${p.email}</td>
              <td>${p.telefono || '—'}</td>
              <td>${p.fecha_nacimiento ? new Date(p.fecha_nacimiento).toLocaleDateString('es-ES') : '—'}</td>
              <td>
                <a href="#/pacientes/${p.id}" class="btn btn-secondary btn-sm">Ver ficha</a>
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