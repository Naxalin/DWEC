const buscador = document.querySelector("#paises")
const lista = document.querySelectorAll("ul li");


buscador.addEventListener("input", () => {
    
    const palabras = buscador.value.toLowerCase();
    const listas = Array.from(lista);

    const filtradas = listas.filter(element => element.textContent.toLowerCase().includes(palabras));
    
    
    listas.forEach(element => {
        element.classList.add("oculto")
    })

    
    filtradas.forEach(palabra => palabra.classList.remove("oculto"));

   
})
