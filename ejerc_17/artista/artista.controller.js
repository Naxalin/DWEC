import * as Model from "./artista.model.js";
import * as View from "./artista.view.js";

let modoActual = "album";

// Configurar interfaz según modo (álbum / artista)
const configurarInterfaz = (modo) => {
  modoActual = modo;
  const btnNuevo = document.querySelector(".añadirNuevo");
  const modalTitulo = document.getElementById("modalFormularioLabel");
  const labelTitulo = document.querySelector("#form-album .mb-3:first-child .form-label");

  if (modo === "artista") {
    btnNuevo.textContent = "+ Nuevo Artista";
    modalTitulo.textContent = "Nuevo Artista";
    labelTitulo.textContent = "Nombre del Artista";
  } else {
    btnNuevo.textContent = "+ Nuevo Álbum";
    modalTitulo.textContent = "Nuevo Álbum";
    labelTitulo.textContent = "Título del Álbum";
  }
};

// Cargar artistas y sus álbumes
const cargarArtistas = async () => {
  try {
    const resArt = await fetch("/artistas").then(r => r.json());
    const resAlb = await fetch("/albumes").then(r => r.json());
    Model.setDatos(resArt, resAlb);
    View.mostrarArtista(Model.artistasGlobales);
    configurarInterfaz("artista");
  } catch (err) {
    console.error("Error al cargar artistas:", err);
  }
};

// Guardar artista (crear o actualizar)
const guardarArtista = async () => {
  const form = document.getElementById("form-album");
  const idEdicion = form.dataset.id;

  const datos = {
    nombre: document.getElementById("titulo").value || "Desconocido",
    pais: document.getElementById("pais").value || "N/A",
    foto: document.getElementById("foto").value || ""
  };

  try {
    if (idEdicion) {
      await fetch(`/artistas/${idEdicion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
    } else {
      await fetch("/artistas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });
    }

    cargarArtistas();
    form.reset();
    delete form.dataset.id;

    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalFormulario"));
    modal.hide();

    window.history.pushState({}, '', '/');
  } catch (err) {
    console.error("Error al guardar artista:", err);
    alert("Error al guardar el artista. Revisa la consola.");
  }
};

// Menú Artistas / Álbumes
document.getElementById("artistasMenu").addEventListener("click", e => {
  e.preventDefault();
  cargarArtistas();
});

document.getElementById("albumMenu").addEventListener("click", e => {
  e.preventDefault();
  configurarInterfaz("album");
  document.getElementById("albunes").innerHTML = "";
});

// Manejo de clicks en artistas
document.getElementById("albunes").addEventListener("click", async e => {
  const target = e.target;
  const tarjeta = target.closest("[data-id]");
  if (!tarjeta) return;
  const id = Number(tarjeta.dataset.id);

  if (target.classList.contains("verDetalle")) {
    View.mostrarDetalle(
      Model.obtenerArtistaPorId(id),
      Model.obtenerAlbumesPorArtista(id)
    );
    document.getElementById("btnVolver").onclick = () => View.mostrarArtista(Model.artistasGlobales);
  } else if (target.classList.contains("eliminarArtistas")) {
    await fetch(`/artistas/${id}`, { method: "DELETE" });
    cargarArtistas();
  } else if (target.classList.contains("editarArtistas")) {
    const art = Model.obtenerArtistaPorId(id);
    const form = document.getElementById("form-album");
    form.dataset.id = art.id;

    document.getElementById("titulo").value = art.nombre;
    document.getElementById("pais").value = art.pais;
    document.getElementById("foto").value = art.foto;

    configurarInterfaz("artista");
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalFormulario"));
    modal.show();
  }
});

document.getElementById("form-album").addEventListener("submit", e => {
  e.preventDefault();
  if (modoActual === "artista") guardarArtista();
});
