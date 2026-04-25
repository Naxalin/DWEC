'use strict'

let datosGlobal;

async function init() {
    const datos = await cargarInformacion();
    datosGlobal = datos;
    cargarUsers(datosGlobal);
}

async function cargarInformacion() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 200) {
                const json = request.responseType === 'json' ? request.response : JSON.parse(request.responseText);
                resolve(json);
            } else if (request.status === 404) {
                window.alert("No se ha encontrado el archivo");
                reject("Archivo no encontrado");
            }
        };
        request.onerror = reject;
        request.open('GET', '../data/user_data.json', true);
        request.responseType = 'json';
        request.setRequestHeader('Accept', 'application/json');
        request.send();
    });
}

function cargarUsers(datosUsuarios) {
    const usuarioHtml = document.getElementById("user-profile");
    usuarioHtml.innerHTML = ""; // Limpiar antes de renderizar

    datosUsuarios.forEach(datos => {
        usuarioHtml.innerHTML += `
        <div class="card mb-3" data-id="${datos.id}">
            <div class="card-body">
                <h5 class="card-title">${datos.personalInfo.firstName} ${datos.personalInfo.lastName}</h5>
                <h6 class="card-subtitle mb-2 text-muted email">${datos.personalInfo.email}</h6>
                <p class="card-text">Teléfono: ${datos.personalInfo.phone}</p>

                <h6>Dirección</h6>
                <p class="street">${datos.address.street}</p>
                <p class="city">${datos.address.city}</p>
                <p class="zipCode">${datos.address.zipCode}</p>
                <p class="country">${datos.address.country}</p>

                <h6>Preferencias</h6>
                <p class="card-text">Tema: ${datos.preferences.theme}</p>
                <p class="card-text">Notificaciones: ${datos.preferences.notifications ? "Sí" : "No"}</p>
                <p class="card-text">Idioma: ${datos.preferences.language}</p>

                <h6>Hobbies</h6>
                <ul>
                    ${datos.hobbies.map(h => `<li>${h}</li>`).join('')}
                </ul>
                <button class="btn btn-primary btn-editar">Editar</button>
                <span class="save-status" style="margin-left:10px;"></span>
            </div>
        </div>`;
    });
}

document.addEventListener("click", async (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    // edita
    if (event.target.classList.contains("btn-editar")) {
        const campos = card.querySelectorAll(".email, .street, .city, .zipCode, .country");

        campos.forEach(element => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = element.textContent.trim();
            input.classList.add("editable-input");
            element.replaceWith(input);
        });

        event.target.textContent = "Guardar";
        event.target.classList.replace("btn-editar", "btn-guardar");
        card.querySelector(".save-status").textContent = "";
    }
    // Guarda
    else if (event.target.classList.contains("btn-guardar")) {
        const botonGuardar = event.target;
        const status = card.querySelector(".save-status");

        botonGuardar.disabled = true;
        botonGuardar.textContent = "Guardando...";
        status.textContent = "";

        const inputs = card.querySelectorAll(".editable-input");
        const [email, street, city, zipCode, country] = inputs;

        const campos = [
            { class: "email", value: email.value },
            { class: "street", value: street.value },
            { class: "city", value: city.value },
            { class: "zipCode", value: zipCode.value },
            { class: "country", value: country.value }
        ];

        // Reemplaza inputs por texto
        inputs.forEach((input, i) => {
            const tag = campos[i].class === "email" ? "h6" : "p";
            const nuevoElemento = document.createElement(tag);
            nuevoElemento.textContent = campos[i].value;
            nuevoElemento.classList.add(campos[i].class);
            input.replaceWith(nuevoElemento);
        });

        const id = parseInt(card.getAttribute("data-id"), 10);
        const usuario = datosGlobal.find(u => u.id === id);
        if (usuario) {
            usuario.personalInfo.email = campos[0].value;
            usuario.address.street = campos[1].value;
            usuario.address.city = campos[2].value;
            usuario.address.zipCode = campos[3].value;
            usuario.address.country = campos[4].value;
            console.log("Datos actualizados:", usuario);
        } else {
            console.warn(" No se encontró el usuario con id", id);
        }

        const data = {
            id,
            email: campos[0].value,
            street: campos[1].value,
            city: campos[2].value,
            zipCode: campos[3].value,
            country: campos[4].value
        };

        const url = "https://cors-anywhere.herokuapp.com/https://webhook.site/e30cff04-e667-4f63-8327-8d5b3bc7bc59";

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                botonGuardar.textContent = "Editar";
                botonGuardar.classList.replace("btn-guardar", "btn-editar");
                status.textContent = " Cambios guardados";
                status.style.color = "green";
            } else {
                console.error("Error al enviar datos:", xhr.status, xhr.statusText);
                botonGuardar.textContent = "Editar";
                botonGuardar.classList.replace("btn-guardar", "btn-editar");
                status.textContent = " Error al guardar";
                status.style.color = "red";
            }
            botonGuardar.disabled = false;
        };

        xhr.onerror = function() {
            console.error("Error de conexión al enviar los datos.");
            botonGuardar.textContent = "Editar";
            botonGuardar.classList.replace("btn-guardar", "btn-editar");
            status.textContent = " Error de red";
            status.style.color = "red";
            botonGuardar.disabled = false;
        };

        xhr.send(JSON.stringify(data));
    }
});

document.addEventListener('DOMContentLoaded', init);
