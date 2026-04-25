const usuarios = [
    { nombre: 'Gonzalo', edad: 22 },
    { nombre: 'Ana', edad: 20 }
];

function crearTablaUsuarios() {
    const tabla = document.createElement("table");
    const fragmento = document.createDocumentFragment();
   
    for (let i = 0; i < usuarios.length; i++) {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = usuarios[i].nombre;
        fila.appendChild(tdNombre);

        const tdEdad = document.createElement("td");
        tdEdad.textContent = usuarios[i].edad;
        fila.appendChild(tdEdad);

        tabla.appendChild(fila);
    }

    fragmento.appendChild(tabla);
    document.getElementById("contenedor-tabla").appendChild(fragmento);
}
