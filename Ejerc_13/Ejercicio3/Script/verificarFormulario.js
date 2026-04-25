const form = document.querySelector("form");
const nameFormError = form.querySelector("#nombreError");
const lastNameFormError = form.querySelector("#apellidoError")
const emailFormError = form.querySelector("#emailError");
const urlFormError = form.querySelector("#urlError");
const btnEnviar = document.querySelector(".guardar")

console.log("FUNCIONO")
form.addEventListener('input', e => {
    e.preventDefault();

    const datosFormulario = Object.fromEntries(new FormData(form))
    const errores = Errores(datosFormulario);
    console.log(errores)

    btnEnviar.disabled = errores;
});

function Errores(form){
    let hayErrores = false;

    // Se utiliza para comprobar si el correo esta de forma correcta
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/.+\.(jpg|jpeg|png|gif|webp))$/i;

    // vacia lo errores
    nameFormError.textContent = "";
    lastNameFormError.textContent = "";
    emailFormError.textContent = "";
    urlFormError.textContent = "";

    // comprueba
    if(form.nombre.length < 1){
        nameFormError.textContent = "El nombre es obligatorio";
        hayErrores = true;
        
    }
    else if(form.apellido.length < 1){
        lastNameFormError.textContent = "El apellido es obligatorio";
        hayErrores = true;
        
    }
    else if(form.email.length < 1){
        emailFormError.textContent = "El email es obligatorio";
        hayErrores = true;
        
    } else if(!emailRegex.test(form.email)){
        emailFormError.textContent = "El email no es válido";
        hayErrores = true;
        
    } else if(!urlRegex.test(form.url)){
        urlFormError.textContent = "La URL no es correcta";
        hayErrores = true;
    }
    return hayErrores;

}
