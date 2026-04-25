import { getLibroById, devolverPrestamo } from '../api.js';

export async function mostrarDetalle(id) {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando...</p>';

  try {
    const { libro, prestamo } = await getLibroById(id);

    app.innerHTML = `
      <h2>${libro.titulo}</h2>
      <div class="card detalle">
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p><strong>ISBN:</strong> ${libro.isbn ?? '—'}</p>
        <p><strong>Estado:</strong> 
          <span class="estado ${libro.estado === 'Disponible' ? 'disponible' : 'prestado'}">
            ${libro.estado}
          </span>
        </p>

        ${prestamo ? `
          <hr/>
          <p><strong>Prestado a:</strong> ${prestamo.nombre_prestatario}</p>
          <p><strong>Fecha préstamo:</strong> ${prestamo.fecha_prestamo}</p>
          <p><strong>Fecha devolución:</strong> ${prestamo.fecha_devolucion}</p>
          <button class="btn-devolver" onclick="devolver(${libro.id})">Registrar devolución</button>
        ` : `
          <button onclick="window.navegar('/prestamo/formulario/${libro.id}')">Prestar libro</button>
        `}

        <button class="btn-volver" onclick="window.navegar('/')">← Volver al catálogo</button>
      </div>
    `;

    window.devolver = async (libroId) => {
      try {
        await devolverPrestamo(libroId);
        mostrarDetalle(libroId);
      } catch (error) {
        alert(error.message);
      }
    };

  } catch (error) {
    app.innerHTML = `<p class="error">${error.message}</p>`;
  }
}