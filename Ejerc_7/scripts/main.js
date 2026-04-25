document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
    const caja = document.querySelector("#outer-box");
    caja.addEventListener("click", (event) => {
        const dentro = event.currentTarget;
        console.log(event.target);
        console.log(event.target);

        event.target.style.background = "#FF7F50";
    })
    const cajaDelMedio = document.querySelector("#middle-box");
    cajaDelMedio.addEventListener("click", (event) => {
        event.stopPropagation()
        event.target.style.background = "#FF7F50";

    })

    // --- Solución Ejercicio 2 ---
    const navegacion = document.querySelector("#test-link");
    navegacion.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Navegacion evitada");
    })

    // --- Solución Ejercicio 3 ---
    window.addEventListener("scroll", () => {
        if(window.scrollY > 1000){
            window.scrollTo({top:0,left:0, behavior: "smooth"})
        }
    })

    // --- Solución Ejercicio 5 ---

    const detail = {
        "texto" : "La hora exacta es: ",
        "Hora" : new Date()
    }

    const notification = document.querySelector("#notification-btn")
    const text = document.querySelector("#notification-area p");
    notification.addEventListener("click", () => {
        text.innerHTML = "";
        text.innerHTML = detail.texto +" " + detail.Hora;
    })
});
