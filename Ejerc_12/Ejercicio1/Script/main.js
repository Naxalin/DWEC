const categoriaSelect = document.getElementById("categorias");

async function cargarDatos() {
    const response = await fetch('../data/productos.json');
    if (!response.ok) throw new Error('Error al cargar los Productos');

    const productos = await response.json();
    console.log(productos)
    mostrarProductos(productos);
    añadirCategorias()
}

function mostrarProductos(dataProductos) {
    const paginaProductos = document.getElementById("muestraProductos");


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

    categoriasSet.forEach(categoria => {
        categoriaSelect.innerHTML += `<option value="${categoria}" class="options">${categoria}</option>`;
    });

}

categoriaSelect.addEventListener("change", (event) => {
    const productos = Array.from(document.querySelectorAll(".producto .card"))
    productos.forEach(element => {
        console.log("Entra para ocultar")
            element.classList.add("d-none");
            console.log(element.dataset.categoria)
        })

    const productosBuscadosPorCategoria = productos.filter(produc => produc.dataset.categoria === event.currentTarget.value);

    productosBuscadosPorCategoria.forEach(element => {
        element.classList.remove("d-none");
    })

    if(event.currentTarget.value === ""){
        productos.forEach(element => {
        console.log("Entra para ocultar")
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

document.addEventListener("DOMContentLoaded", cargarDatos)