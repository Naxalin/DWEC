
async function renderValoracionDetalle(id) {
  showLoading();
  try {
    const v = await apiFetch(`/api/valoraciones/${id}`);

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Ficha de valoración</h1>
        <div style="display:flex;gap:8px">
          <a href="#/valoraciones/editar/${v._id}" class="btn btn-secondary">Editar</a>
          <button class="btn btn-danger" onclick="eliminarValoracionDetalle('${v._id}')">Eliminar</button>
          <a href="#/valoraciones" class="btn btn-secondary">← Volver</a>
        </div>
      </div>

      <div class="card">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Médico</label>
            <span>
              <a href="#/medicos/${v.id_medico}">${v.medicoNombre || v.id_medico}</a>
            </span>
          </div>
          <div class="detail-item">
            <label>Paciente</label>
            <span>
              ${v.anonima
                ? '<em style="color:var(--gray-400)">Anónimo</em>'
                : `<a href="#/pacientes/${v.id_paciente}">${v.pacienteNombre || v.id_paciente}</a>`
              }
            </span>
          </div>
          <div class="detail-item">
            <label>Puntuación</label>
            <span style="font-size:18px;color:#d97706">
              ${'★'.repeat(v.puntuacion)}${'☆'.repeat(5 - v.puntuacion)}
              <span style="font-size:13px;color:var(--gray-600);margin-left:4px">(${v.puntuacion}/5)</span>
            </span>
          </div>
          <div class="detail-item">
            <label>Estado</label>
            <span>${badgeValoracion(v.estado)}</span>
          </div>
          <div class="detail-item">
            <label>Anónima</label>
            <span>${v.anonima ? 'Sí' : 'No'}</span>
          </div>
          <div class="detail-item">
            <label>Fecha</label>
            <span>${new Date(v.fecha_creacion).toLocaleString('es-ES')}</span>
          </div>
          <div class="detail-item full" style="grid-column:1/-1">
            <label>Comentario</label>
            <span>${v.comentario || '—'}</span>
          </div>
        </div>
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function eliminarValoracionDetalle(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar esta valoración?')) return;
  try {
    await apiFetch(`/api/valoraciones/${id}`, { method: 'DELETE' });
    navigate('/valoraciones');
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}