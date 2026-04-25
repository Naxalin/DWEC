const boton = document.querySelector("button");

boton.addEventListener("click", () =>{
    console.log("DETECTA EL CLICK");

    const lista = document.querySelectorAll("li");
    console.log(lista)

    const arrayLista = Array.from(lista);
    console.log(arrayLista[1])
    arrayLista.sort((a, b) => a.textContent.localeCompare(b.textContent))

    const listaCompleta = arrayLista[0].parentElement;
    listaCompleta.innerHTML = "";
    
    arrayLista.forEach(li => listaCompleta.appendChild(li) );
})
