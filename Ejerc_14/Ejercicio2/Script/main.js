const categoriaSelect = document.getElementById("categorias"); 
const carritoDeLaCompra = document.getElementById("carritoCompra");
const toggleCarrito = document.getElementById("toggleCarrito");


toggleCarrito.addEventListener("click", () => {
    if (carritoDeLaCompra.style.display === "none") {
        carritoDeLaCompra.style.display = "block";
        mostrarCarrito();
    } else {
        console.log("Entro")
        carritoDeLaCompra.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.getElementById("muestraProductos");

    contenedorProductos.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-comprar");
        const producto = boton.closest(".card-body");

        const precioTexto = producto.querySelector(".card-text").textContent;

        const precioNumero = parseFloat(precioTexto.replace(/[^0-9.,]/g, '').replace(',', '.'));

        const productoInfo = {
            nombre: producto.querySelector(".card-title").textContent,
            precio: precioNumero,
            cantidad: 1
        };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoExistente = carrito.find(p => p.nombre === productoInfo.nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(productoInfo);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    });

    mostrarCarrito();
});

async function cargarDatos() {
    const response = await fetch('../data/productos.json');
    if (!response.ok) throw new Error('Error al cargar los Productos');

    const productos = await response.json();
    mostrarProductos(productos);
    añadirCategorias();
}

function mostrarProductos(dataProductos) {
    const paginaProductos = document.getElementById("muestraProductos");

    dataProductos.forEach(element => {
        console.log(element)
        paginaProductos.innerHTML += `
        <div class="col producto">
            <div class="card h-100" data-categoria=${element.categoria} data-precio=${element.precio}>
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
}

function añadirCategorias(){
    const tarjetas = document.querySelectorAll('.card');
    const categoriasSet = new Set();

    tarjetas.forEach(tarjeta => {
        categoriasSet.add(tarjeta.querySelector('.categoriasProducto').textContent.trim());
    });

    categoriasSet.forEach(categoria => {
        categoriaSelect.innerHTML += `<option value="${categoria}" class="options">${categoria}</option>`;
    });
}

categoriaSelect.addEventListener("change", (event) => {
    const productos = Array.from(document.querySelectorAll(".producto .card"))
    productos.forEach(element => {
        element.classList.add("d-none");
    })

    const productosBuscadosPorCategoria = productos.filter(produc => produc.dataset.categoria === event.currentTarget.value);

    productosBuscadosPorCategoria.forEach(element => {
        element.classList.remove("d-none");
    })

    if(event.currentTarget.value === ""){
        productos.forEach(element => {
            element.classList.remove("d-none");
        })
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

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        carritoDeLaCompra.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }
    carritoDeLaCompra.innerHTML = `
        <h4>Carrito de la Compra</h4>
        <ul class="list-group">
            ${carrito.map(producto => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${producto.nombre} - ${producto.precio}€ x ${producto.cantidad}
                    <span>${(producto.precio * producto.cantidad)}€</span>
                </li>
            `).join('')}
        </ul>
        <p class="mt-2"><strong>Total: ${
            carrito.reduce((total, p) => total + p.precio * p.cantidad, 0)
        }€</strong></p>
    `;
}
