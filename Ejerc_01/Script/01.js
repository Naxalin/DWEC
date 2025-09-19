const nombre = "Gonzalo"
let edad  = 21
const tieneMascota = true

edad = 22
//tieneMascota = false

console.log(nombre)
console.log(edad)
console.log(tieneMascota)

if(tieneMascota == false){
    console.log(`${nombre} tiene  ${edad} años y no tiene mascota`)
} else{
    console.log(`${nombre} tiene  ${edad} años y tiene mascota`)
}