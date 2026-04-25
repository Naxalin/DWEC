import datos from './Datos/datos.js';


window.addEventListener("popstate", function (event) {
    let stateObj = event.state; // guarda el estado actual de la pagina que seria el contenido

    loadContent();
})

function changePage (event) {
    event.preventDefault();
    let stateObj = event.currentTarget.hash;
    history.pushState({}, "", stateObj); // Es el historial de navegacion
    loadContent()
}

function loadContent(event){
    let seccion = window.location.hash.substring(1).toLowerCase(); // quita el "#" para sacar los enlaces
    if(!seccion) seccion = 'inicio' // si no tiene nada empieza en el inicio
    document.getElementById("paginas").innerHTML = datos[seccion]; // lo mete en el div
}
