function Estudiante (nombre, apellido, calificaciones){
    this.nombre = nombre;
    this.apellido = apellido;
    this.calificaciones = calificaciones;
    this.aprobado = false;
}

function revision (estudiantes){
    estudiantes.forEach(estudiante => {
        if(estudiante.calificaciones >= 5 ){
            estudiante.aprobado = true
        }
    });
}

let estudiantes = []

function notaAleatoria(){
    return Math.floor(Math.random() * 11)
}

estudiantes.push(new Estudiante("PEPe", "Perez", notaAleatoria()));
estudiantes.push(new Estudiante("Manola", "Peralta", notaAleatoria()));
estudiantes.push(new Estudiante("Nel", "Lisboa", notaAleatoria()));

revision(estudiantes)

index = 0
console.table(estudiantes)


estudiantes = estudiantes.map((estudiante) => ({
    ...estudiante,
    id: index + 1
}));

const aprobados =estudiantes.filter(function(estudiante){
    if(estudiante.calificaciones >= 5){
        console.log(`Felicidades ${estudiante.nombre}, has aprobado con la calificacion de ${estudiante.calificaciones}`)
        return estudiante
    }
})

console.table(estudiantes)