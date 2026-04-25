const pais = document.querySelector("#paisInput");

const boton = document.querySelector("button");

boton.addEventListener("click", () => {
    console.log("Pais: "+pais.value);
    const lista = document.querySelectorAll("#ciudadesLista li");
    const arrayLista = Array.from(lista);
    console.log("Array: "+arrayLista[1])

    const paises  = arrayLista.map(li => li.textContent.split(" - ")[1]);   
    console.log(paises);



arrayLista.forEach((element) => {
    const paisLi = element.textContent.split(" - ")[1]; // cogemos el país
    if(paisLi !== paisInput.value) {                   // comparamos con el input
        element.classList.add("oculto");              // ocultamos si no coincide
    } else {
        element.classList.remove("oculto");           // mostramos si coincide
    }
});

})