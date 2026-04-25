const botones = document.querySelectorAll("#botones-pestanas button");

botones.forEach((boton, index) => {
  boton.dataset.id = (index + 1);

  // Cuando se hace click en un botón
  boton.addEventListener("click", (evento) => {

    let contenidos = document.querySelectorAll("#contenido-pestanas .pestana");

    contenidos.forEach(element => {
      element.classList.add("oculto");
    });

    const id = evento.target.dataset.id;
    console.log(id)
    console.log(document.getElementById(id));
   document.getElementById(id).classList.remove("oculto");
   
 
  });
});
