import { getPrestamosPorUsuario } from '../api.js';

export async function mostrarUsuario() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <h2>Mis préstamos</h2>
    <div class="buscador">
      <input type="text" id="nombre" placeholder="Escribe tu nombre..." />
      <button onclick="buscar()">Buscar</button>
    </div>
    <div id="resultado"></div>
  `;

  window.buscar = async () => {
    const nombre = document.getElementById('nombre').value.trim();
    const resultado = document.getElementById('resultado');

    if (!nombre) {
      resultado.innerHTML = '<p class="error">Escribe un nombre.</p>';
      return;
    }

    resultado.innerHTML = '<p>Buscando...</p>';

    try {
      const prestamos = await getPrestamosPorUsuario(nombre);

      if (prestamos.length === 0) {
        resultado.innerHTML = '<p>No se encontraron préstamos.</p>';
        return;
      }

      resultado.innerHTML = `
        <div class="grid">
          ${prestamos.map(p => `
            <div class="card ${!p.fecha_entrega && new Date(p.fecha_devolucion) < new Date() ? 'vencido' : ''}">
              <h3>${p.titulo}</h3>
              <p class="autor">${p.autor}</p>
              <p>Préstamo: <strong>${p.fecha_prestamo}</strong></p>
              <p>Devolución: <strong>${p.fecha_devolucion}</strong></p>
              <p>Entregado: <strong>${p.fecha_entrega ?? 'Pendiente'}</strong></p>
            </div>
          `).join('')}
        </div>
      `;
    } catch (error) {
      resultado.innerHTML = `<p class="error">${error.message}</p>`;
    }
  };
}