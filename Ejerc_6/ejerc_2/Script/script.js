const boton = document.querySelector("#añadir");
const cuerpo = document.querySelector("table tbody");

boton.addEventListener("click", () => {
    const cuerpoTabla = document.createElement("tr");
    const nombre = document.createElement("td");
    const apellido = document.createElement("td");

    const nombreform = document.querySelector("#nombre");
    const apellidoform = document.querySelector("#apellido");

    nombre.textContent = nombreform.value;
    apellido.textContent = apellidoform.value;

    cuerpoTabla.appendChild(nombre);
    cuerpoTabla.appendChild(apellido);

    cuerpo.appendChild(cuerpoTabla);
}

)