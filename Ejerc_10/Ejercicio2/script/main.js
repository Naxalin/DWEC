async function init() {
    console.log("Entro")
    documentos('documento_ultimo.xml');
    document.querySelectorAll('button').forEach((boton) => boton.addEventListener('click', (e) => {
        documentos(e.currentTarget.textContent);
    }));

}

async function documentos(nuevo) {
    const documentoCargado = await pedirDocumentos(nuevo)
    const documentoSIguientes = cargarDocument(documentoCargado);
    const anterior = document.getElementById("anterior")
    const siguiente = document.getElementById("siguiente")
    
    modificarBoton(anterior, documentoSIguientes[0]);
    modificarBoton(siguiente, documentoSIguientes[1]);

    historial(documentoCargado, nuevo);

}
function historial(dato, nuevo) {
    const ul = document.querySelector('ul');

    if (ul.querySelector(`[archivo="${nuevo}"]`)) return;

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action text-center text-muted';
    li.setAttribute('archivo', nuevo);
    li.textContent = `${dato.querySelector("titulo").textContent} - ${dato.querySelector("fecha").textContent}`;

    li.addEventListener('click', () => documentos(nuevo));

    ul.appendChild(li);
}



function pedirDocumentos(cargarDocument){
    return new Promise((resolve, reject) => {
        const xmlDocumento = new XMLHttpRequest(); 
        xmlDocumento.onload = () => {
            if(xmlDocumento.status == 200){
                resolve(xmlDocumento.response);
            } else if(xmlDocumento.status == 404){
                reject;
            } else { reject; }

        };
        xmlDocumento.onerror = reject;
        xmlDocumento.open("GET", `../xml/${cargarDocument}`, true); 
        xmlDocumento.responseType = 'document'
        xmlDocumento.setRequestHeader('Accept', 'text/html');
        
    xmlDocumento.send();
    });
}

function cargarDocument(dato){
    
    const lista = document.getElementById("lista");
    lista.innerHTML = `
    <div class="card shadow mx-auto my-4" style="max-width: 500px;">
    <div class="card-body text-center">
        <h2 class="card-title mb-3">${dato.querySelector("titulo").textContent}</h2>
        <p class="card-text text-muted">${dato.querySelector("fecha").textContent}</p>
        <img 
            class="img-fluid rounded mb-3 border"
            src="${dato.querySelector("imagen").textContent}" 
            alt="${dato.querySelector("imagen").textContent}"
        >
    </div>
    </div>
        `;

        return [dato.querySelector('anterior').textContent, dato.querySelector('siguiente').textContent];

}

function modificarBoton(boton, texto){
    if (texto != "null") {
        boton.disabled = false;
        boton.textContent = texto;
    } else {
        boton.disabled = true;
        boton.textContent = '...';
    }
    return boton;
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});