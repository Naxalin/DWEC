
setTimeout(abrir, 5000);

function abrir(){
    window.open("./pages/popup.html", "popupWindow", "width=400,height=300");
}

function cerrar(){
    window.close("./pages/popup.html", "popupWindow", "width=400,height=300");
}

const boton = document.querySelector(".boton")
console.log(boton)
boton.addEventListener("click", () => {
    cerrar();
    abrir()
})

const botonCerrado = document.querySelector(".cerrar")
botonCerrado.addEventListener("click", () => {
    popupWindow.close();

})
