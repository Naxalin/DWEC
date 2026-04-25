// Globales
const selectUsuario = document.querySelector("#usuarios");
const mensaje = document.querySelector("#mensaje");
const panelUser = document.querySelector("#panelUser");
const panelPedidos = document.querySelector("#panelPedidos");
const totalPrecio = document.querySelector("#total");
let usuariosGlobales;
let pedidosGlobales;
let detallesGlobales;
let productoGlobal;

// Carga los datos
async function cargar(){
    mensaje.textContent = "Cargando datos maestros..."
    const [usuariosFetch, productosFetch, pedidosFetch, detallesPedidosFetch] = await Promise.all([
        fetch("../data/usuarios.json"),
        fetch("../data/productos.json"),
        fetch("../data/pedidos.json"),
        fetch("../data/detalles_pedido.json")
    ]);

    const [usuarios, productos, pedidos, detalles] = await Promise.all([
        usuariosFetch.json(),
        productosFetch.json(),
        pedidosFetch.json(),
        detallesPedidosFetch.json()
    ]);
    usuariosGlobales = usuarios;
    pedidosGlobales = pedidos;
    detallesGlobales = detalles;
    productoGlobal = productos;

    mensaje.textContent = "";
    crearSelects();
}

// Crea los Select de usuario
function crearSelects(){
    const setUsuarios = new Set();
    usuariosGlobales.forEach(element => {
        setUsuarios.add(element.id)
    });
    console.log(selectUsuario)
    setUsuarios.forEach(set => {
        usuariosGlobales.forEach(user => {
            if(set === user.id){
                selectUsuario.innerHTML += `<option value=${user.id}>${user.nombre}</option>`;
            }
        })
    })
    console.log(selectUsuario)
}

selectUsuario.addEventListener("change", (e) => {
    panelUser.innerHTML = "";
    panelPedidos.innerHTML = "";
    totalPrecio.innerHTML = "";
    usuariosGlobales.forEach(user => {
        if(user.id === parseInt(e.target.value)){
            panelUser.innerHTML += `
            <h3>${user.nombre}</h3>
            <h4>${user.email}</h4>
            <p>${user.fechaRegistro}</p>
            `;
        }
    })


    pedidosGlobales.forEach(ped => {
        if(ped.usuarioId === parseInt(e.target.value)){

            const detalles = detallesPedido(ped.id);
            console.log(detalles)
            panelPedidos.innerHTML += `
            <h3>${ped.id}</h3>
            <h4>${ped.estado}</h4>
            <p>${ped.fecha}</p>
            <ul>${detalles}</ul>
            `;
        
        }
    })

    totalPrecio.innerHTML = `<p> Precio Total: ${totalPedidosUsuario(parseInt(e.target.value))} €</p>`;
})

function detallesPedido(pedId) {
    return detallesGlobales
        .filter(det => det.pedidoId === pedId)
        .map(det => {
            const pro = productoGlobal.find(prod => prod.id === det.productoId);
            console.log(pro)
            return `<li>${det.cantidad} x ${pro.nombre} - ${det.precioUnitario.toFixed(2)} €</li>`;

        })
        .join("");
}

function totalPedidosUsuario(userId) {
    return pedidosGlobales
        .filter(p => p.usuarioId === userId)
        .reduce((totalUsuario, p) =>
            totalUsuario + detallesGlobales
                .filter(d => d.pedidoId === p.id)
                .reduce((totalPedido, d) => totalPedido + d.cantidad * d.precioUnitario, 0)
        , 0);
}



document.addEventListener("DOMContentLoaded", cargar);