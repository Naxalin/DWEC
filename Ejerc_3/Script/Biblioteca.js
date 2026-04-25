// Biblioteca
'use strict';
let libros = [];

function libro(titulo, autor, genero, paginas) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.paginas = paginas;
}

// 10 libros
libros.push(new libro("Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", 417));
libros.push(new libro("Don Quijote de la Mancha", "Miguel de Cervantes", "Novela", 863));
libros.push(new libro("La sombra del viento", "Carlos Ruiz Zafón", "Misterio", 576));
libros.push(new libro("El amor en los tiempos del cólera", "Gabriel García Márquez", "Romance", 348));
libros.push(new libro("La casa de los espíritus", "Isabel Allende", "Realismo mágico", 433));
libros.push(new libro("Ficciones", "Jorge Luis Borges", "Cuentos", 174));
libros.push(new libro("Rayuela", "Julio Cortázar", "Novela", 576));
libros.push(new libro("Pedro Páramo", "Juan Rulfo", "Realismo mágico", 124));
libros.push(new libro("El túnel", "Ernesto Sabato", "Novela", 160));
libros.push(new libro("La ciudad y los perros", "Mario Vargas Llosa", "Novela", 336));

// Agregar libros

export function agregarLibro(titulo, autor, genero, paginas) {
    const nuevoLibro = new libro(titulo, autor, genero, paginas);
    libros.push(nuevoLibro);
}

export function obtenerLibros() {
    return libros;
}   

// Ejercicio 4

export function buscarLibro(titulo) {
    let busqueda = libros.find((libro) => libro.titulo === titulo) || null;
    return busqueda;
}

// Eliminar
export function eliminarLibro(titulo) {
   const index = libros.findIndex((libro) => libro.titulo === titulo);
    return libros.splice(index, 1);
}

//Total de Paginas

export function cancularTotalDePaginas(){
    return libros.reduce((acum, libros) => acum + libros.paginas,0);
}

//Ordenar por paginas

export function ordenarPorPaginas(){
    return libros.sort((b, a) => a.paginas - b.paginas);
}

export function hayLibrosLargos(limitePaginas){
    return libros.some(libros => libros.paginas > limitePaginas)
}