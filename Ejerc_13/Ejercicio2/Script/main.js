const URL = "8b2d88a562924c9fb31ab5110f35a3f9";
const API_URL = `https://crudcrud.com/api/${URL}/usuarios`;
const listaHtml = document.getElementById("lista");
const nombreForm = document.getElementById("nombre");
const apellidoForm = document.getElementById("apellido")
const emailForm = document.getElementById("email");
const urlForm = document.getElementById("url");
const mensaje = document.getElementById("mensajeCarga");
const botonGuardado = document.querySelector(".guardar");
const botones = document.querySelector("button");
const busqueda = document.querySelector("#busqueda");
const mensajeAlert = document.querySelector("#mensajeAlert");
let usuarioGlobal;


//Sube los usuarios

async function uploadInitialUsers() {
    const resp = await fetch(API_URL);
    usuarioGlobal = await resp.json();

    const datosUsuarios = await fetch('../data/usuarios.json');
    const datos = await datosUsuarios.json();

    mensaje.textContent = "Cargando...";
    botones.disabled = true;

    for (const element of datos) {
        console.log(usuarioGlobal)
        const existe = usuarioGlobal.some(u => u.email === element.email);
        console.log(!existe)

        if (!existe) {
            try {
                const resultado = await fetch(API_URL, {
                    method: "POST",
                    body: JSON.stringify(element),
                    headers: { "Content-type": "application/json" }
                });

                const datoCreado = await resultado.json();
                console.log("Usuario agregado:", datoCreado);

                usuarioGlobal.push(datoCreado);

            } catch (error) {
                console.log("No se pudo realizar el POST", error);
            }
        }
    }

    displayUsers();
    mensaje.textContent = "Usuarios cargados";
    botones.disabled = false;
}





async function displayUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(json => {
            usuarioGlobal = json; 
            mostrarPagina();
        })
        .catch(err => console.log("Error:", err));
}


// Los muestra en el HTML
function mostrarPagina(){
    mensaje.textContent = ""
    listaHtml.innerHTML = "";
    usuarioGlobal.forEach(user => {
        listaHtml.innerHTML+= `
            <tr data-id=${user._id}>
            <td style="width:70px;">
                <img
                src="${user.picture}"
                class="rounded-circle imagen"
                width="50"
                height="50"/>
            </td>
            <td>
              <div class="fw-bold nombreUser">${user.firstName}</div>
              <div class="text-muted correoUser">${user.email}</div>
            </td>
            <td class="text-end">
              <button class="btn btn-warning btn-sm editar">Editar</button>
              <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
            </td>
        </tr>
        `;
    })
}

// Eventos de Click
document.addEventListener("click", async (e) => {

    // --- EDITAR ---
    const botonEditar = e.target.closest(".editar");
    if (botonEditar) {
        const tr = botonEditar.closest("tr");
        const id = tr.dataset.id;

        const user = usuarioGlobal.find(u => u._id === id);
        if(user){
            nombreForm.value = user.firstName;
            apellidoForm.value = user.lastName;
            emailForm.value = user.email;
            urlForm.value = user.picture;
            botonGuardado.dataset.id = user._id;
            botonGuardado.disabled = false;
        }
    }

    // --- GUARDAR / ACTUALIZAR ---
    const botonGuardar = e.target.closest(".guardar");
    if (botonGuardar) {


        const id = botonGuardar.dataset.id;
        let user = usuarioGlobal.find(u => u._id === id);

        if (user) {
            // ACTUALIZAR
            user.firstName = nombreForm.value;
            user.lastName = apellidoForm.value;
            user.email = emailForm.value;
            user.picture = urlForm.value;

            const usuarioModificado = {
                firstName: nombreForm.value,
                lastName: apellidoForm.value,
                email: emailForm.value,
                picture: urlForm.value
            };

            try {
                const res = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuarioModificado)
                });
                if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);
                mostrarPagina();
                alert("Usuario actualizado correctamente.");
            } catch (error) {
                console.log("Error al actualizar usuario:", error);
                mensajeAlert.textContent =   "Error al actualizar usuario. Revisa la consola.";
                    setTimeout(() => {
                        mensajeAlert.textContent = "";
                    }, 2000);
            }

        } else {
            // CREAR NUEVO
            const usuarioNuevo = {
                firstName: nombreForm.value,
                lastName: apellidoForm.value,
                email: emailForm.value,
                picture: urlForm.value
            };

            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuarioNuevo)
                });
                if (!res.ok) throw new Error(`Error al crear usuario: ${res.status}`);
                const nuevoUser = await res.json();
                usuarioGlobal.push(nuevoUser);
                mostrarPagina();
                alert("Usuario agregado correctamente.");
            } catch (error) {
                console.log("Error al agregar usuario:", error);
                mensajeAlert.textContent = "Error al agregar usuario. Revisa la consola.";
                setTimeout(() => {
                    mensajeAlert.textContent = "";
                }, 2000);

            }
        }

        // Limpiar formulario
        nombreForm.value = "";
        apellidoForm.value = "";
        emailForm.value = "";
        urlForm.value = "";
        botonGuardado.dataset.id = "";
        botonGuardado.disabled = true;
    }

    // --- ELIMINAR ---
    const botonEliminar = e.target.closest(".eliminar");
    if (botonEliminar) {
        const tr = botonEliminar.closest("tr");
        const id = tr.dataset.id;

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`Error al eliminar usuario: ${res.status}`);
            tr.remove();
            usuarioGlobal = usuarioGlobal.filter(u => u._id !== tr.dataset.id);
            mensajeAlert.textContent = "Usuario eliminado correctamente.";
            setTimeout(() => {
                mensajeAlert.textContent = "";
            }, 2000);

        } catch (error) {
            console.log("Error al eliminar usuario:", error);
            mensajeAlert.textContent = "Error al eliminar el Usuario correctamente.";
            setTimeout(() => {
                mensajeAlert.textContent = "";
            }, 2000);
        }
    }

});

// Busqueda
busqueda.addEventListener("input", (e) => {
    const valor = e.target.value.toLowerCase();

    usuarioGlobal.forEach(user => {
        const fila = document.querySelector(`tr[data-id="${user._id}"]`);
        if (!fila) return;

        const coincide = 
            user.firstName.toLowerCase().includes(valor) ||
            user.lastName.toLowerCase().includes(valor);

        fila.classList.toggle("d-none", !coincide);
    });
});

// Al cargar la pagina llama a una funcion selecionada
document.addEventListener("DOMContentLoaded", uploadInitialUsers);