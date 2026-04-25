export let artistasGlobales = [];
export let albumesGlobales = [];

export const setDatos = (artistas, albumes) => {
  artistasGlobales = artistas;
  albumesGlobales = albumes;
};

export const obtenerArtistaPorId = (id) => {
  return artistasGlobales.find((a) => a.id === id);
};

export const obtenerAlbumesPorArtista = (artistaId) => {
  return albumesGlobales.filter((album) => album.artistaId === artistaId);
};

export const agregarArtista = (nombre, pais, foto) => {
  const nuevo = {
    id: Date.now(),
    nombre,
    pais,
    foto,
    genero: "Rock",
    formacion: "1960"
  };
  artistasGlobales.push(nuevo);
  return artistasGlobales;
};

export const actualizarArtista = (id, datos) => {
  const index = artistasGlobales.findIndex((a) => a.id === id);
  if (index !== -1) {
    artistasGlobales[index] = { ...artistasGlobales[index], ...datos };
  }
  return artistasGlobales;
};

export const eliminarArtista = (id) => {
  artistasGlobales = artistasGlobales.filter((a) => a.id !== id);
  return artistasGlobales;
};