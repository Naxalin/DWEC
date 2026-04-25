import {crearPerfil,  esMayorEdad, calcularPromedioEdad} from './gestorUsuarios.js'

const usuarios = []

usuarios = crearPerfil("pepe","pepe@gmail.com",34)
usuarios = crearPerfil("maria","maria@gmail.com",30)

array.forEach(usuarios => {
    mostrarPerfil(usuarios)
});

console.log(esMayorEdad(usuarios))
console.log(calcularPromedioEdad(usuarios))
