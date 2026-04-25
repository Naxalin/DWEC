'use strict';
// Sobre Escribir
const lista = document.querySelector(".ListaSoporte");
const inventarioHtml = document.querySelector("#inventario");
const calcularButton = document.querySelector("#calcular");

document.addEventListener("DOMContentLoaded", () => {
  const xmlSoporte = new XMLHttpRequest();
  xmlSoporte.open("GET", "../xml/soporte_vital.xml", true);

  xmlSoporte.onload = function () {

    // Se encarga de parsear el xml
    const domParser = new DOMParser().parseFromString(xmlSoporte.responseText, 'text/xml');
    const medicion = domParser.querySelectorAll("medicion");
    const medicionesArray = Array.from(medicion)
      .sort((a, b) => new Date(a.getAttribute("timestamp")) - new Date(b.getAttribute("timestamp")));

    // Se añade a la pagina
    medicionesArray.forEach(element => {
      const div = document.createElement("div");

      ["oxigeno", "temperatura", "presion"].forEach(tag => {
        const p = document.createElement("p");
        p.textContent = element.getElementsByTagName(tag)[0].textContent;
        div.appendChild(p);
      });

      lista.appendChild(div);
    });
  };

  xmlSoporte.send();
});



// Inventario
document.addEventListener("DOMContentLoaded", () => {

    const xmlInventario = new XMLHttpRequest();
    xmlInventario.open("GET", "../xml/inventario.xml", true);

    xmlInventario.onload = function() {

        const domParser = new DOMParser().parseFromString(xmlInventario.responseText, 'text/xml');
        const items = domParser.querySelectorAll("item");

        const arrayInventario = Array.from(items);

        arrayInventario.forEach(element => {
            const opt = document.createElement("option");
            opt.textContent = element.getElementsByTagName("nombre")[0].textContent
            opt.value = element.getAttribute("id");

            inventarioHtml.appendChild(opt)

        })

        inventarioHtml.addEventListener("change", (event) => {
            const mostrarInventario = document.querySelector("#datosInventario")
            mostrarInventario.innerHTML = " ";

            const cantidades = arrayInventario.find(obj => obj.getAttribute("id") === event.currentTarget.value)
            mostrarInventario.innerHTML = cantidades.getElementsByTagName("cantidad")[0].textContent
        })

        calcularButton.addEventListener("click", () => {
            const parrafAutonomia = document.querySelector(".autonomia");
            parrafAutonomia.innerHTML = "";

            arrayInventario.forEach(element => {
                const parrafo = document.createElement("p");

                const parrafCantidad = (parseInt(element.getElementsByTagName("cantidad")[0].textContent) 
                /  parseInt(element.getElementsByTagName("consumo")[0].textContent)) / 4;

                parrafo.innerHTML = "Autonomia de "+ 
                element.getElementsByTagName("nombre")[0].textContent + ": "+ parrafCantidad + " Dias";


                parrafAutonomia.appendChild(parrafo)


            })
        })

    }
    xmlInventario.send();
})
