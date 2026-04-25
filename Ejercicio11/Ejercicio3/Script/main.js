let productos;

async function agarrarProductosYMostrar() {
  try {
    console.log("Entro")
    const response = await fetch('../data/products.json');
    if (!response.ok) throw new Error('Error al cargar los productos');

    const productos = await response.json();
    const listaProductos = document.querySelector("#product-list");
    listaProductos.innerHTML = ""; 

    productos.forEach(prod => {
      listaProductos.innerHTML += `
        <div class="producto">
          <img src="${prod.imageUrl}" alt="${prod.name}">
          <h5>${prod.name}</h5>
          <p>Categoría: ${prod.category}</p>
          <p>Precio: $${prod.price}</p>
          <p class="marca">Marca: ${prod.brand}</p>
          <p>${prod.description}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
  }
}

const buscadorHtml = document.getElementById("buscador");

buscadorHtml.addEventListener("input", () => {
    const elementosProductos = document.querySelectorAll(".producto");
    const textoBusqueda = buscadorHtml.value.toLowerCase();

    elementosProductos.forEach(Element => {
        const nameProduc = Element.querySelector("h5")?.textContent.toLocaleLowerCase() || "";
        
        if (nameProduc.includes(textoBusqueda)) {
            Element.classList.remove("d-none");
        } else {
            Element.classList.add("d-none");
        }
    });
});

const categoria = document.querySelector("#categoria");

categoria.addEventListener("change", (event) => {
    const elementosProductos = document.querySelectorAll(".producto");
    const valorSeleccionado = event.target.value.toLowerCase();

    elementosProductos.forEach(element => {
        const categoriaProducto = element.querySelector("p")?.textContent.toLowerCase().replace("categoría: ", "") || "";

        if (valorSeleccionado === "") {
            element.classList.remove("d-none");
        } else if (categoriaProducto === valorSeleccionado) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
});


const marcas = document.querySelector("#brand");
marcas.addEventListener("change", (event) => {
    const elementosProductos = document.querySelectorAll(".producto");
    const valorSeleccionado = event.target.value.toLowerCase();

    elementosProductos.forEach(element => {
        const categoriaProducto = element.querySelector(".marca")?.textContent.toLowerCase().replace("marca: ", "") || "";
        console.log(`Valor Seleccionado= (${valorSeleccionado}) y Categoria ${categoriaProducto}`);

        if (valorSeleccionado === "") {
            element.classList.remove("d-none");
        } else if (categoriaProducto === valorSeleccionado) {
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
});


const ordenar = document.querySelector("#ordenPrecio");

ordenar.addEventListener("change", (event) => {
    const valor = event.target.value; 
    const listaProductos = document.querySelector("#product-list");
    let productosDOM = Array.from(listaProductos.querySelectorAll(".producto"));

    productosDOM.sort((a, b) => {
        const precioA = parseFloat(a.querySelector("p:nth-of-type(2)").textContent.replace("Precio: $", ""));
        const precioB = parseFloat(b.querySelector("p:nth-of-type(2)").textContent.replace("Precio: $", ""));
        return valor === "asc" ? precioA - precioB : precioB - precioA;
    });

    listaProductos.innerHTML = "";
    productosDOM.forEach(prod => listaProductos.appendChild(prod));
});






document.addEventListener("DOMContentLoaded", agarrarProductosYMostrar);