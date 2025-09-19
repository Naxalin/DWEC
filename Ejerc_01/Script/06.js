

function Estudiante (nombre, calificaciones){
   return {
    nombre: nombre,
    calificaciones: calificaciones
   } 
}


function curso (nombreCurso, nombreProfesor, estudiantes){
    return {
        nombreCurso: nombreCurso,
        nombreProfesor: nombreProfesor,
        listaEstudiantes: estudiantes
    }
}

function addEstudiante (){
    let nombre = ["Pepe", "Ana", "Luis", "Maria", "Juan", "Lucia", "Alberto", "Marta"]
    let lista = []
    lista.push(new Estudiante(nombre[Math.floor(Math.random() * nombre.length)], Math.floor(Math.random() * 11)))
    return lista
}



let cursos = []
cursos.push(new curso("DWEC", "Gonzalo", addEstudiante()))
cursos.push(new curso("DWES", "Ana", addEstudiante()))
cursos.push(new curso("DAW", "Luis", addEstudiante()))

console.table(cursos)