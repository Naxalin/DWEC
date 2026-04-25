/*
### Ejercicio 2.4: Combinación de Objetos y Optional Chaining

1. Crea un objeto `usuario` con `nombre` y `email`.
2. Crea un objeto `perfil` con `puesto` y `empresa`.
3. Combina ambos objetos en un nuevo objeto `empleado` usando el “spread operator” (`...`).
4. Supongamos que el objeto `empleado` podría tener o no una propiedad anidada `perfil.direccion.ciudad`. Intenta acceder a `empleado.perfil.direccion.ciudad` usando “Optional Chaining” (`?.`) para evitar errores.
5. Usa el “Nullish Coalescing Operator” (`??`) para asignar un valor por defecto (“Ciudad no especificada”) si el resultado del paso anterior es `null` o `undefined`.
*/ 


const usuario = {
    nombre : "pedro",
    email : "pedro@gmail.com",
    direccion : {
        ciudad : null
    }
}
const perfil ={
    puesto : "programador",
    empresa : "conecta"
}



const empleado = {...perfil, ...usuario};

console.table(empleado)
console.log(usuario.ciudad ?? "Oviedo")

console.log(usuario?.ciudad)
