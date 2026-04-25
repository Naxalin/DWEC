window.addEventListener("scroll", () => {
    const barra = document.getElementById("barra-progreso");

    let alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let porcentajeBajado = (window.scrollY / alturaTotal) * 100;

    barra.style.width = porcentajeBajado + "%";

})
const boton = document.querySelector(".boton-derecha");

function volverArriba() {
    if (window.scrollY > window.innerHeight) {
        boton.classList.remove("oculto");
    } else {
        boton.classList.add("oculto");
    }
}

window.addEventListener("scroll", volverArriba);


boton.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
})