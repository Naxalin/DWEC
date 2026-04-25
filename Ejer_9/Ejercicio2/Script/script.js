
    setInterval(() => {tamanio()
    }, 700);

    setInterval(() => {XY()
    }, 250);

    setInterval(() => {estado()
    }, 250);


function tamanio(){
    const ancho = document.getElementById("InnerW")
    const alto = document.getElementById("InnerH")

    ancho.textContent = window.innerWidth;
    alto.textContent = window.innerHeight;
}

document.addEventListener("DOMContentLoaded", () => {
    const ancho = document.getElementById("outerW")
    const alto = document.getElementById("outerH")

    ancho.textContent = window.outerWidth;
    alto.textContent = window.outerHeight;
})

document.addEventListener("DOMContentLoaded", () => {
    const ancho = document.getElementById("screenX")
    const alto = document.getElementById("screenY")

    ancho.textContent = screen.width;
    alto.textContent = screen.height;
})


document.addEventListener("DOMContentLoaded", () => {
    const ancho = document.getElementById("availW")
    const alto = document.getElementById("availH")

    ancho.textContent = screen.availWidth;
    alto.textContent = screen.availHeight;
})

function estado () {
    const estado = document.getElementById("state");
    if(navigator.onLine){
        estado.textContent = "Online";
        estado.style.color = "green";
    } else {
        estado.textContent = "OffLine";
        estado.style.color = "red";
    }
    
}

function XY () {
    const ancho = document.getElementById("posicionX")
    const alto = document.getElementById("posicionY")

    ancho.textContent = window.screenX;
    alto.textContent = window.screenY;
}