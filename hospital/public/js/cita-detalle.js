// ==========================================
// CITA — Ficha detalle (navegación contextual 2)
// ==========================================

async function renderCitaDetalle(id) {
  showLoading();
  try {
    const cita = await apiFetch(`/api/citas/${id}`);

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Ficha de cita</h1>
        <div style="display:flex;gap:8px">
          <a href="#/citas/editar/${cita.id}" class="btn btn-secondary">Editar</a>
          <button class="btn btn-danger" onclick="eliminarCitaDetalle(${cita.id})">Eliminar</button>
          <a href="#/citas" class="btn btn-secondary">← Volver</a>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Fecha y hora</label>
            <span>${new Date(cita.fecha_hora).toLocaleString('es-ES')}</span>
          </div>
          <div class="detail-item">
            <label>Estado</label>
            <span>${badgeCita(cita.estado)}</span>
          </div>
          <div class="detail-item">
            <label>Motivo</label>
            <span>${cita.motivo}</span>
          </div>
        </div>
      </div>

      <!-- Navegación contextual: cita → médico -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card">
          <h2 style="font-size:14px;font-weight:600;color:var(--gray-400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:12px">Médico</h2>
          <div style="margin-bottom:8px">
            <strong>${cita.medico?.nombre} ${cita.medico?.apellidos}</strong>
          </div>
          <div style="font-size:13px;color:var(--gray-600);margin-bottom:4px">
            ${cita.medico?.especialidad?.nombre || '—'}
          </div>
          <div style="font-size:13px;color:var(--gray-600);margin-bottom:12px">
            ${cita.medico?.email}
          </div>
          <a href="#/medicos/${cita.medico?.id}" class="btn btn-secondary btn-sm">
            Ver ficha del médico →
          </a>
        </div>

        <!-- Navegación contextual: cita → paciente -->
        <div class="card">
          <h2 style="font-size:14px;font-weight:600;color:var(--gray-400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:12px">Paciente</h2>
          <div style="margin-bottom:8px">
            <strong>${cita.paciente?.nombre} ${cita.paciente?.apellidos}</strong>
          </div>
          <div style="font-size:13px;color:var(--gray-600);margin-bottom:4px">
            ${cita.paciente?.email}
          </div>
          <div style="font-size:13px;color:var(--gray-600);margin-bottom:12px">
            ${cita.paciente?.telefono || '—'}
          </div>
          <a href="#/pacientes/${cita.paciente?.id}" class="btn btn-secondary btn-sm">
            Ver ficha del paciente →
          </a>
        </div>
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function eliminarCitaDetalle(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar esta cita?')) return;
  try {
    await apiFetch(`/api/citas/${id}`, { method: 'DELETE' });
    navigate('/citas');
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}