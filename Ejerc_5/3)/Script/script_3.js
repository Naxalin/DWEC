function generarInformeDeValidacion(){
    let informe_nombre = document.querySelector("#miFormulario #nombre").value;
    let informe_email = document.querySelector("#miFormulario #email").value;

    let informe_errores = document.querySelector("#informe-errores");
    informe_errores.innerHTML = ""; 

    if(informe_nombre.length < 3){
        let error = document.createElement("p");
        error.textContent = "El campo nombre no cumple las condiciones.";
        informe_errores.appendChild(error);
    }
    if(informe_email.includes("@") === false){
        let error = document.createElement("p");
        error.textContent = "El campo email no cumple las condiciones.";
        informe_errores.appendChild(error);
    }
    if(informe_nombre.length > 3 && informe_email.includes("@") === true){
        let exito = document.createElement("p");
        exito.textContent = "Formulario enviado con éxito.";
        informe_errores.appendChild(exito);
    }}