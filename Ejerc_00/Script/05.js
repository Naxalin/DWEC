const estudiante = {
    nombre : "",
    apellido : "",
    calificaciones : 0,
    aprobado : false
}

let estudiantes = [estudiante]

estudiantes.push({nombre: "PEPe", apellido: "Perez", calificaciones: 7, aprobado: true});
estudiantes.push({nombre: "Manola", apellido: "Peralta", calificaciones: 3, aprobado: false});
estudiantes.push({nombre: "Nel", apellido: "Lisboa", calificaciones: 6, aprobado: true});

console.table(estudiantes)

estudiantes = estudiantes.map((estudiante, index) => ({
    ...estudiante,
    id: index + 1
}));

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

console.table(estudiantes)