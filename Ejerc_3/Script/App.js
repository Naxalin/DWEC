// APP
'use strict';

import {agregarLibro,ordenarPorPaginas,hayLibrosLargos, cancularTotalDePaginas, obtenerLibros,buscarLibro, eliminarLibro } from  './Biblioteca.js';


console.log(obtenerLibros());
agregarLibro("1984", "George Orwell", "Distopía", 328);
console.log(obtenerLibros());

let resultado = buscarLibro("1984");
console.log("Buscado: ", resultado);


const libroEliminado = eliminarLibro("Cien años de soledad");


console.log(obtenerLibros());

console.log(cancularTotalDePaginas())

console.log(ordenarPorPaginas());
console.log(hayLibrosLargos(100))
