
/*
### Ejercicio 2.2: Funciones

1. Escribe una **Function Declaration** llamada `calcularAreaRectangulo` que acepte `base` y `altura` y devuelva el área.
2. Escribe la misma lógica usando una **Function Expression** y guárdala en una constante `calcularAreaTriangulo`.
3. Convierte la función anterior en una **Arrow Function**.
4. Añade valores por defecto a los parámetros de cualquiera de las funciones anteriores.
5. Llama a cada función con valores de prueba y muestra el resultado en la consola.
*/

function calculadoraAreaRectangular(base = 4, altura = 4){
    return base*altura
}

const calculadoraAreaTriangulo = function(base = 4, altura = 4){
    return base + altura / 2
}

const calculadoraAreaTriangulo2 = (base = 4, altura = 4) => {
    return base + altura / 2
}

console.log(calculadoraAreaRectangular(12, 12))
console.log(calculadoraAreaTriangulo(12, 12))
console.log(calculadoraAreaTriangulo2(12, 12))
