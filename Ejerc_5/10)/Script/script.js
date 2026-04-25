const boton = document.querySelector("button");

boton.addEventListener("click", () => {
    const numeroLineas = document.querySelector("#cantidadParrafos");
    const divResultado = document.querySelector("#resultado")
    divResultado.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for(let i = 0; i<numeroLineas.value;i++){
        let parrafo = document.createElement("p")
        parrafo.innerHTML = "Lorem ipsum";
        console.log(parrafo);
        fragment.appendChild(parrafo);
    }
    console.log(fragment)
    divResultado.appendChild(fragment);
})