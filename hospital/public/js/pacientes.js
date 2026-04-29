async function renderPacientes() {
  showLoading();
  try {
    setApp(`
      <div class="page-header">
        <h1 class="page-title">Pacientes</h1>
        <a href="#/pacientes/nuevo" class="btn btn-primary">+ Nuevo paciente</a>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Buscar</label>
          <input type="text" id="f-buscar" placeholder="Nombre, apellidos o email..." style="min-width:220px"/>
        </div>
        <div class="filter-group" style="justify-content:flex-end">
          <label>&nbsp;</label>
          <button class="btn btn-secondary" id="btn-filtrar">Filtrar</button>
        </div>
      </div>

      <div class="table-wrapper">
        <div id="pacientes-tabla"><div class="loading">Cargando...</div></div>
      </div>
    `);

    document.getElementById('btn-filtrar').addEventListener('click', cargarPacientes);
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
                <a href="#/pacientes/${p.id}" class="btn btn-secondary btn-sm">Ver</a>
                <a href="#/pacientes/editar/${p.id}" class="btn btn-secondary btn-sm">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${p.id})">Eliminar</button>
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

async function eliminarPaciente(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar este paciente? Se eliminarán también sus citas.')) return;
  try {
    await apiFetch(`/api/pacientes/${id}`, { method: 'DELETE' });
    await cargarPacientes();
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}

window.eliminarPaciente = eliminarPaciente;