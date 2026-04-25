const colores = document.querySelectorAll(".rojo, .azul, .verde, .amarillo, .morado");

colores.forEach(color => {
  color.addEventListener("click", (event) => {
    const tbody = document.querySelector("body");
    tbody.className = "";
    tbody.classList.add(event.currentTarget.className);
  });
});
