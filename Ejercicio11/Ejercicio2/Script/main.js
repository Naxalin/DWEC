async function init() {
    const datos = await agarrarComentarios();
    cargarComentarios(datos);
}

async function agarrarComentarios() {
    return new Promise((resolve, reject) => {
        const coment = new XMLHttpRequest();
        coment.onload = () => {

            if (coment.status === 200) {
                console.log("Entro");
                resolve(coment.response);
            } else if (coment.status === 404) {
                alert("Archivo no encontrado");
                reject("Error 404");
            } else {
                reject("Error desconocido");
            }
        };
        coment.onerror = () => reject("Error de conexión o de red");
        coment.open('GET', '../data/comments_initial.json', true);
        coment.responseType = 'json';
        coment.setRequestHeader('Accept', 'application/json');
        coment.send();
    });
}

const boton = document.querySelector("button");
boton.addEventListener("click", () =>{
    const nombre = document.querySelector("#autor").value;
    const comentario = document.querySelector("#comentario").value;

    const comentariosPost = { user: nombre, comment: comentario };

    comentarios.innerHTML += `<li>${nombre}: ${comentario} | ${new Date().toISOString()}</li>`;
    enviarComentario(comentariosPost);
    document.querySelector("#comentario").value = "";

})


function enviarComentario(comentario) {
    fetch("https://webhook.site/7b0f8abc-2126-49bb-97be-e2477783f9af", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario),
        mode: "no-cors" 
    })
    .then(() => {
        console.log("Comentario enviado (no se puede leer respuesta en no-cors).");
    })
    .catch(err => {
        console.error("Error de red al enviar:", err);
    });
}




function cargarComentarios(datosCargados){
    const comentarios = document.querySelector("ul");
    console.log(datosCargados)
    datosCargados.forEach(element => {
        comentarios.innerHTML += `<li>${element.user}: ${element.comment} | ${new Date().toISOString()}</li>`;
    });

}

document.addEventListener("DOMContentLoaded", init);
