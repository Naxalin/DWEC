const botonesSubida = document.querySelector(".subir");
const botonesBajada = document.querySelector(".bajada");

function subir(elemt){
    const posicionActual = elemt.parentElement;
    const arriba = posicionActual.parentElement;
    const anterior=posicionActual.previousElementSibling
    console.log(arriba)
    console.log(posicionActual)
    if(arriba){
        arriba.insertBefore(posicionActual,anterior);
    }
}

function bajar(elemt){
    const posicionActual = elemt.parentElement;
    const abajo = posicionActual.parentElement;
    const siguiente=abajo.nextElementSibling

    if(abajo){
        abajo.insertBefore(posicionActual, siguiente);
    }
}


function subir(elemt) {
    const posicionActual = elemt.parentElement;
    const arriba = posicionActual.parentElement;
    const anterior = posicionActual.previousElementSibling;

    if (arriba && anterior) {
        arriba.insertBefore(posicionActual, anterior);
    }

    actualizarBotones();
}

function bajar(elemt) {
    const posicionActual = elemt.parentElement;
    const abajo = posicionActual.parentElement;
    const siguiente = posicionActual.nextElementSibling;

    if (abajo && siguiente) {
        abajo.insertBefore(siguiente, posicionActual);
    }

    actualizarBotones();
}

function actualizarBotones() {
    const lista = document.querySelectorAll('#lista li');

    lista.forEach((item, index) => {
        const btnSubir = item.querySelector('.subir');
        const btnBajar = item.querySelector('.bajar');

        btnSubir.disabled = false;
        btnBajar.disabled = false;

        if (index === 0) btnSubir.disabled = true;
        if (index === lista.length - 1) btnBajar.disabled = true;
    });
}

actualizarBotones();

