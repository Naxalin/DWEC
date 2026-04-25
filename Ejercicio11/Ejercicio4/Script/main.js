const USER_URL = 'https://jsonplaceholder.typicode.com/users/1';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?userId=1';


async function init() {
  let usuariosOk = true;
  let postsOk = true;

  try {
    await cargarUsuarios();
  } catch (e) {
    usuariosOk = false;
    console.error("Error al cargar usuarios:", e.message);
  }

  try {
    await cargarPost();
  } catch (e) {
    postsOk = false;
    console.error("Error al cargar posts:", e.message);
  }
}

async function cargarUsuarios() {
  try {
    const response = await fetch(USER_URL);
    if (!response.ok) throw new Error('Error al cargar los Usuarios');

    const user = await response.json();
    const usuariosRegistrados = document.querySelector("#user-widget");
    usuariosRegistrados.innerHTML = ""; 

    usuariosRegistrados.innerHTML = `
      <div class ="usuarioID" data-id="${user.id}">
        <h5>${user.name}</h5>
        <p>Correo: ${user.email}</p>
        <p>Dirección: ${user.address.street}, ${user.address.city}</p>
        <p>Teléfono: ${user.phone}</p>
        <p>Compañía: ${user.company.name}</p>
      </div>
    `;

  } catch (error) {
    console.error(error);
  }
}


async function cargarPost() {
  try {
    const response = await fetch(POSTS_URL);
    if (!response.ok) throw new Error('Error al cargar los Post');

    const posts = await response.json();
    const listaDePost = document.querySelector("#posts-widget");
    const usuariosId = document.querySelectorAll(".usuarioID");
    listaDePost.innerHTML = ""; 

    usuariosId.forEach(user => {
      posts.forEach(post => {
        if(Number(user.dataset.id) === post.userId) {
          listaDePost.innerHTML += `
            <div class="producto" data-userId="${post.userId}">
              <h5>${post.title}</h5>
              <p>${post.body}</p>
            </div>
          `;
        }
      });
    });

  } catch (error) {
    console.error(error);
  }
}


document.addEventListener("DOMContentLoaded", init);