import datos from "../datos/datos.js";

let rowProductos; // guardamos referencia al row para ordenar

document.addEventListener("DOMContentLoaded", () => {
    redenderizar();
});

function redenderizar() {
    const productosMostrar = document.querySelector("#productos");
    productosMostrar.innerHTML = ""; // limpiar

    const datosProductos = Array.from(datos);

    rowProductos = document.createElement("div");
    rowProductos.classList.add("row", "g-4");

    datosProductos.forEach(product => {
        const col = document.createElement("div");
        col.classList.add("col-md-3");

        const div = document.createElement("div");
        div.classList.add("producto-card", "card", "h-100", "shadow-sm");

        const img = document.createElement("img");
        img.src = product.imagen;
        img.alt = product.nombre;
        img.classList.add("card-img-top");

        const nombre = document.createElement("h3");
        nombre.textContent = product.nombre;
        nombre.classList.add("card-title", "mt-2");

        const categoria = document.createElement("h4");
        categoria.textContent = product.categoria;
        categoria.classList.add("card-subtitle", "mb-2", "text-muted");

        const precio = document.createElement("p");
        precio.textContent = `$${product.precio}`;
        precio.dataset.price = product.precio;
        precio.classList.add("fw-bold");

        div.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(categoria);
        div.appendChild(precio);

        col.appendChild(div);
        rowProductos.appendChild(col);
    });

    productosMostrar.appendChild(rowProductos);
}

// Búsqueda
const busqueda = document.querySelector("#busqueda");

busqueda.addEventListener("input", () => {
    const productos = document.querySelectorAll("#productos .producto-card");
    const textoBusqueda = busqueda.value.toLowerCase();

    productos.forEach(Element => {
        const nombre = Element.querySelector("h3").textContent.toLowerCase();
        if (nombre.includes(textoBusqueda)) {
            Element.closest(".col-md-3").classList.remove("d-none");
        } else {
            Element.closest(".col-md-3").classList.add("d-none");
        }
    });
});

// Categoría
const select = document.querySelector("#categoria");

select.addEventListener("change", () => {
    const productos = document.querySelectorAll("#productos .producto-card");
    const categoriaSeleccionada = select.value.toLowerCase();

    productos.forEach(element => {
        const categoria = element.querySelector("h4").textContent.toLowerCase();
        if (categoria.includes(categoriaSeleccionada) || categoriaSeleccionada === "todas") {
            element.closest(".col-md-3").classList.remove("d-none");
        } else {
            element.closest(".col-md-3").classList.add("d-none");
        }
    });
});

// Rango de precio
const range = document.querySelectorAll("#precioAscendente"); 

range.forEach(price => {
    price.addEventListener("input", () => {
        const productos = document.querySelectorAll("#productos .producto-card");
        const precioAscendente = parseFloat(document.getElementById("precioAscendente").value);

        console.log("Valor del rango:", precioAscendente);

        productos.forEach(Element => {
            const precioCard = parseFloat(Element.querySelector("p").dataset.price);
            console.log("Producto:", Element.querySelector("h3").textContent, "Precio:", precioCard);

            if (precioAscendente > 0 && precioCard <= precioAscendente) {
                console.log("Mostrando:", Element.querySelector("h3").textContent);
                Element.closest(".col-md-3").classList.remove("d-none");
            } else {
                console.log("Ocultando:", Element.querySelector("h3").textContent);
                Element.closest(".col-md-3").classList.add("d-none");
            }
        });
    });
});



// Ordenar
const mayorAMenor = document.getElementById("precioMayorAMenor");
const menorAMayor = document.getElementById("precioMenorAMayor");

mayorAMenor.addEventListener("click", () => {
    const orden = Array.from(rowProductos.children);

    orden.sort((a, b) => {
        const precioA = parseFloat(a.querySelector(".producto-card p").dataset.price);
        const precioB = parseFloat(b.querySelector(".producto-card p").dataset.price);
        return precioB - precioA;
    });

    rowProductos.innerHTML = "";
    orden.forEach(element => rowProductos.appendChild(element));
});

menorAMayor.addEventListener("click", () => {
    const orden = Array.from(rowProductos.children);

    orden.sort((a, b) => {
        const precioA = parseFloat(a.querySelector(".producto-card p").dataset.price);
        const precioB = parseFloat(b.querySelector(".producto-card p").dataset.price);
        return precioA - precioB;
    });

    rowProductos.innerHTML = "";
    orden.forEach(element => rowProductos.appendChild(element));
});
