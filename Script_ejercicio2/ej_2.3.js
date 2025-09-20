
/* 
### Ejercicio 2.3: Condicionales y Operadores Lógicos

1. Crea una función que reciba un `saldo` y una cantidad a `retirar`.
2. Dentro de la función, comprueba si el `saldo` es mayor o igual a la cantidad a `retirar`.
3. Si se puede retirar, muestra “Retiro exitoso. Saldo restante: [nuevo saldo]”.
4. Si no, muestra “Saldo insuficiente”.
5. **Extra:** Añade una variable booleana `tieneTarjetaCredito`. Modifica la lógica para que, 
si el saldo no es suficiente PERO `tieneTarjetaCredito` es `true`, muestre “Saldo insuficiente, pagando con tarjeta de crédito”.
*/


function comprobacion(saldo, retiro, tarjetaCredito){
    if(saldo > retiro){
        console.log("RETIRO EXITOSO")
    } else  if (!tarjetaCredito && retiro > saldo) {
        console.log("Saldo Insuficiente")
    } else 
        console.log("Saldo insuficiente pagado con tarjeta de credito")
    }


console.log(comprobacion(0, 6, true))
