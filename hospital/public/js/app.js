const app = document.getElementById('app');

const routes = {
  '':                      () => renderDashboard(),
  '/dashboard':            () => renderDashboard(),
  '/medicos':              () => renderMedicos(),
  '/medicos/nuevo':        () => renderMedicoForm(),
  '/pacientes':            () => renderPacientes(),
  '/pacientes/nuevo':      () => renderPacienteForm(),
  '/citas':                () => renderCitas(),
  '/citas/nuevo':          () => renderCitaForm(),
  '/valoraciones':         () => renderValoraciones(),
  '/valoraciones/nuevo':   () => renderValoracionForm(),
};

function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/dashboard';
  return hash;
}

function navigate(hash) {
  window.location.hash = hash;
}

async function router() {
  const path = getRoute();

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const linkHash = link.getAttribute('href').replace('#', '');
    if (path === linkHash || (path === '' && linkHash === '/dashboard')) {
      link.classList.add('active');
    }
  });

  const medicoDetalleMatch    = path.match(/^\/medicos\/(\d+)$/);
  const medicoEditarMatch     = path.match(/^\/medicos\/editar\/(\d+)$/);
  const citaDetalleMatch      = path.match(/^\/citas\/(\d+)$/);
  const citaEditarMatch       = path.match(/^\/citas\/editar\/(\d+)$/);
  const pacienteDetalleMatch  = path.match(/^\/pacientes\/(\d+)$/);
  const pacienteEditarMatch   = path.match(/^\/pacientes\/editar\/(\d+)$/);
  const valoracionDetalleMatch= path.match(/^\/valoraciones\/([a-f0-9]+)$/);
  const valoracionEditarMatch = path.match(/^\/valoraciones\/editar\/([a-f0-9]+)$/);

  if (medicoEditarMatch)      return renderMedicoForm(medicoEditarMatch[1]);
  if (medicoDetalleMatch)     return renderMedicoDetalle(medicoDetalleMatch[1]);
  if (citaEditarMatch)        return renderCitaForm(citaEditarMatch[1]);
  if (citaDetalleMatch)       return renderCitaDetalle(citaDetalleMatch[1]);
  if (pacienteEditarMatch)    return renderPacienteForm(pacienteEditarMatch[1]);
  if (pacienteDetalleMatch)   return renderPacienteDetalle(pacienteDetalleMatch[1]);
  if (valoracionEditarMatch)  return renderValoracionForm(valoracionEditarMatch[1]);
  if (valoracionDetalleMatch) return renderValoracionDetalle(valoracionDetalleMatch[1]);

  const handler = routes[path];
  if (handler) {
    handler();
  } else {
    render404();
  }
}

function setApp(html) {
  app.innerHTML = html;
}

function showLoading() {
  app.innerHTML = '<div class="loading">Cargando...</div>';
}

function showError(msg = 'Ha ocurrido un error. Inténtalo de nuevo.') {
  app.innerHTML = `
    <div class="error-page">
      <h1>⚠️</h1>
      <h2>Algo ha ido mal</h2>
      <p>${msg}</p>
      <br>
      <a href="#/dashboard" class="btn btn-primary">Volver al inicio</a>
    </div>`;
}

function render404() {
  app.innerHTML = `
    <div class="error-page">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <br>
      <a href="#/dashboard" class="btn btn-primary">Volver al inicio</a>
    </div>`;
}

function badgeMedico(estado) {
  return estado === 'Activo'
    ? '<span class="badge badge-success">Activo</span>'
    : '<span class="badge badge-gray">Inactivo</span>';
}

function badgeCita(estado) {
  const map = {
    'Pendiente':  'badge-warning',
    'Completada': 'badge-success',
    'Cancelada':  'badge-danger',
  };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}

function badgeValoracion(estado) {
  const map = {
    'Publicada': 'badge-success',
    'Pendiente': 'badge-warning',
    'Ocultada':  'badge-danger',
  };
  return `<span class="badge ${map[estado] || 'badge-gray'}">${estado}</span>`;
}

function confirmDelete(message = '¿Estás seguro de que quieres eliminar este registro?') {
  return window.confirm(message);
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);