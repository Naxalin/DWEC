const tarjeta = document.getElementById("eventos");

async function init(){
    try {
        const datos = await fetch("../data/data.json");
        if(!datos.ok) return;
        const datosTarjetas = await datos.json();
        
        console.log(datosTarjetas)
        cargar(datosTarjetas);
    } catch (error) {
        console.error("Error al cargar los datos")
    }
}

function cargar(eventos) {
  eventos.forEach(evento => {
    if (!(evento.fecha instanceof Date)) {
      evento.fecha = parsearFecha(evento.fecha);
    }
  });
  eventos.sort((a, b) => a.fecha - b.fecha);

  tarjeta.innerHTML = "";

  eventos.forEach((element, i) => {
    const fechaFormateada = formatearFecha(element.fecha);

    tarjeta.insertAdjacentHTML("beforeend", `
      <div class="col-12 col-md-6 col-lg-4 mb-2">
        <div class="card shadow-sm rounded-3 h-100" style="max-width: 320px;">
          <div class="card-body p-3">

            <h6 class="card-title fw-semibold mb-1">
              ${element.nombre}
            </h6>

            <p class="card-text text-muted small mb-1">
              ${element.descripcion}
            </p>

            <p class="mb-2">
              <strong>Fecha:</strong> <span class="fecha">${fechaFormateada}</span>
            </p>

            <div class="bg-success bg-opacity-10 text-success text-center fw-bold py-1 rounded mb-2 contador">
              ${contador(element.fecha)}
            </div>

            <div class="d-flex gap-1">
              <input type="number" class="form-control form-control-sm sumar" placeholder="Días a sumar" />
              <button class="btn btn-primary btn-sm pospon">Posponer</button>
            </div>

          </div>
        </div>
      </div>
    `);

    const tarjetaActual = tarjeta.lastElementChild; 
    const btn = tarjetaActual.querySelector(".pospon");
    const input = tarjetaActual.querySelector(".sumar");
    const fechaSpan = tarjetaActual.querySelector(".fecha");
    const countSpan = tarjetaActual.querySelector(".contador");

    btn.addEventListener("click", () => {
      const dias = parseInt(input.value);
      element.fecha.setDate(element.fecha.getDate() + dias);
      fechaSpan.textContent = formatearFecha(element.fecha);
      countSpan.textContent = contador(element.fecha);
    });

    setInterval(() => {
      countSpan.textContent = contador(element.fecha);
    }, 1000);
  });
}







function contador(fecha){
    const ahora = new Date();
    const finalizar = parsearFecha(fecha)
    let diff = finalizar - ahora;

    if (diff < 0) {
        return "Finalizo"
    }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);
    
  return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}


function parsearFecha(fecha) {
  let f;

  if (fecha instanceof Date) {
    f = fecha;

  } else if (typeof fecha === "number") {
    f = new Date(fecha);

  } else if (typeof fecha === "string") {
    f = new Date(fecha);

  } else if (typeof fecha === "object" && fecha !== null) {
    const { año, mes, dia, hora = 0, min = 0, seg = 0 } = fecha;
    f = new Date(año, mes - 1, dia, hora, min, seg);
  }


  return f;
}

function formatearFecha(fecha) {
  const f = parsearFecha(fecha);
  return `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`;
}


document.addEventListener("DOMContentLoaded", init);