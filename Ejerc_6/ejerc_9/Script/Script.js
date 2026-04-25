
let isDrawing = false;

document.addEventListener("DOMContentLoaded", function() {
crearDivs40 ()
})

function crearDivs40 (){
    const cuerpo = document.querySelector(".grid");
    for(let i =0 ; i< 200 ;i++){
         console.log("Pintando")
        let column = document.createElement("div")
        for(let e = 0 ; e < 200 ; e++){
            let fila = document.createElement("div")
            fila.addEventListener("mouseover", () => {
                if (isDrawing){
                    console.log("Pintando")
                    fila.style.backgroundColor = "black";
                 }      
            })
            cuerpo.appendChild(fila);
        }
        
    }
}

document.addEventListener("mousedown", () => {isDrawing = true})

document.addEventListener("mouseup", () => {isDrawing = false})

