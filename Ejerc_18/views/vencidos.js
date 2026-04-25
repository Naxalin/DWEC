import { getVencidos } from '../api.js';

export async function mostrarVencidos() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando...</p>';

  try {
    const prestamos = await getVencidos();

    if (prestamos.length === 0) {
      app.innerHTML = '<h2>Préstamos vencidos</h2><p>No hay préstamos vencidos.</p>';
      return;
    }

    app.innerHTML = `
      <h2>Préstamos vencidos</h2>
      <div class="grid">
        ${prestamos.map(p => `
          <div class="card vencido">
            <h3>${p.titulo}</h3>
            <p class="autor">${p.autor}</p>
            <p>Prestado a: <strong>${p.nombre_prestatario}</strong></p>
            <p>Venció el: <strong>${p.fecha_devolucion}</strong></p>
            <button onclick="window.navegar('/libro/${p.libro_id}')">Ver detalle</button>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    app.innerHTML = `<p class="error">${error.message}</p>`;
  }
}