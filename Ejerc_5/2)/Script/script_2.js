function revelarRespuesta(respuesta) {
    let titulo = document.querySelectorAll("li p");
    titulo[respuesta].classList.toggle("oculto");


}
function ocultarTodasLasRespuestas() {
        let titulo = document.querySelectorAll("li p");
        titulo.forEach(element => {
            element.classList.add("oculto");
        });
    }

    