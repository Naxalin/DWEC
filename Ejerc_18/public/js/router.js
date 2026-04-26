import { mostrarCatalogo } from './views/catalogo.js';
import { mostrarPrestados } from './views/prestados.js';
import { mostrarVencidos } from './views/vencidos.js';
import { mostrarUsuario } from './views/usuario.js';
import { mostrarDetalle } from './views/detalle.js';
import { mostrarFormulario } from './views/formulario.js';

const rutas = {
  '/'          : mostrarCatalogo,
  '/prestados' : mostrarPrestados,
  '/vencidos'  : mostrarVencidos,
  '/usuario'   : mostrarUsuario,
};

function manejarRuta(pathname) {
  const detalle = pathname.match(/^\/libro\/(\d+)$/);
  if (detalle) return mostrarDetalle(detalle[1]);

  const formulario = pathname.match(/^\/prestamo\/formulario\/(\d+)$/);
  if (formulario) return mostrarFormulario(formulario[1]);

  const vista = rutas[pathname];
  if (vista) return vista();

  document.getElementById('app').innerHTML = '<p>Página no encontrada</p>';
}

function navegar(url) {
  history.pushState({}, '', url);
  manejarRuta(window.location.pathname);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navegar(link.getAttribute('href'));
    });
  });

  manejarRuta(window.location.pathname);
});

window.addEventListener('popstate', () => {
  manejarRuta(window.location.pathname);
});

window.navegar = navegar;