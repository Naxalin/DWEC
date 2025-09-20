import resumenInventario, {crearProducto,filtrarPorCategoria,listarProductosAgotados,calcularValorTotalInventario} from "./inventario.js";

const inventario = [];
inventario.push(crearProducto("Laptop","Electrónica",1000,5));
inventario.push(crearProducto("Smartphone","Electrónica",700,10));
inventario.push(crearProducto("Camiseta","Ropa",20,0));
inventario.push(crearProducto("Pantalones","Ropa",40,15));
inventario.push(crearProducto("Libro","Libros",15,7));

console.log("Productos en la categoría 'Ropa':", filtrarPorCategoria(inventario, "Ropa"));
console.log("Productos agotados:", listarProductosAgotados(inventario));
console.log("Valor total del inventario:", calcularValorTotalInventario(inventario));
console.log(resumenInventario(inventario));