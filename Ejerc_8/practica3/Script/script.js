import datos from "../datos/datos.js";

document.addEventListener("DOMContentLoaded", () => {
    selectionOption();
    checkBoxCreate();
    actividadesDisponibles();
    inicializarFiltros();
});

// Crear opciones del select de países
function selectionOption() {
    const select = document.querySelector("#pais");
    Array.from(datos).forEach(element => {
        const opciones = Array.from(select.querySelectorAll("option")).map(opt => opt.textContent);
        if (!opciones.includes(element.destino)) {
            const createSelect = document.createElement("option");
            createSelect.value = element.destino;
            createSelect.textContent = element.destino;
            select.appendChild(createSelect);
        }
    });
}

// Crear checkboxes de tipos
function checkBoxCreate() {
    const contenedor = document.querySelector("#checks");
    Array.from(datos).forEach(element => {
        const tiposExistentes = [...contenedor.querySelectorAll('input[type="checkbox"]')].map(opt => opt.value);
        if (!tiposExistentes.includes(element.tipo)) {
            const input = document.createElement("input");
            input.type = "checkbox";
            input.value = element.tipo;

            const label = document.createElement("label");
            label.appendChild(input);
            label.append(" " + element.tipo);

            contenedor.appendChild(label);
            contenedor.appendChild(document.createElement("br"));
        }
    });
}

// Crear tarjetas de actividades
function actividadesDisponibles() {
    const contenedor = document.querySelector("#actividades");
    contenedor.innerHTML = "";

    const row = document.createElement("div");
    row.className = "row g-4";
    contenedor.appendChild(row);

    Array.from(datos).forEach(element => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 cardViaje";
        col.dataset.destino = element.destino;
        col.dataset.tipo = element.tipo;

        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";

        const img = document.createElement("img");
        img.src = element.imagen;
        img.alt = element.nombre;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        const nombre = document.createElement("h5");
        nombre.className = "card-title";
        nombre.textContent = element.nombre;

        const destino = document.createElement("p");
        destino.className = "card-text mb-1";
        destino.textContent = element.destino;

        const precio = document.createElement("p");
        precio.className = "card-text fw-bold";
        precio.dataset.price = parseFloat(element.precio);
        precio.textContent = `${element.precio} €`;

        const boton = document.createElement("button");
        boton.className = "btn btn-primary mt-auto añadir-viaje";
        boton.dataset.nombre = element.nombre;
        boton.dataset.destino = element.destino;
        boton.dataset.precio = element.precio;
        boton.dataset.duracionHoras = element.duracionHoras;
        boton.textContent = "Añadir al Itinerario";

        cardBody.append(nombre, destino, precio, boton);
        card.append(img, cardBody);
        col.appendChild(card);
        row.appendChild(col);
    });
}

// Variables globales
const actividadesResumen = document.querySelector("#actividadesAñadidas");
const costeViaje = document.querySelector("#costeViaje");
const duracionViaje = document.querySelector("#duracionViaje");
const reservaForm = document.querySelector("#reservaForm");
const seguroInput = document.querySelector("#seguro");
const erroresDiv = document.querySelector("#errores");
let itinerario = [];
let total = 0;

// Función para actualizar itinerario, coste y horas
function actualizarItinerario() {
    actividadesResumen.innerHTML = "";
    total = 0;
    let horasTotales = 0;

    itinerario.forEach((actividad, index) => {
        const p = document.createElement("p");
        p.textContent = `${actividad.nombre} - ${actividad.destino} - ${actividad.precio} €`;

        const quitarBtn = document.createElement("button");
        quitarBtn.type = "button";
        quitarBtn.textContent = "Quitar";
        quitarBtn.addEventListener("click", () => {
            itinerario.splice(index, 1);
            actualizarItinerario();
        });

        p.appendChild(quitarBtn);
        actividadesResumen.appendChild(p);

        total += Number(actividad.precio);
        horasTotales += Number(actividad.duracionHoras || 0);
    });

    costeViaje.textContent = total;
    duracionViaje.textContent = horasTotales;

    if (total > 1000) {
        seguroInput.required = true;
    } else {
        seguroInput.required = false;
        seguroInput.checked = false;
    }
}

// Añadir actividad al itinerario
document.querySelector("#actividades").addEventListener("click", (event) => {
    if (event.target.classList.contains("añadir-viaje")) {
        const { nombre, destino, precio, duracionHoras } = event.target.dataset;
        itinerario.push({ nombre, destino, precio, duracionHoras });
        actualizarItinerario();
    }
});

// Inicializar filtros
function inicializarFiltros() {
    const selectPaises = document.querySelector("#pais");
    const tipos = document.querySelectorAll("#checks input[type='checkbox']");
    const presupuestoInput = document.querySelector("#maximo");
    const valorPresupuesto = document.createElement("span");
    presupuestoInput.parentNode.appendChild(valorPresupuesto);
    valorPresupuesto.textContent = presupuestoInput.value + " €";

    function aplicarFiltros() {
        const maxPrecio = parseFloat(presupuestoInput.value);
        const destinoSeleccionado = selectPaises.value;
        const tiposSeleccionados = Array.from(tipos)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const tarjetas = document.querySelectorAll(".cardViaje");
        tarjetas.forEach(card => {
            const precioCard = parseFloat(card.querySelector("p[data-price]").dataset.price);
            const tipoCard = card.dataset.tipo;
            const destinoCard = card.dataset.destino;

            const cumplePrecio = (maxPrecio === 0 || precioCard <= maxPrecio);
            const cumpleTipo = (tiposSeleccionados.length === 0 || tiposSeleccionados.includes(tipoCard));
            const cumpleDestino = (destinoSeleccionado === "todos" || destinoCard === destinoSeleccionado);

            if (cumplePrecio && cumpleTipo && cumpleDestino) {
                card.classList.remove("d-none");
            } else {
                card.classList.add("d-none");
            }
        });
    }

    selectPaises.addEventListener("change", aplicarFiltros);
    tipos.forEach(cb => cb.addEventListener("change", aplicarFiltros));
    presupuestoInput.addEventListener("input", () => {
        valorPresupuesto.textContent = presupuestoInput.value + " €";
        aplicarFiltros();
    });
}

// Validación al enviar el formulario
reservaForm.addEventListener("submit", (event) => {
    erroresDiv.innerHTML = "";
    let errores = [];

    if (itinerario.length === 0) errores.push("El itinerario no puede estar vacío.");

    const fechaInicio = document.querySelector("#fechaInicio").value;
    if (fechaInicio) {
        const hoy = new Date();
        const fechaSeleccionada = new Date(fechaInicio);
        fechaSeleccionada.setHours(0,0,0,0);
        hoy.setHours(0,0,0,0);
        if (fechaSeleccionada < hoy) errores.push("La fecha de inicio no puede ser pasada.");
    } else {
        errores.push("Debes seleccionar una fecha de inicio.");
    }

    if (seguroInput.required && !seguroInput.checked) errores.push("Debes marcar el seguro de viaje para reservas superiores a 1000€.");

    const codigo = document.querySelector("#codigoDescuento").value;
    if (codigo && !/^[A-Z]{4}\d{2}$/.test(codigo)) errores.push("El código de descuento debe tener 4 letras seguidas de 2 números (ej: ABCD25).");

    if (errores.length > 0) {
        event.preventDefault();
        erroresDiv.innerHTML = errores.join("<br>");
    }
});
