export function crearPerfil(nombre,email,edad){
    return nombre, email, edad
}

export default function mostrarPerfil(usuario){
    return `Nombre ${usuario.nombre} Email: ${usuario.email} Edad: ${usuario.edad}`
}

export function esMayorEdad(usuarios){
    mayores = []
    mayores = usuarios.filter(function(usuarios) {
        if(usuarios.edad >= 18) return usuarios
    }) 
}

export function calcularPromedioEdad(usuario){
    let suma = 0
    for(let i = 0; i < usuario.length; i++){
        suma = suma + usuario.edad
    }
    return suma / usuario.length

}