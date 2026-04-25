const categoriaSelect = document.getElementById("categorias"); 
const carritoDeLaCompra = document.getElementById("carritoCompra");
const toggleCarrito = document.getElementById("toggleCarrito");

let bd;

toggleCarrito.addEventListener("click", () => {
    if (!bd) return console.error("La base de datos aún no lista");

    if (carritoDeLaCompra.style.display === "none") {
        carritoDeLaCompra.style.display = "block";
        mostrarCarrito();
    } else {
        carritoDeLaCompra.style.display = "none";
    }
});

function iniciarBaseDatos(){
    let solicitud = indexedDB.open("tiendaDB", 1);
    solicitud.addEventListener("error", mostrarError);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearAlmacen);
}

function mostrarError(evento){
    alert("TENEMOS UN ERROR: " + evento.code + " / " + evento.message);
}

function comenzar(evento){
    bd = evento.target.result;
    cargarDatos();
}

function crearAlmacen(evento){
    let baseDatos = evento.target.result;
    if (!baseDatos.objectStoreNames.contains("carrito")) {
        let almacen = baseDatos.createObjectStore("carrito", { keyPath: "id" });
        almacen.createIndex("BuscarNombre", "nombre", { unique: false });
    }
}

async function cargarDatos() {
    const response = await fetch('../data/productos.json');
    if (!response.ok) throw new Error('Error al cargar los Productos');

    const productos = await response.json();
    mostrarProductos(productos);
    añadirCategorias();
}

function mostrarProductos(dataProductos) {
    const paginaProductos = document.getElementById("muestraProductos");
    paginaProductos.innerHTML = "";

    dataProductos.forEach(element => {
        paginaProductos.innerHTML += `
        <div class="col producto">
            <div class="card h-100" data-categoria="${element.categoria}" data-precio="${element.precio}" data-id="${element.id}" data-nombre="${element.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">Precio: ${element.precio}€</p>
                    <p class="card-text">Stock: ${element.stock}</p>
                    <p class="card-text categoriasProducto">${element.categoria}</p>
                    <button class="btn btn-primary btn-comprar">Comprar</button>
                </div>
            </div>
        </div>
        `;
    });

    document.querySelectorAll(".btn-comprar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (!bd) return console.error("La base de datos aún no está lista");

            const card = e.target.closest(".card");
            const productoId = card.dataset.id;
            const n = card.dataset.nombre;
            const p = Number(card.dataset.precio);

            const transaccion = bd.transaction(["carrito"], "readwrite"); 
            const almacen = transaccion.objectStore("carrito");

            const request = almacen.get(productoId);

            request.onsuccess = (evento) => {
                const data = evento.target.result;
                if (data) {
                    data.cantidad = (data.cantidad || 1) + 1;
                    const putRequest = almacen.put(data);
                    putRequest.onsuccess = () => mostrarCarrito();
                } else {
                    const addRequest = almacen.add({
                        id: productoId,
                        nombre: n,
                        precio: p,
                        cantidad: 1
                    });
                    addRequest.onsuccess = () => mostrarCarrito();
                }
            };

            request.onerror = (err) => console.error("Error al añadir:", err);
        });
    });
}

function añadirCategorias(){
    const tarjetas = document.querySelectorAll('.card');
    const categoriasSet = new Set();

    tarjetas.forEach(tarjeta => {
        categoriasSet.add(tarjeta.querySelector('.categoriasProducto').textContent.trim());
    });

    categoriaSelect.innerHTML = `<option value="">Todas</option>`;
    categoriasSet.forEach(categoria => {
        categoriaSelect.innerHTML += `<option value="${categoria}" class="options">${categoria}</option>`;
    });
}

categoriaSelect.addEventListener("change", (event) => {
    const productos = Array.from(document.querySelectorAll(".producto .card"));
    productos.forEach(element => element.classList.add("d-none"));

    const productosBuscados = productos.filter(p => p.dataset.categoria === event.currentTarget.value);
    productosBuscados.forEach(p => p.classList.remove("d-none"));

    if(event.currentTarget.value === ""){
        productos.forEach(element => element.classList.remove("d-none"));
    }
});

const ordenar = document.querySelector("#ordenPrecio");
ordenar.addEventListener("change", (event) => {
    const valor = event.target.value; 
    const listaProductos = document.querySelector("#muestraProductos");
    let productosDOM = Array.from(listaProductos.querySelectorAll(".producto"));

    productosDOM.sort((a, b) => {
        const precioA = parseFloat(a.querySelector(".card").dataset.precio);
        const precioB = parseFloat(b.querySelector(".card").dataset.precio);
        return valor === "asc" ? precioA - precioB : precioB - precioA;
    });

    listaProductos.innerHTML = "";
    productosDOM.forEach(prod => listaProductos.appendChild(prod));
});

function mostrarCarrito() {
    carritoDeLaCompra.innerHTML = "";

    if (!bd) return console.error("La base de datos aún no está lista");

    const transaccion = bd.transaction('carrito', 'readonly');
    const almacen = transaccion.objectStore('carrito');

    const getAllRequest = almacen.getAll();

    getAllRequest.onsuccess = () => {
        const items = getAllRequest.result;
        if (items.length === 0) {
            carritoDeLaCompra.innerHTML = "<p>Carrito vacío</p>";
            return;
        }

        items.forEach(item => {
            carritoDeLaCompra.innerHTML += `
                <div class="carrito-item" data-id="${item.id}">
                    <span>${item.nombre} - ${item.precio}€ x ${item.cantidad}</span>
                    <button class="btn-mas">+</button>
                    <button class="btn-menos">-</button>
                    <button class="btn-eliminar">x</button>
                </div>
            `;
        });

        carritoDeLaCompra.querySelectorAll(".btn-mas").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.closest(".carrito-item").dataset.id;
                modificarCantidad(id, 1);
            });
        });

        carritoDeLaCompra.querySelectorAll(".btn-menos").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.closest(".carrito-item").dataset.id;
                modificarCantidad(id, -1);
            });
        });

        carritoDeLaCompra.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.closest(".carrito-item").dataset.id;
                eliminarProducto(id);
            });
        });
    };
}

function modificarCantidad(id, cambio) {
    const transaccion = bd.transaction('carrito', 'readwrite');
    const almacen = transaccion.objectStore('carrito');

    const req = almacen.get(id);
    req.onsuccess = (e) => {
        const item = e.target.result;
        if (!item) return;

        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            almacen.delete(id).onsuccess = () => mostrarCarrito();
        } else {
            almacen.put(item).onsuccess = () => mostrarCarrito();
        }
    };
}

function eliminarProducto(id) {
    const transaccion = bd.transaction('carrito', 'readwrite');
    const almacen = transaccion.objectStore('carrito');

    almacen.delete(id).onsuccess = () => mostrarCarrito();
}


document.addEventListener("DOMContentLoaded", () => {
    iniciarBaseDatos();
});
