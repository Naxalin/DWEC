let iniciado = false;
let usuarios = [];
let usuarioActual = null;

async function init() {
    const res = await fetch("../data/usuarios.json");
    if (!res.ok) throw new Error("No se pudieron cargar los usuarios");
    usuarios = await res.json();
    usuarios.forEach(u => u.carrito = []); 
    actualizarBotones();
}

function actualizarBotones() {
    document.querySelectorAll(".agregar").forEach(btn => btn.disabled = !iniciado);
}

function login(correo, contraseña) {
    const user = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
    if (user) {
        iniciado = true;
        usuarioActual = user;
        actualizarBotones();
        return true;
    }
    return false;
}

function cerrarSesion() {
    iniciado = false;
    usuarioActual = null;
    actualizarBotones();
    alert("Has cerrado sesión");
}

function crearModalCarrito() {
    if (!usuarioActual) return;
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Carrito de ${usuarioActual.nombre}</h5>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="modal-body" id="cuerpoCarrito"></div>
                <div class="modal-footer">
                    <h5>Total: <span id="totalCarrito">0€</span></h5>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bs = new bootstrap.Modal(modal);
    bs.show();
    modal.querySelector(".btn-close").addEventListener("click", () => bs.hide());
    modal.addEventListener("hidden.bs.modal", () => modal.remove());

    function actualizarCarrito() {
        const cuerpo = modal.querySelector("#cuerpoCarrito");
        cuerpo.innerHTML = "";
        let total = 0;

        if (usuarioActual.carrito.length === 0) {
            cuerpo.innerHTML = "<p>Carrito vacío</p>";
            modal.querySelector("#totalCarrito").textContent = "0€";
            return;
        }

        usuarioActual.carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            const div = document.createElement("div");
            div.className = "d-flex align-items-center mb-2";
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="width:60px; height:40px; object-fit:cover;" class="me-2 rounded">
                <span class="me-2">${item.nombre}</span>
                <span class="me-2 fw-bold text-success">${item.precio}€</span>
                <div>
                    <button class="btn btn-sm btn-danger" data-index="${index}" data-accion="restar">-</button>
                    <span class="mx-2">${item.cantidad}</span>
                    <button class="btn btn-sm btn-success" data-index="${index}" data-accion="sumar">+</button>
                </div>
            `;
            cuerpo.appendChild(div);
        });

        modal.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.dataset.index);
                const accion = btn.dataset.accion;
                if (accion === "sumar") {
                    usuarioActual.carrito[index].cantidad++;
                } else {
                    usuarioActual.carrito[index].cantidad--;
                    if (usuarioActual.carrito[index].cantidad <= 0) {
                        usuarioActual.carrito.splice(index, 1);
                    }
                }
                actualizarCarrito();
            });
        });

        modal.querySelector("#totalCarrito").textContent = total.toFixed(2) + "€";
    }

    actualizarCarrito();
}

document.addEventListener("click", e => {
    if (e.target.classList.contains("iniciarSesion")) crearModalLogin();
    if (e.target.classList.contains("abrirCarrito")) crearModalCarrito();

    if (e.target.classList.contains("agregar") && iniciado) {
        const card = e.target.closest(".card");
        const nombre = card.querySelector(".card-title").textContent;
        const precio = parseFloat(card.querySelector(".text-success").textContent.replace("€","").trim());
        const imagen = card.querySelector("img").src;

        const existente = usuarioActual.carrito.find(p => p.nombre === nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            usuarioActual.carrito.push({ nombre, precio, imagen, cantidad: 1 });
        }
        alert(`${nombre} agregado al carrito`);
    }
});

function crearModalLogin() {
    if(iniciado) crearModalPerfil();
    if(iniciado) return;
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Iniciar Sesión</h5>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <form id="formLogin">
                        <input type="email" id="correoLogin" placeholder="Correo" class="form-control mb-2" required>
                        <input type="password" id="contraseñaLogin" placeholder="Contraseña" class="form-control mb-2" required>
                        <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                        <div id="errorLogin" class="text-danger mt-2" style="display:none;">Correo o contraseña incorrectos</div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bs = new bootstrap.Modal(modal);
    bs.show();
    modal.querySelector(".btn-close").addEventListener("click", () => bs.hide());
    modal.addEventListener("hidden.bs.modal", () => modal.remove());

    modal.querySelector("#formLogin").addEventListener("submit", e => {
        e.preventDefault();
        const correo = modal.querySelector("#correoLogin").value;
        const contraseña = modal.querySelector("#contraseñaLogin").value;
        if (login(correo, contraseña)) {
            bs.hide();
            crearModalPerfil();
        } else {
            modal.querySelector("#errorLogin").style.display = "block";
        }
    });
}

function crearModalPerfil() {
    if (!usuarioActual) return;
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h2 class="fw-bold px-4 mt-2">Perfil</h2>
                    <button type="button" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <form id="formPerfil" class="px-4">
                        <div class="mb-2">
                            <label>Nombre</label>
                            <input type="text" class="form-control" value="${usuarioActual.nombre || ''}" id="nombrePerfil">
                        </div>
                        <div class="mb-2">
                            <label>Apellidos</label>
                            <input type="text" class="form-control" value="${usuarioActual.apellidos || ''}" id="apellidosPerfil">
                        </div>
                        <div class="mb-2">
                            <label>Correo</label>
                            <input type="email" class="form-control" value="${usuarioActual.correo}" disabled>
                        </div>
                        <div class="mb-2">
                            <label>Teléfono</label>
                            <input type="tel" class="form-control" value="${usuarioActual.telefono || ''}" id="telefonoPerfil">
                        </div>
                        <div class="mb-2">
                            <label>Dirección</label>
                            <input type="text" class="form-control" value="${usuarioActual.direccion || ''}" id="direccionPerfil">
                        </div>
                        <div class="mb-2">
                            <label>Método de Pago</label>
                            <select class="form-control" id="pagoPerfil">
                                <option value="Tarjeta" ${usuarioActual.metodoPago === 'Tarjeta' ? 'selected' : ''}>Tarjeta</option>
                                <option value="PayPal" ${usuarioActual.metodoPago === 'PayPal' ? 'selected' : ''}>PayPal</option>
                                <option value="ContraEntrega" ${usuarioActual.metodoPago === 'ContraEntrega' ? 'selected' : ''}>Contra Entrega</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mt-2">Guardar Cambios</button>
                        <button type="button" class="btn btn-secondary w-100 mt-2" id="cerrarSesionBtn">Cerrar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const bs = new bootstrap.Modal(modal);
    bs.show();
    modal.querySelector(".btn-close").addEventListener("click", () => bs.hide());
    modal.addEventListener("hidden.bs.modal", () => modal.remove());

    modal.querySelector("#formPerfil").addEventListener("submit", e => {
        e.preventDefault();
        usuarioActual.nombre = modal.querySelector("#nombrePerfil").value;
        usuarioActual.apellidos = modal.querySelector("#apellidosPerfil").value;
        usuarioActual.telefono = modal.querySelector("#telefonoPerfil").value;
        usuarioActual.direccion = modal.querySelector("#direccionPerfil").value;
        usuarioActual.metodoPago = modal.querySelector("#pagoPerfil").value;
        alert("Datos actualizados");
    });

    modal.querySelector("#cerrarSesionBtn").addEventListener("click", () => {
        cerrarSesion();
        bs.hide();
    });
}

document.addEventListener("DOMContentLoaded", init);
