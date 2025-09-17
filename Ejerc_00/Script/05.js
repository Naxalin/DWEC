const estudiante = {
    nombre : "",
    apellido : "",
    calificaciones : 0,
    aprobado : false
}

let estudiantes = [estudiante]

estudiantes.push("PEPe","perez",7,true)
estudiantes.push("manola","Peralta",3,false)
estudiantes.push("Nel","lisboa",6,true)
let posicion = 0
const registro = estudiantes.map((posicion,estudiantes) => {
    posicion +1
    return posicion
})

const aprobados =estudiantes.filter(function(estudiante){
    if(estudiante.calificaciones >= 5){
        console.log(`Felicidades ${estudiante.nombre}, has aprobado con la calificacion de ${estudiante.calificaciones}`)
        return estudiante
    }
})

function revision (estudiantes){
    if(estudiantes.calificaciones < 5 & estudiantes.calificaciones == true ){
        estudiante.aprobado = false
    }
}

console.table(registro)