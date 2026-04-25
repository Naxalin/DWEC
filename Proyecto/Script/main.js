const productos = document.getElementById("productos");
const modalHtml = document.getElementsByClassName("modal");
const botonDetalles = document.querySelectorAll(".caracteristicas")
const marca = document.querySelector("#marca");
const categoria = document.querySelector("#categoria");
const buscador = document.querySelector("#busqueda");
let globalDetalles;
let globalCoches;

async function cargarInformacionProductos(){
    const datos = await fetch("../data/coches.json");
     if(!datos.ok) throw new Error("Error al cargar los coches");
    globalCoches  = await datos.json();
     
    cargarDetalles()
    cargar(globalCoches)
}

async function cargarDetalles(){
    const datos = await fetch("../data/detallesCoches.json");
     if(!datos.ok) throw new Error("Error al cargar los detalles");
    globalDetalles = await datos.json();
    añadirMarcas();
    añadirCategoria();
}

function cargar(coches){
    productos.innerHTML = "";
    coches.forEach(element => {
            productos.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="row g-0 h-100">
                            <div class="col-5">
                                <img src="${element.imagen}" class="img-fluid w-100 h-100 object-fit-cover rounded-start" alt="${element.nombre}">
                            </div>
                            <div class="col-7">
                                <div class="card-body d-flex flex-column justify-content-center h-100">
                                    <h5 class="card-title">${element.nombre}</h5>
                                    <p class="card-text mb-1"><strong>Marca:</strong> ${element.marca}</p>
                                    <p class="card-text mb-1"><strong>Stock:</strong> ${element.stock}</p>
                                    <p class="card-text fs-5 fw-bold text-success">${element.precio}</p>

                                    <div class="mt-2">
                                        <button class="btn btn-outline-primary btn-sm caracteristicas" data-id=${element.id}>Ver Características</button>
                                        <button class="btn btn-success btn-sm agregar">AGREGAR AL CARRITO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
}
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("caracteristicas")) return;

    const idProducto = e.target.dataset.id;
    const producto = globalDetalles.find(p => p.id == idProducto);
    if (!producto) return;

    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.tabIndex = -1;

    modalDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${producto.nombre}</h5>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Marca:</strong> ${producto.marca}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <p><strong>Stock:</strong> ${producto.stock}</p>
                    <p><strong>Motor:</strong> ${producto.motor}</p>
                    <p><strong>HP:</strong> ${producto.hp} hp</p>
                    <p><strong>Torque:</strong> ${producto.torque_nm} Nm</p>
                    <p><strong>Aceleración 0-100 km/h:</strong> ${producto.aceleracion_0_100} s</p>
                    <p><strong>Velocidad Máx:</strong> ${producto.velocidad_max_kmh} km/h</p>
                    <p><strong>Transmisión:</strong> ${producto.transmision}</p>
                    <p><strong>Combustible:</strong> ${producto.combustible}</p>
                    <p><strong>Consumo:</strong> ${producto.consumo_l_100km} L/100km</p>
                    <p><strong>Categoria:</strong> ${producto.categoria} </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">Cerrar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);

    const modalBootstrap = new bootstrap.Modal(modalDiv);
    modalBootstrap.show();

    const cerrar = () => {
        modalBootstrap.hide();
        modalDiv.addEventListener("hidden.bs.modal", () => modalDiv.remove());
    };

    modalDiv.querySelectorAll(".btn-close, .btn-secondary").forEach(btn => {
        btn.addEventListener("click", cerrar);
    });
});

function añadirMarcas(){
    const marcasSet = new Set();

    globalDetalles.forEach(element => {
        marcasSet.add(element.marca);
    })

    marcasSet.forEach(element => {
        marca.innerHTML += `<option value=${element}>${element}</option>`;
    })
}

function añadirCategoria(){
    const categoriaSet = new Set();

    globalDetalles.forEach(element => {
        categoriaSet.add(element.categoria);
    })

    categoriaSet.forEach(element => {
        categoria.innerHTML += `<option value=${element}>${element}</option>`;
    })
}

marca.addEventListener('change', (e) => {
    const cochesMarca = globalCoches.filter(a => a.marca === e.target.value)
    cargar(cochesMarca)
    if(cochesMarca === null || e.target.value === ""){
        cargar(globalCoches);
    }
    categoria.selectedIndex = 0;
})

categoria.addEventListener('change', (e) => {
    const cochesCategoria = globalDetalles.filter(a => a.categoria === e.target.value)
    const cochesExistentes = globalCoches.filter(chCategoria => cochesCategoria.some(chCoches => chCategoria.nombre === chCoches.nombre));
    cargar(cochesExistentes);
    if(cochesExistentes === null || e.target.value === ""){
        cargar(globalCoches);
    }
    marca.selectedIndex = 0;
})

buscador.addEventListener('input', (e) => {
    const coches = globalCoches.filter(a => a.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
    cargar(coches);
})



document.addEventListener("DOMContentLoaded", cargarInformacionProductos)