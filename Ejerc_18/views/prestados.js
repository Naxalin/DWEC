import { getPrestados } from '../api.js';

export async function mostrarPrestados() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando...</p>';

  try {
    const libros = await getPrestados();

    if (libros.length === 0) {
      app.innerHTML = '<h2>Libros prestados</h2><p>No hay libros prestados.</p>';
      return;
    }

    app.innerHTML = `
      <h2>Libros prestados</h2>
      <div class="grid">
        ${libros.map(l => `
          <div class="card">
            <h3>${l.titulo}</h3>
            <p class="autor">${l.autor}</p>
            <p>Prestado a: <strong>${l.nombre_prestatario}</strong></p>
            <p>Devolución: <strong>${l.fecha_devolucion}</strong></p>
            <button onclick="window.navegar('/libro/${l.id}')">Ver detalle</button>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    app.innerHTML = `<p class="error">${error.message}</p>`;
  }
}