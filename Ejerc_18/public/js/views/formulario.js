import { getFormularioPrestamo, crearPrestamo } from '../api.js';

export async function mostrarFormulario(libroId) {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando...</p>';

  try {
    const { libro } = await getFormularioPrestamo(libroId);

    const hoy = new Date().toISOString().split('T')[0];

    app.innerHTML = `
      <h2>Nuevo préstamo</h2>
      <div class="card formulario">
        <p><strong>Libro:</strong> ${libro.titulo}</p>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <hr/>
        <div class="campo">
          <label>Nombre del prestatario</label>
          <input type="text" id="nombre" placeholder="Nombre completo" />
        </div>
        <div class="campo">
          <label>Fecha de préstamo</label>
          <input type="date" id="fecha_prestamo" value="${hoy}" />
        </div>
        <div class="campo">
          <label>Fecha de devolución</label>
          <input type="date" id="fecha_devolucion" />
        </div>
        <button onclick="enviarFormulario()">Confirmar préstamo</button>
        <button class="btn-volver" onclick="window.navegar('/libro/${libro.id}')">← Cancelar</button>
      </div>
    `;

    window.enviarFormulario = async () => {
      const nombre = document.getElementById('nombre').value.trim();
      const fecha_prestamo = document.getElementById('fecha_prestamo').value;
      const fecha_devolucion = document.getElementById('fecha_devolucion').value;

      if (!nombre || !fecha_prestamo || !fecha_devolucion) {
        alert('Rellena todos los campos.');
        return;
      }

      try {
        await crearPrestamo({ libro_id: libroId, nombre_prestatario: nombre, fecha_prestamo, fecha_devolucion });
        window.navegar(`/libro/${libroId}`);
      } catch (error) {
        alert(error.message);
      }
    };

  } catch (error) {
    app.innerHTML = `<p class="error">${error.message}</p>`;
  }
}