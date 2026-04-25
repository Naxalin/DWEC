const boton = document.querySelector(".enviar");
const check = document.querySelector("#accepto");

check.addEventListener("change", () =>{
    console.log("Entre")
    boton.disabled  = !check.checked;
})