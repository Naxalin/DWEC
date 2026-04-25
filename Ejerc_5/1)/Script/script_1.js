function cambiarImagenPrincipal(id_Imagen){
    const imagenes = document.querySelectorAll('#miniaturas img');

    let enlace_imagen = imagenes[id_Imagen].getAttribute('src');
    console.log(enlace_imagen);

    let imagen_principal = document.querySelector('#imagen-principal');
    imagen_principal.setAttribute('src', enlace_imagen);

}

function resaltarMiniatura(){

    const imagen = document.querySelector('#imagen-principal');
    if(imagen.classList.contains('resaltar')){
        imagen.classList.remove('resaltar');
    } else {
    imagen.classList.add('resaltar');
    }

}