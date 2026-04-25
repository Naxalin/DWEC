numeros =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

dobles = numeros.map(function(numeros) {
    return numeros * 2
})
console.table(dobles)

pares = numeros.filter(function(numeros){
    return numeros % 2 == 0
})

for(num of pares){
    console.log(num)
}