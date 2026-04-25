const botonesProductos = document.querySelectorAll("#productos button");
const productos = document.querySelectorAll("#productos li");
const carrito = document.querySelector("#carrito");

// Listener para añadir productos al carrito
botonesProductos.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        console.log("Funciona el click");

        // Clonar el producto original
        const productoClonado = productos[index].cloneNode(true);

        // Eliminar el botón original del clon
        const botonOriginal = productoClonado.querySelector("button");
        if (botonOriginal) botonOriginal.remove();

        // Crear elementos para nombre y precio
        const nombre = document.createElement("span");
        nombre.textContent = productoClonado.textContent

        const precio = document.createElement("span");
        precio.textContent = productoClonado.dataset.price;

        // Creo una lista para meter el precio
        const li = document.createElement("li");
        li.dataset.price = productoClonado.dataset.price;

        // Crear botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            li.remove();
            calcularTotal();
        });

        // Armar el <li> del carrito
        li.appendChild(nombre);
        li.appendChild(precio);
        li.appendChild(botonEliminar);

        // Añadir al carrito
        carrito.appendChild(li);

        calcularTotal();
    });
});

function calcularTotal() {
    const total = document.querySelector("#total");
    const listaCompra = document.querySelectorAll("#carrito li");
 

    let suma = 0;

    listaCompra.forEach((producto) => {
        const precio = parseFloat(producto.dataset.price);

        suma += precio;
    });

    total.textContent = suma

}



function calcularTotal(){
 const total = document.querySelector("#total");
    console.log("Estoy calculando el total");

    const listaCompra = document.querySelectorAll("#carrito li");
    console.log("Productos en el carrito:", listaCompra);

    let suma = 0;

    listaCompra.forEach((producto, index) => {
        const precio = parseFloat(producto.dataset.price); 
        console.log(precio)
        suma += precio;
    });
    total.textContent = suma;
};