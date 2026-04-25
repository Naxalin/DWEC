function añadirTarea(){
    let tarea = document.querySelector("#nueva-tarea").value;
    let lista_tareas = document.querySelector("#lista-tareas");
    console.log(tarea);
    if(tarea !== ""){
        let tareaAñadida = document.createElement("li");
        let botonDeBorrado = document.createElement("button");
        botonDeBorrado.textContent = "Borrar";

        lista_tareas.addEventListener("click", function(event) {
            if (event.target === botonDeBorrado) {
                lista_tareas.removeChild(tareaAñadida);
                lista_tareas.removeChild(botonDeBorrado);
            }
        });
        tareaAñadida.textContent  = tarea;
        console.log(tareaAñadida);
        lista_tareas.appendChild(tareaAñadida);
        lista_tareas.appendChild(botonDeBorrado);
    }
}