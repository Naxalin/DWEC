function editar(td){
    const valor = td.textContent;
    const input = document.createElement("input");

    input.value = valor;
    td.textContent = ""
    td.appendChild(input);
    input.focus();

    input.onblur =function(){
        td.textContent = input.value;
    }
}