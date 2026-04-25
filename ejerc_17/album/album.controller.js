import * as Model from "./album.model.js";
import * as View from "./album.view.js";

// -----------------------------
// Cargar álbumes y artistas
// -----------------------------
const cargarTodo = async () => {
  try {
    console.log("🔹 Iniciando carga de álbumes y artistas");

    const resAlb = await fetch("/albumes").then(r => r.json());
    const resArt = await fetch("/artistas").then(r => r.json());

    console.log("✅ FETCH Álbumes:", resAlb);
    console.log("✅ FETCH Artistas:", resArt);

    // Actualizar el model
    Model.actualizarEstado(resAlb, resArt);

    console.log("🔹 Model.albumesCompletos:", Model.albumesCompletos);
    console.log("🔹 Model.artistasGlobales:", Model.artistasGlobales);

    // Renderizar
    View.actualizarEstado(Model.albumesCompletos);

    // Opciones select de artistas
    document.getElementById("artista").innerHTML = Model.generarOpcionesArtistas();
    console.log("🔹 Select de artistas cargado");
  } catch (err) {
    console.error("❌ Error al cargar álbumes:", err);
  }
};

// -----------------------------
// Guardar o actualizar álbum desde el formulario
// -----------------------------
const guardarAlbum = async () => {
  const form = document.getElementById("form-album");
  const idEdicion = form.dataset.id;

  const artistaSelect = document.getElementById("artista");
  const artistaId = Number(artistaSelect.value);
  const artistaObj = Model.artistasGlobales.find(a => a.id === artistaId) || {};

  console.log("🔹 Formulario datos:", {
    titulo: document.getElementById("titulo").value,
    artistaId,
    artistaObj
  });

  const data = {
    id: idEdicion ? Number(idEdicion) : Date.now(),
    titulo: document.getElementById("titulo").value || "Desconocido",
    artistaId: artistaId || 0,
    artista: artistaObj?.nombre || "Desconocido",
    pais: artistaObj?.pais || "N/A",
    anio: document.getElementById("anio").value || "N/A",
    foto: document.getElementById("foto").value || "",
    genero: artistaObj?.genero || "N/A"
  };

  console.log("🔹 Datos a enviar / renderizar:", data);

  const nuevosAlbumes = idEdicion
    ? Model.albumesCompletos.map(a => (a.id == idEdicion ? data : a))
    : [...Model.albumesCompletos, data];

  Model.setAlbumesCompletos(nuevosAlbumes);

  console.log("🔹 Model.albumesCompletos actualizado tras submit:", Model.albumesCompletos);

  // Renderizar inmediatamente
  View.renderizarAlbumes(Model.albumesCompletos);

  try {
    // Enviar al backend
    if (idEdicion) {
      await fetch(`/album/update/${idEdicion}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      await fetch("/album/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    // Limpiar form y cerrar modal
    form.reset();
    delete form.dataset.id;
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalFormulario"));
    modal.hide();
    console.log("🔹 Formulario limpiado y modal cerrado");
  } catch (err) {
    console.error("❌ Error al guardar álbum:", err);
  }
};

// -----------------------------
// Clicks en tarjetas: editar / eliminar
// -----------------------------
document.getElementById("albunes").addEventListener("click", async e => {
  const tarjeta = e.target.closest(".tarjeta");
  if (!tarjeta) return;
  const id = tarjeta.dataset.id;

  // ❌ Eliminar: dejamos como estaba
  if (e.target.closest(".eliminar")) {
    if (confirm("¿Eliminar álbum?")) {
      await fetch(`/album/delete/${id}`, { method: "GET" });
      cargarTodo();
    }
  }

  // Editar
  if (e.target.closest(".editar")) {
    const form = document.getElementById("form-album");
    form.dataset.id = id;

    const alb = Model.albumesCompletos.find(a => a.id == id);
    if (!alb) return;

    // Rellenar formulario con datos
    document.getElementById("titulo").value = alb.titulo;
    document.getElementById("artista").value = alb.artistaId;
    document.getElementById("anio").value = alb.anio;
    document.getElementById("pais").value = alb.pais;
    document.getElementById("foto").value = alb.foto;

    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalFormulario"));
    modal.show();
  }
});

// -----------------------------
// Submit del formulario
// -----------------------------
document.getElementById("form-album").addEventListener("submit", e => {
  e.preventDefault();
  guardarAlbum();
});

// -----------------------------
// Inicializar
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  cargarTodo();
});
