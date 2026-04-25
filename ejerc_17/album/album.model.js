// album.model.js

export let albumesCompletos = [];
export let artistasGlobales = [];

// -----------------------------
// Actualizar array de álbumes sin reasignar la exportación
// -----------------------------
export const setAlbumesCompletos = (nuevos) => {
  albumesCompletos.length = 0;
  albumesCompletos.push(...nuevos);
};

// -----------------------------
// Actualiza estado con álbumes y artistas
// -----------------------------
export const actualizarEstado = (datosAlb, artistas) => {
  artistasGlobales = artistas;

  albumesCompletos = datosAlb.map(alb => {
    const art = artistas.find(a => a.id == alb.artistaId) || {};
    return {
      id: alb.id,
      titulo: alb.titulo,
      artistaId: alb.artistaId || 0,
      artista: alb.artista || art.nombre || "Desconocido",
      pais: alb.pais || art.pais || "N/A",
      anio: alb.anio || "N/A",
      foto: alb.foto || "",
      genero: art.genero || "Manual" // heredado del artista si existe
    };
  });
};

// -----------------------------
// Genera opciones select artistas
// -----------------------------
export const generarOpcionesArtistas = () => {
  if (!artistasGlobales) return "";
  return artistasGlobales.map(a => `<option value="${a.id}">${a.nombre}</option>`).join("");
};
