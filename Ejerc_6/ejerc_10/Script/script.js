let carrito = [];

const botones = document.querySelectorAll(".productos button");

function Producto(nombre, precio, cantidad){
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const contenedor = boton.closest(".producto");
    if(!contenedor) return;

    const nombre = contenedor.querySelector(".nombre").textContent.trim();
    const precio = parseFloat(contenedor.querySelector(".precio").textContent);

    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push(new Producto(nombre, precio, 1));
    }

    renderizarCarrito();
    calcularTotal()
  });
});

function renderizarCarrito() {
  const carro = document.querySelector(".carrito");
  carro.innerHTML = "";

  carrito.forEach(prod => {
    const div = document.createElement("div");
    div.textContent = `${prod.nombre} (x${prod.cantidad}) - ${prod.precio} €`;
    carro.appendChild(div);
  });
}

function calcularTotal(){
    let total = document.querySelector(".precioTotal");
    let precio = 0;
    carrito.forEach(prod => {
        precio = precio + (prod.precio * prod.cantidad);
    })
    total.textContent = precio;
}
