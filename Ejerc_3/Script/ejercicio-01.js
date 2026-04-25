let playList = [];

function cancion(titulo, artista, duracion) {
    this.titulo = titulo;
    this.artista = artista;
    this.duracion = duracion;
}
playList.push(new cancion("Song 1", "Artist 1", "3:30"));
playList.push(new cancion("Song 2", "Artist 2", "4:00"));
playList.push(new cancion("Song 3", "Artist 3", "2:45"));
playList.push(new cancion("Song 4", "Artist 4", "5:15"));
playList.push(new cancion("Song 4", "Artist 4", "5:15"));
playList.push(new cancion("Song 5", "Artist 5", "3:50"));
playList.push(new cancion("Song 4", "Artist 4", "5:15"));
playList.push(new cancion("Song 6", "Artist 6", "4:20"));
playList.push(new cancion("Song 7", "Artist 7", "3:10"));
playList.push(new cancion("Song 8", "Artist 8", "4:05"));

for(play of playList){
    console.log(play);
}