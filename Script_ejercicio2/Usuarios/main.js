import mostrarPerfil, {crearPerfil,  obtenerMayoresDeEdad, calcularPromedioEdad} from './gestorUsuarios.js'

const usuarios = []

usuarios.push(crearPerfil("pepe","pepe@gmail.com",4))
usuarios.push(crearPerfil("maria","maria@gmail.com",0))

usuarios.push(crearPerfil("juan","juan@gmail.com",44))
usuarios.push(crearPerfil("ana","ana@gmail.com",22))
usuarios.push(crearPerfil("luis","luis@gmail.com",17))

usuarios.forEach(usuario => {
    mostrarPerfil(usuario);
});
let MayoriaEdad = [] 
MayoriaEdad = obtenerMayoresDeEdad(usuarios)
let promedio = calcularPromedioEdad(usuarios)

console.log("-----Mostrar perfiles 1-----");
console.log(mostrarPerfil(usuarios[0]))
console.log("-----Mostrar perfiles 2-----");
console.log(mostrarPerfil(usuarios[1]))
console.log("-----Mostrar perfiles 3-----");
console.log(mostrarPerfil(usuarios[2]))
console.log("-----Usuarios mayores de edad-----");
console.log(MayoriaEdad)
console.log("-----Promedio de edad-----");
console.log(promedio)
