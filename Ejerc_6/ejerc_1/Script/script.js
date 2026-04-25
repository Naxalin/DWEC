
    const boton = document.querySelector(".mostrar");
    const modal = document.querySelector("div");  
    const modalBoton = document.querySelector("div button");  

    console.log(boton);
    console.log(modal);

    boton.addEventListener("click", () => {
        console.log("Entro")
        modal.classList.remove("oculto");   
        console.log("tiene"+modal);

        
    })

        modalBoton.addEventListener("click", () => {
        console.log("Entro")
        modal.classList.add("oculto");   
        console.log("tiene"+modal);

        
    })