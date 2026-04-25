// Globales
const selectUser = document.querySelector("#usuarios");
const pedidosHtml = document.getElementById("usuariosPedidos");
let combinado;

// Carga los JSON
async function cargar() {
    const mensajeHtml = document.querySelector("#mensaje");
    mensajeHtml.textContent = "Cargando datos del panel…";

    try {
        const [pedidosRes, detallesRes, productosRes] = await Promise.all([
            fetch("../data/pedidos.json"),
            fetch("../data/detalles_pedido.json"),
            fetch("../data/productos.json")
        ]);

        const [pedidos, detalles, productos] = await Promise.all([
            pedidosRes.json(),
            detallesRes.json(),
            productosRes.json()
        ]);

        mensajeHtml.textContent = "";
        combinado = combinarDetalles(pedidos, detalles, productos);
        console.log(combinado);
        mostrarPanel();
    } catch (error) {
        mensajeHtml.textContent = "Error al cargar datos.";
        console.error("Error:", error);
    }
}

// Combina
function combinarDetalles(pedidos, detalles, productos) {
    return pedidos.map(pedido => {
        const detallesPedido = detalles
            .filter(det => det.pedidoId === pedido.id)
            .map(det => {
                const producto = productos.find(p => p.id === det.productoId);
                return {
                    cantidad: det.cantidad,
                    precioUnitario: producto.precio,
                    nombreProducto: producto.nombre
                };
            });

        const totalPedido = detallesPedido.reduce((acc, det) => acc + (det.cantidad * det.precioUnitario), 0);

        return {
            ...pedido,
            detalles: detallesPedido,
            totalPedido: totalPedido
        };
    });
}

function mostrarPanel() {
    const pedidosHtml = document.getElementById("usuariosPedidos");
    pedidosHtml.innerHTML = ""; 

    combinado.forEach(pedido => {
        const listaDetalles = pedido.detalles.map(det => {
            return `<li>${det.cantidad} x ${det.nombreProducto} - ${det.precioUnitario.toFixed(2)} €</li>`;
        }).join("");

        const totalFormateado = pedido.totalPedido.toFixed(2) + " €";

        pedidosHtml.innerHTML += `
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Pedido #${pedido.id} | ${pedido.fecha}</h5>
                    <p class="card-text"><strong>Estado:</strong> ${pedido.estado}</p>
                    <p class="card-text"><strong>Total:</strong> ${totalFormateado}</p>
                    <ul class="list-group list-group-flush">
                        ${listaDetalles}
                    </ul>
                </div>
            </div>
        `;
    });
}



document.addEventListener("DOMContentLoaded", cargar);
