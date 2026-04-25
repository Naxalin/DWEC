import { getLibros } from '../api.js';

export async function mostrarCatalogo() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando...</p>';

  try {
    const libros = await getLibros();

    app.innerHTML = `
      <h2>Catálogo de libros</h2>
      <div class="grid">
        ${libros.map(l => `
          <div class="card">
            <h3>${l.titulo}</h3>
            <p class="autor">${l.autor}</p>
            <p class="isbn">ISBN: ${l.isbn ?? '—'}</p>
            <span class="estado ${l.estado === 'Disponible' ? 'disponible' : 'prestado'}">
              ${l.estado}
            </span>
            <button onclick="window.navegar('/libro/${l.id}')">Ver detalle</button>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    app.innerHTML = `<p class="error">${error.message}</p>`;
  }
}