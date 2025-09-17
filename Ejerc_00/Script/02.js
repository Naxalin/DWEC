// COCHE

let coche = {
     Marca : "Toyota",
     modelo : "Yaris Cross Business Plus",
     color : "azul",
     anio : 2025,
     estaDisponible : false
}

console.table(coche)
coche.estaDisponible = true
delete coche.anio

console.table(coche)