const form = document.querySelector("form");
let añadir = false;
let pedido = [];

form.addEventListener("change", (event) => {
    const cambio = event.target;
    console.log(cambio);

    const check = document.querySelectorAll('input[type="checkbox"]');

    check.forEach(elemt => {
        if(elemt.className=== cambio.className){
            if(elemt.checked){
                añadir = true;
            }
            else{
                añadir = false;
            }
        }
    })
    
    
    actualizarPrecio(cambio.dataset.precio);
});


function actualizarPrecio() {
    const precio = document.querySelector(".totalPrecio");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tamaños = document.querySelectorAll("#tamaño");
    let total = 0;

    tamaños.forEach(tm => {
        if(tm.checked){
            pedido.push(tm.name)
            total += parseFloat(tm.dataset.precio);

        }
        else{
            let index = pedido.indexOf(tm.name);
            pedido.splice(index, 1)
        }
    })

    checkboxes.forEach(cb => {
        if(cb.checked) {
            pedido.push(cb.name)
            total += parseFloat(cb.dataset.precio);
        }        
        else{
            let index = pedido.indexOf(cb.name);
            pedido.splice(index, 1)
        }
        
    });
    console.log(pedido)
    precio.dataset.precio = total;
    precio.innerHTML = total.toFixed(2);

    console.log(`Precio total actualizado: ${total}`);
}

const boton = document.querySelector("button");
boton.addEventListener("click", () => {
    alert(pedido)
})