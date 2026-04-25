const categoriaSelect = document.getElementById("categorias");
const botonLight = document.querySelector(".btn-light");
const botonDark = document.querySelector(".btn-dark");
let productosGlobales;

let db;
const request = indexedDB.open("tiendaDB", 1);

request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("productos")) {
        db.createObjectStore("carrito", { keyPath: "productosId" });
    }
};

request.onsuccess = (e) => {
    db = e.target.result;
    iniciarBaseDeDatos();
}

request.onerror = () => {
    console.log("Error al abrir la Base de Datos");
}

function iniciarBaseDeDatos() {
    if (!db.objectStoreNames.contains("productos")) return;
    const tx = db.transaction("productos", "readonly");
    const store = tx.objectStore("productos");

    store.count().onsuccess = (e) => {
        if(e.target.result > 0){
            leerProducto();
        } else {
            cargarDatos();
        }
    }
}

function leerProducto() {
    if (!db.objectStoreNames.contains("productos")) return;
    const tx = db.transaction("productos", "readonly");
    const store = tx.objectStore("productos");

    store.getAll().onsuccess = (e) => {
        productosGlobales = e.target.result;
        mostrarProductos(productosGlobales);
        añadirCategorias();
        mostrarProductosEnConsola();
    };
}

function guardarProductosBaseDatos(productos){
    if (!db.objectStoreNames.contains("productos")) return;
    const tx = db.transaction("productos", "readwrite");
    const store = tx.objectStore("productos");

    productos.forEach(producto => store.put(producto));
}

window.addEventListener("load", () => {
    const modo = sessionStorage.getItem("modo");
    if(modo === "oscuro"){
        botonDark.click();
    } else if(modo === "light"){
        botonLight.click();
    }
})

botonDark.addEventListener("click", () => {
    document.body.classList.remove('bg-light', 'text-white');
    document.body.classList.add('bg-dark', 'text-dark');

    document.querySelectorAll(".card").forEach(targetas => {
        targetas.classList.remove('bg-white');
        targetas.classList.add('bg-dark')
    })

    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, option").forEach(el => {
        el.classList.remove('text-dark');
        el.classList.add('text-white');
    });

    sessionStorage.setItem("modo", "oscuro");
})

botonLight.addEventListener("click", () => {
    document.body.classList.remove('bg-dark', 'text-white');
    document.body.classList.add('bg-light', 'text-dark');

    document.querySelectorAll(".card").forEach(targetas => {
        targetas.classList.remove('bg-dark');
        targetas.classList.add('bg-white')
    })
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, option").forEach(el => {
        el.classList.remove('text-white');
        el.classList.add('text-dark');
    });

    sessionStorage.setItem("modo", "light");
})

async function cargarDatos() {
    const response = await fetch('../data/productos.json');
    if (!response.ok) throw new Error('Error al cargar los Productos');
    
    const productos = await response.json();
    productosGlobales = productos;
    mostrarProductos(productos);
    añadirCategorias();
    guardarProductosBaseDatos(productos);
    mostrarProductosEnConsola();
}

document.getElementById("refresh").addEventListener("click", () => {
    if (!db.objectStoreNames.contains("productos")) return;
    const tx = db.transaction("productos", "readwrite");
    const store = tx.objectStore("productos");
    store.clear();
    tx.oncomplete = () => {
        cargarDatos();
    };
})

function mostrarProductos(dataProductos) {
    const paginaProductos = document.getElementById("muestraProductos");
    paginaProductos.innerHTML = "";

    dataProductos.forEach(element => {
        paginaProductos.innerHTML += `
        <div class="col producto">
            <div class="card h-100" data-categoria=${element.categoria} data-precio=${element.precio}>
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">Precio: ${element.precio}€</p>
                    <p class="card-text">Stock: ${element.stock}</p>
                    <p class="card-text categoriasProducto">${element.categoria}</p>
                </div>
            </div>
        </div>
        `;
    });
}

function añadirCategorias(){
    const tarjetas = document.querySelectorAll('.card');
    const categoriasSet = new Set();

    tarjetas.forEach(tarjeta => {
        categoriasSet.add(tarjeta.querySelector('.categoriasProducto').textContent.trim());
    });

    categoriaSelect.innerHTML = '<option value="">Todas</option>';
    categoriasSet.forEach(categoria => {
        categoriaSelect.innerHTML += `<option value="${categoria}" class="options">${categoria}</option>`;
    });
}

categoriaSelect.addEventListener("change", (event) => {
    const productos = Array.from(document.querySelectorAll(".producto .card"))
    productos.forEach(element => element.classList.add("d-none"));

    const productosBuscadosPorCategoria = productos.filter(produc => produc.dataset.categoria === event.currentTarget.value);
    productosBuscadosPorCategoria.forEach(element => element.classList.remove("d-none"));

    if(event.currentTarget.value === ""){
        productos.forEach(element => element.classList.remove("d-none"));
    }
})

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

document.addEventListener("DOMContentLoaded", cargarDatos);

function mostrarProductosEnConsola() {
    if (!db || !db.objectStoreNames.contains("productos")) return;
    const tx = db.transaction("productos", "readonly");
    const store = tx.objectStore("productos");

    store.getAll().onsuccess = (e) => {
        console.log("Productos en IndexedDB:", e.target.result);
    };
}
