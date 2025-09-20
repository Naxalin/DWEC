export function crearPerfil(nombre,email,edad){
    return { nombre: nombre, email: email, edad: edad };
}

export default function mostrarPerfil(usuario){
    return `Nombre ${usuario.nombre} Email: ${usuario.email} Edad: ${usuario.edad}`
}

export function obtenerMayoresDeEdad(usuarios) {
    return usuarios.filter((usuario) => esMayorEdad(usuario));
}

export function esMayorEdad(usuario){
    return usuario.edad >= 18 ? true : false;
}

export function calcularPromedioEdad(usuario){
    return usuario.reduce((total, usuario) => total + usuario.edad, 0) / usuario.length

    

}