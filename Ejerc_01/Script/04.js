const ciudades = [
    "Madrid", "Buenos Aires","Tokio","Nueva York","Paris"
]
ciudades.push("Roma")
const ciudadesMayusculas = ciudades.map(ciudades => ciudades.toUpperCase())
const ciudadesFiltradas = ciudades.filter(function(ciudades){
    if(ciudades.length > 6){
        return ciudades
    }
})

console.log(ciudades)
console.log(ciudadesMayusculas)
console.log(ciudadesFiltradas)