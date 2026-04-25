const Pendiente = document.querySelector(".pendiente");
const enProceso = document.querySelector(".proceso");
const terminada = document.querySelector(".terminada");

async function init() {
  const datos = await fetch("../data/data.json");
  if (!datos.ok) return;
  const tareas = await datos.json();
  añadirTareas(tareas);
}

function añadirTareas(tareas) {
  const estados = ["Pendiente", "Realizando", "Completada"];

  // Limpiar columnas
  [Pendiente, enProceso, terminada].forEach((element) => (element.innerHTML = ""));

  // Añadir tareas
  [Pendiente, enProceso, terminada].forEach((element, index) => {
    tareas.forEach((data) => {
      if (data.status === estados[index]) {
        const divTarea = document.createElement("div");
        divTarea.className = "list-group-item text-center w-75";
        divTarea.draggable = true;
        divTarea.id = data.id;
        divTarea.innerHTML = `<h5>${data.id}</h5><p class="mb-0">${data.status}</p>`;
        element.appendChild(divTarea);

        divTarea.addEventListener("dragstart", iniciarArrastre);
        divTarea.addEventListener("dragend", () => (divTarea.style.opacity = "1"));
      }
    });
  });

  [Pendiente, enProceso, terminada].forEach((columna) => {
    columna.addEventListener("dragover", (ev) => ev.preventDefault());
    columna.addEventListener("drop", soltarTarea);
  });
}

function iniciarArrastre(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
  ev.target.style.opacity = "0.5";
}

function soltarTarea(ev) {
  ev.preventDefault();

  const idTarea = ev.dataTransfer.getData("id");
  const tarea = document.getElementById(idTarea);
  tarea.style.opacity = "1";

  const columna = ev.currentTarget;

  const hijos = Array.from(columna.children);
  const referencia = hijos.find(hijo => {
    const rect = hijo.getBoundingClientRect();
    return ev.clientY < rect.top + rect.height / 2;
  });

  if (referencia) {
    columna.insertBefore(tarea, referencia);
  } else {
    columna.appendChild(tarea);
  }

  if (columna.classList.contains("pendiente")) tarea.querySelector("p").textContent = "Pendiente";
  if (columna.classList.contains("proceso")) tarea.querySelector("p").textContent = "Realizando";
  if (columna.classList.contains("terminada")) tarea.querySelector("p").textContent = "Completada";
}


  
document.addEventListener("DOMContentLoaded", init);