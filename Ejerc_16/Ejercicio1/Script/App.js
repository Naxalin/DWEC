const tabla = document.querySelector("#tabla-sesiones");
const consumoTotalMB = document.getElementById("total-consumo");
let consumos = [];
async function init() {
    try {
        const response = await fetch('data/logs.txt'); 

        const texto = await response.text();
        const usuario = extraer(texto);
        añadirTabla(usuario);
        
    } catch (error) {
        console.error("Documento no encontrado o error al cargar:", error);
    }
}

function extraer(tx) {
    try {
        const lineas = tx.split("\n"); 
        const users = lineas.map(linea => {
        return linea.split("-")[1].trim().toLowerCase();
        }).filter(id => id !== null);

    return users;
    } catch (error) {
        console.error("NO SE HA PODIDO EXTRAER")
    }
}

function añadirTabla (text){
    tabla.innerHTML = "";
    text.forEach(element => {
        const partes = element.split("|").map(p => p.trim());
        const id = partes[0]
        const nombre = partes[1].split(":")[1].trim();
        const consumoBytes = parseFloat(partes[2].split(":")[1].replace("bytes","").trim());
        const consumoMB = (consumoBytes / 1024 / 1024).toFixed(2);
        const status = partes[3].split(":")[1].trim();
        const claseFila = status.toUpperCase().includes("ERROR") ? "table-danger" : "";
        consumos.push(consumoMB);
        
        tabla.innerHTML += `
        <tr class="${claseFila}">
            <td>${id}</td>
            <td>${nombre}</td>
            <td class="consumos">${consumoMB}</td>
            <td>${status}</td>
        </tr>
        `;
    });
    consumoTotal();
}

function consumoTotal() {
  const total = consumos.reduce((acc, num) => acc + Number(num), 0);
  consumoTotalMB.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", init);