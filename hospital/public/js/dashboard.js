// ==========================================
// DASHBOARD
// ==========================================

async function renderDashboard() {
  showLoading();
  try {
    const data = await apiFetch('/api/dashboard');

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Dashboard</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">${data.totalMedicos}</div>
          <div class="stat-label">Médicos activos</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.totalPacientes}</div>
          <div class="stat-label">Pacientes</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.citasHoy}</div>
          <div class="stat-label">Citas hoy</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.citasPendientes}</div>
          <div class="stat-label">Pendientes</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.citasCompletadas}</div>
          <div class="stat-label">Completadas</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${data.mediaValoraciones ? Number(data.mediaValoraciones).toFixed(1) : '—'}</div>
          <div class="stat-label">Media valoraciones</div>
        </div>
      </div>

      <div class="card">
        <h2 style="font-size:15px;font-weight:600;margin-bottom:14px;">Últimas citas</h2>
        ${data.ultimasCitas && data.ultimasCitas.length > 0 ? `
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${data.ultimasCitas.map(c => `
                  <tr>
                    <td>${new Date(c.fecha_hora).toLocaleString('es-ES')}</td>
                    <td>
                      <a href="#/pacientes/${c.paciente?.id}">${c.paciente?.nombre} ${c.paciente?.apellidos}</a>
                    </td>
                    <td>
                      <a href="#/medicos/${c.medico?.id}">${c.medico?.nombre} ${c.medico?.apellidos}</a>
                    </td>
                    <td>${c.motivo}</td>
                    <td>${badgeCita(c.estado)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : '<p class="empty">No hay citas registradas.</p>'}
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}