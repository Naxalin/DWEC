const URL = "38e7c63c087b431091d8648d3961d758";
const API_URL = `https://crudcrud.com/api/${URL}/usuarios`;
const listaHtml = document.getElementById("lista");
const nombreForm = document.getElementById("nombre");
const apellidoForm = document.getElementById("apellido")
const emailForm = document.getElementById("email");
const urlForm = document.getElementById("url");
const botonGuardado = document.querySelector(".guardar")
let usuarioGlobal;


//Sube los usuarios

async function uploadInitialUsers(users){
    const datosUsuarios = await fetch('../data/usuarios.json')
    const datos = await datosUsuarios.json()

    datos.forEach(element => {
    const options = {
        method: "POST",
        body: JSON.stringify(element),
        headers: {"Content-type": "application/json" }
    }

    fetch(API_URL, options).then(resultado => {
        return resultado.json();
    }).then(resultadoJson => {
    }).catch(error => {
        error.log("No se puedo realizar el POST");

    })  

    });
    displayUsers()
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
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
        const tr = e.target.closest("tr");
        const id = tr.dataset.id;

        usuarioGlobal.forEach(user => {
            if(user._id === id){
                nombreForm.value = user.firstName;
                apellidoForm.value = user.lastName;
                emailForm.value = user.email;
                urlForm.value = user.picture;
                botonGuardado.dataset.id = user._id;

            }
        })
    }

    if(e.target.classList.contains("guardar")){

            const user = usuarioGlobal.find(u => u._id === e.target.dataset.id);
            if(user){
                console.log(user)
                user.firstName = nombreForm.value;
                user.lastName = apellidoForm.value;
                user.email = emailForm.value;
                user.picture = urlForm.value;
                console.log(user)

                fetch(`${API_URL}/${e.target.dataset.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        picture: user.picture
                    })
                }).then(() => displayUsers());
                
                nombreForm.value = "";
                apellidoForm.value = "";
                emailForm.value = "";
                urlForm.value = "";
                botonGuardado.dataset.id = "";

            } else {
                const usuarioNuevo = {
                firstName: nombreForm.value,
                lastName: apellidoForm.value,
                email: emailForm.value,
                picture: urlForm.value
                };

                fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioNuevo)
                })
                .then(res => res.json())
                .then(nuevoUser => {
                    usuarioGlobal.push(nuevoUser);
                    mostrarPagina();

                    nombreForm.value = "";
                    apellidoForm.value = "";
                    emailForm.value = "";
                    urlForm.value = "";
                    e.target.dataset.id = "";
                });
            }
             
    if (e.target.classList.contains("eliminar")) {
        const tr = e.target.closest("tr");
        const id = tr.dataset.id
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(res => tr.remove());
    }
}
});


// Al cargar la pagina llama a una funcion selecionada
document.addEventListener("DOMContentLoaded", uploadInitialUsers);