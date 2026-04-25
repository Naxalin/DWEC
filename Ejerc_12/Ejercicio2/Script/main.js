let datos;
const filtroCorreo = document.querySelector("#correo");
const boton = document.querySelector("button");
const statusMensaje = document.querySelector("#status");


const UI_STATES = {
  INITIAL: "initial",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success"
};

function estados(state, mensaje = "") {
    statusMensaje.textContent = mensaje;
    switch(state){
        case UI_STATES.INITIAL: statusMensaje.textContent = "Introduce un Correo para ver los pedidos"; break;
        case UI_STATES.ERROR: statusMensaje.textContent = mensaje; break;
        case UI_STATES.LOADING: statusMensaje.textContent = "Cargando"; break;
        case UI_STATES.SUCCESS: break;
    }
}


async function init() {
    estados(UI_STATES.LOADING);
    try {
        datos = await ObtenerUsuarios();
        estados(UI_STATES.INITIAL);
    } catch (error) {
        estados(UI_STATES.ERROR, "Error al cargar los usuarios");
    }
}

async function ObtenerUsuarios() {
    const pendiente = await fetch("../data/usuarios.json");
    if (!pendiente.ok) throw new Error('Error al cargar los usuarios');

    const usuarios = await pendiente.json();
    cargarUsuarios(usuarios);
    return usuarios;
}

function cargarUsuarios(dataUsuario){
    const usuarioHtml = document.querySelector("#usuarios");
    usuarioHtml.innerHTML = "";

    dataUsuario.forEach(element => {
        usuarioHtml.innerHTML += `
            <div class="card" data-id=${element.id}>
                <h3>${element.nombre}</h3>
                <p>${element.email}</p>
            </div>
        `;
    });
}



boton.addEventListener("click", (event) => {
    event.preventDefault();
    const correoIntroducido = filtroCorreo.value.trim().toLowerCase();

    if (!correoIntroducido.includes("@")) {
    estados(UI_STATES.ERROR, "El correo debe contener un @");
    return;
}

    estados(UI_STATES.LOADING);

    let datosFiltrados;

    if (!correoIntroducido) {
        datosFiltrados = datos;
    } else { // busca 
        const usuarioBuscado = datos.find(d => d.email.toLowerCase() === correoIntroducido);
        if (!usuarioBuscado) { // Si no encuentra nada lo deja como esta
            datosFiltrados = datos;
        } else { // Si encuentra lo saca
            datosFiltrados = [usuarioBuscado];
        }
    }

    const usuarioHtml = document.querySelector("#usuarios");
    usuarioHtml.innerHTML = "";
    datosFiltrados.forEach(element => {
        usuarioHtml.innerHTML += `
            <div class="card" data-id=${element.id}>
                <h3>${element.nombre}</h3>
                <p>${element.email}</p>
            </div>
        `;
    });

    if (datosFiltrados.length === 1) {
        cargarFichero(datosFiltrados[0]);
    } else {
        document.querySelector("#productos").innerHTML = "";
    }

    estados(UI_STATES.SUCCESS);
});



async function cargarFichero(usuario){
    try {
        const pendiente = await fetch("../data/pedidos.json");
        if (!pendiente.ok) throw new Error('Error al cargar los pedidos');

        const pedidos = await pendiente.json();

        const productosHtml = document.querySelector("#productos");
        productosHtml.innerHTML = "";

        pedidos.forEach(element => {
            if(usuario.id === element.usuarioId){
                productosHtml.innerHTML += `
                    <div class="card" id="pedidosMostrar">
                        <h3>${element.id}</h3>
                        <p>${element.fecha}</p>
                        <p>${element.estado}</p>
                    </div>
                `;
            } 
        });

        if (!document.querySelector("#pedidosMostrar")) {
            productosHtml.innerHTML = `<p>No hay pedidos</p>`;
        }

    } catch(error){
        estados(UI_STATES.ERROR, "ERROR AL CARGAR LOS PEDIDOS O NO TIENE");
    }
}



document.addEventListener("DOMContentLoaded", init);
