async function renderPacienteDetalle(id) {
  showLoading();
  try {
    const paciente = await apiFetch(`/api/pacientes/${id}`);

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Ficha del paciente</h1>
        <div style="display:flex;gap:8px">
          <a href="#/pacientes/editar/${paciente.id}" class="btn btn-primary">Editar</a>
          <a href="#/pacientes" class="btn btn-secondary">← Volver</a>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Nombre completo</label>
            <span>${paciente.nombre} ${paciente.apellidos}</span>
          </div>
          <div class="detail-item">
            <label>Email</label>
            <span>${paciente.email}</span>
          </div>
          <div class="detail-item">
            <label>Teléfono</label>
            <span>${paciente.telefono || '—'}</span>
          </div>
          <div class="detail-item">
            <label>Fecha de nacimiento</label>
            <span>${paciente.fecha_nacimiento
              ? new Date(paciente.fecha_nacimiento).toLocaleDateString('es-ES')
              : '—'}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <h2 style="font-size:15px;font-weight:600">
            Historial de citas
            <span style="font-size:13px;font-weight:400;color:var(--gray-400);margin-left:6px">
              (${paciente.citas?.length || 0})
            </span>
          </h2>
          <a href="#/citas/nuevo" class="btn btn-primary btn-sm">+ Nueva cita</a>
        </div>

        ${paciente.citas && paciente.citas.length > 0 ? `
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha y hora</th>
                  <th>Médico</th>
                  <th>Especialidad</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${paciente.citas.map(c => `
                  <tr>
                    <td>${new Date(c.fecha_hora).toLocaleString('es-ES')}</td>
                    <td>
                      <a href="#/medicos/${c.medico?.id}">
                        ${c.medico?.nombre} ${c.medico?.apellidos}
                      </a>
                    </td>
                    <td>${c.medico?.especialidad?.nombre || '—'}</td>
                    <td>${c.motivo}</td>
                    <td>${badgeCita(c.estado)}</td>
                    <td>
                      <a href="#/citas/${c.id}" class="btn btn-secondary btn-sm">Ver cita</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : '<p class="empty">Este paciente no tiene citas registradas.</p>'}
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}