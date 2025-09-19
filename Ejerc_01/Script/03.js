let producto = {nombre : "Mochila", precio : 20};
let cliente = {
    nombreCliente : "Juan",
    esPremiun : true
};
const pedido = {...producto, ...cliente}

console.log(pedido)


