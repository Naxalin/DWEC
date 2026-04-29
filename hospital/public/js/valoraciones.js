async function renderValoraciones() {
  showLoading();
  try {
    const medicos = await apiFetch('/api/medicos');

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Valoraciones</h1>
        <a href="#/valoraciones/nuevo" class="btn btn-primary">+ Nueva valoración</a>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Estado</label>
          <select id="f-estado">
            <option value="">Todos</option>
            <option value="Publicada">Publicada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Ocultada">Ocultada</option>
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
          <label>Puntuación mínima</label>
          <select id="f-puntuacion">
            <option value="">Cualquiera</option>
            <option value="1">★ 1+</option>
            <option value="2">★★ 2+</option>
            <option value="3">★★★ 3+</option>
            <option value="4">★★★★ 4+</option>
            <option value="5">★★★★★ 5</option>
          </select>
        </div>
        <div class="filter-group" style="justify-content:flex-end">
          <label>&nbsp;</label>
          <button class="btn btn-secondary" id="btn-filtrar">Filtrar</button>
        </div>
      </div>

      <div class="table-wrapper">
        <div id="valoraciones-tabla"><div class="loading">Cargando...</div></div>
      </div>
    `);

    document.getElementById('btn-filtrar').addEventListener('click', cargarValoraciones);

    await cargarValoraciones();
  } catch (err) {
    showError(err.message);
  }
}

async function cargarValoraciones() {
  const estado     = document.getElementById('f-estado')?.value || '';
  const medico     = document.getElementById('f-medico')?.value || '';
  const puntuacion = document.getElementById('f-puntuacion')?.value || '';

  const params = new URLSearchParams();
  if (estado)     params.append('estado', estado);
  if (medico)     params.append('id_medico', medico);
  if (puntuacion) params.append('puntuacion', puntuacion);

  const contenedor = document.getElementById('valoraciones-tabla');
  if (!contenedor) return;
  contenedor.innerHTML = '<div class="loading">Cargando...</div>';

  try {
    const valoraciones = await apiFetch(`/api/valoraciones?${params}`);

    if (!valoraciones.length) {
      contenedor.innerHTML = '<p class="empty">No se encontraron valoraciones con esos filtros.</p>';
      return;
    }

    contenedor.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Puntuación</th>
            <th>Comentario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${valoraciones.map(v => `
            <tr>
              <td>${new Date(v.fecha_creacion).toLocaleDateString('es-ES')}</td>
              <td>${v.nombreMedico || '—'}</td>
              <td>${v.anonima ? '<em style="color:var(--gray-400)">Anónimo</em>' : (v.nombrePaciente || '—')}</td>
              <td>${estrellas(v.puntuacion)}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                ${v.comentario || '—'}
              </td>
              <td>${badgeValoracion(v.estado)}</td>
              <td>
                <a href="#/valoraciones/${v._id}" class="btn btn-secondary btn-sm">Ver</a>
                <a href="#/valoraciones/editar/${v._id}" class="btn btn-secondary btn-sm">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="eliminarValoracion('${v._id}')">Eliminar</button>
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

async function eliminarValoracion(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar esta valoración?')) return;
  try {
    await apiFetch(`/api/valoraciones/${id}`, { method: 'DELETE' });
    await cargarValoraciones();
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}

window.eliminarValoracion = eliminarValoracion;

function estrellas(n) {
  const llenas = '★'.repeat(n);
  const vacias = '☆'.replace(5 - n);
  return `<span style="color:#d97706;letter-spacing:1px">${llenas}${vacias}</span>`;
}