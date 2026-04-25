const contenedor = document.querySelector(".contenedorGrande");
const arrastrable = document.querySelector(".contenedorPequeño");

let arrastrando = false;
let offsetX = 0;
let offsetY = 0;

arrastrable.addEventListener("mousedown", (e) => {
    arrastrando = true;
    offsetX = e.clientX - arrastrable.offsetLeft;
    offsetY = e.clientY - arrastrable.offsetTop;
    arrastrable.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!arrastrando) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = contenedor.clientWidth - arrastrable.clientWidth;
    const maxY = contenedor.clientHeight - arrastrable.clientHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    arrastrable.style.left = x + "px";
    arrastrable.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
    if (arrastrando) {
        arrastrando = false;
        arrastrable.style.cursor = "grab";
    }
});
