const errorNombre = document.getElementById("mensajeErrorNombre");
const errorSku = document.getElementById("mensajeErrorSku");
const errorPrecio = document.getElementById("mensajeErrorPrecio");
const errorStock = document.getElementById("mensajeErrorStock");
const errorCategoria = document.getElementById("mensajeErrorCategoria");
const form = document.querySelector("form");
const btnEnviar = document.querySelector("button");
const inputs = form.querySelectorAll("input");
const skuInput = form.querySelector("#sku")
let datosProductosGlobales;

// Habilita el botón solo si todos los inputs están llenos
inputs.forEach(element => {
    element.addEventListener("input", actualizarBoton);
})

// Carga los productos para su uso
async function cargarProductos(){
    const datos = await fetch('../data/producto.json');
    if(!datos.ok) throw new Error("No se encontro el Archivo");
    const datosProductos = await datos.json();
    datosProductosGlobales = datosProductos;
}

skuInput.addEventListener("blur", () => {
    actualizarBoton();
})

function validarSku(sku){
    const existe = datosProductosGlobales.some(elem => elem.sku === sku)
    btnEnviar.disabled = existe;
}

// habilitar o desabilita
function actualizarBoton() {
    const todosLlenos = Array.from(inputs).every(input => input.value.trim() !== "");
    validarSku(skuInput.value.trim());
    if (!todosLlenos) {
        btnEnviar.disabled = true;
    }
}

// Formulario a Objeto.
form.addEventListener('submit', e => {
    e.preventDefault();
    const datosFormulario = Object.fromEntries(new FormData(e.target))
    validarForm(datosFormulario)
    form.reset();
    btnEnviar.disabled = true;
})

function validarForm(form){
    Errores(form, datosProductosGlobales)
}

// Errores
function Errores(form,datosProductos){
    errorSku.textContent = "";
    errorPrecio.textContent = "";
    errorStock.textContent = "";
    errorCategoria.textContent = "";

    const nombre = form.nombre;
    const sku = form.sku;
    const precio = form.precio;
    const stock = form.stock;

    if(sku.length < 5){
         errorSku.textContent = "Minimo un tamaño de 5 letras para el Sku...";
         return;
    }
    if(precio <= 0){
        errorPrecio.textContent = "Precio no valido";
        return;
    }
    if(stock < 0) {
        errorStock.textContent = "Stock no valido";
        return;
    }

    datosProductos.forEach(element => {
        if(element.nombre === nombre){
            errorNombre.textContent = "El nombre ya existe"
            return;
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
})
