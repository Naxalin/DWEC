let playList = [];

function cancion(titulo, artista, duracion) {
    this.titulo = titulo;
    this.artista = artista;
    this.duracion = duracion;
}
playList.push(new cancion("Song 1", "Artist 1", 124));
playList.push(new cancion("Song 2", "Artist 2", 240));
playList.push(new cancion("Song 3", "Artist 3", 165));
playList.push(new cancion("Song 4", "Artist 4", 315));
playList.push(new cancion("Song 4", "Artist 4", 315));
playList.push(new cancion("Song 5", "Artist 5", 230));
playList.push(new cancion("Song 4", "Artist 4", "5:15"));
playList.push(new cancion("Song 6", "Artist 6", "4:20"));
playList.push(new cancion("Song 7", "Artist 7", "3:10"));
playList.push(new cancion("Song 8", "Artist 8", "4:05"));

for(play of playList){
    console.log(play);
}

let cancionesLargas = playList.filter(cancion => {
    return cancion.duracion > 180;
});

let MostrarLista = cancionesLargas.map(cancion => {
    return `La canción: ${cancion.titulo}, de ${cancion.artista}, dura: ${cancion.duracion} segundos.`;
});
console.log(MostrarLista);