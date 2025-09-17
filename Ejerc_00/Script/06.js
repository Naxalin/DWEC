
let nombreCurso = ""
let nombreProfesor = ""

const estudiantes = {nombre : "", calificaciones: 0}

const cursos = [nombreCurso, nombreProfesor, estudiantes]
cursos.push({nombreCurso: "DWEC", nombreProfesor: "Gonzalo", estudiantes: estudiantes});
cursos.push({nombreCurso: "DWES", nombreProfesor: "Manolo", estudiantes: estudiantes});
cursos.push({nombreCurso: "DAW", nombreProfesor: "Nel", estudiantes: estudiantes});

resumenCursos = cursos.map((promedio, cursos) => ({
    ...promedio,
    promedio: (estudiantes.calificaciones / estudiantes.length)
}));

cursosDestacados = resumenCursos.filters(function(resumenCursos){
    if(resumenCursos.promedio >= 5){
        return resumenCursos
    }
        })

for (let i = 0; i < cursosDestacados.length; i++) {
    console.log(`El curso ${cursosDestacados[i].nombreCurso}tiene un promedio de ${cursosDestacados[i].promedio} es uno de los destacados`)
}