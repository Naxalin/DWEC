
async function renderMedicoDetalle(id) {
  showLoading();
  try {
    const medico = await apiFetch(`/api/medicos/${id}`);

    setApp(`
      <div class="page-header">
        <h1 class="page-title">Ficha del médico</h1>
        <div style="display:flex;gap:8px">
          <a href="#/medicos/editar/${medico.id}" class="btn btn-secondary">Editar</a>
          <button class="btn btn-danger" onclick="eliminarMedicoDetalle(${medico.id})">Eliminar</button>
          <a href="#/medicos" class="btn btn-secondary">← Volver</a>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="detail-grid">
          <div class="detail-item">
            <label>Nombre completo</label>
            <span>${medico.nombre} ${medico.apellidos}</span>
          </div>
          <div class="detail-item">
            <label>Especialidad</label>
            <span>${medico.especialidad?.nombre || '—'}</span>
          </div>
          <div class="detail-item">
            <label>Email</label>
            <span>${medico.email}</span>
          </div>
          <div class="detail-item">
            <label>Teléfono</label>
            <span>${medico.telefono || '—'}</span>
          </div>
          <div class="detail-item">
            <label>Estado</label>
            <span>${badgeMedico(medico.estado)}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 style="font-size:15px;font-weight:600;margin-bottom:14px;">
          Citas de este médico
        </h2>
        ${medico.citas && medico.citas.length > 0 ? `
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Paciente</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${medico.citas.map(c => `
                  <tr>
                    <td>${new Date(c.fecha_hora).toLocaleString('es-ES')}</td>
                    <td>
                      <a href="#/pacientes/${c.paciente?.id}">
                        ${c.paciente?.nombre} ${c.paciente?.apellidos}
                      </a>
                    </td>
                    <td>${c.motivo}</td>
                    <td>${badgeCita(c.estado)}</td>
                    <td><a href="#/citas/${c.id}" class="btn btn-secondary btn-sm">Ver cita</a></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : '<p class="empty">Este médico no tiene citas registradas.</p>'}
      </div>
    `);
  } catch (err) {
    showError(err.message);
  }
}

async function eliminarMedicoDetalle(id) {
  if (!confirmDelete('¿Seguro que quieres eliminar este médico?')) return;
  try {
    await apiFetch(`/api/medicos/${id}`, { method: 'DELETE' });
    navigate('/medicos');
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
}