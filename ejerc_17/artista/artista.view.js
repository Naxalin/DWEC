export function mostrarArtista(artistas) {
  const contenedor = document.getElementById("albunes");
  let html = "";
  artistas.forEach(a => {
    html += `
      <div class="col-6 col-md-4 col-lg-3 mb-4 tarjeta" data-id="${a.id}">
        <div class="card h-100 border-0 shadow-sm p-3 text-center">
          <div class="d-flex justify-content-center mb-3">
            <img src="${a.foto}" class="rounded-circle object-fit-cover verDetalle" 
                 style="width: 150px; height: 150px; border: 1px solid #eee; cursor:pointer;">
          </div>
          <div class="card-body p-0">
            <h5 class="card-title fw-bold mb-2 verDetalle" style="cursor:pointer; color: #0d6efd;">${a.nombre}</h5>
            <div class="d-flex flex-column gap-1">
              <a href="#" class="text-decoration-none text-dark small editarArtistas" 
                 data-bs-toggle="modal" data-bs-target="#modalFormulario">Editar</a>
              <a href="#" class="text-decoration-none text-dark small eliminarArtistas">Eliminar</a>
            </div>
          </div>
        </div>
      </div>`;
  });
  contenedor.innerHTML = html;
}

export function mostrarDetalle(artista, albumes) {
  const contenedor = document.getElementById("albunes");
  contenedor.innerHTML = `
    <div class="container py-4">
      <div class="card shadow-sm border-0 p-4 mb-4">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            <img src="${artista.foto}" class="rounded-circle img-fluid shadow-sm" style="width: 180px; height: 180px; object-fit: cover;">
          </div>
          <div class="col-md-9">
            <h3 class="fw-bold text-primary">${artista.nombre}</h3>
            <p class="mb-1"><strong>País:</strong> ${artista.pais}</p>
            <p class="mb-1"><strong>Género:</strong> Rock</p>
          </div>
        </div>
      </div>
      <h4>Álbumes</h4>
      <table class="table table-hover mt-3">
        <thead class="table-primary"><tr><th colspan="2">Título</th></tr></thead>
        <tbody>
          ${albumes.map(alb => `<tr><td style="width:60px"><img src="${artista.foto}" width="45" class="rounded"></td><td>${alb.titulo}</td></tr>`).join('')}
        </tbody>
      </table>
      <button id="btnVolver" class="btn btn-link mt-3 text-decoration-none">← Volver a la lista de artistas</button>
    </div>`;
}