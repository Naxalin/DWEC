import {agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario} from './empleados'

agregarEmpleado(3,"Pedro","Ventas",1200);

agregarEmpleado(2,"maria","Ventas",1340);

agregarEmpleado(1,"Pedro","Ventas",1100);

console.log(buscarPorDepartamento("Ventas"))
console.log(calcularSalarioPromedio())
console.log(obtenerEmpleadosOrdenadosPorSalario())

eliminarEmpleado(2)

console.log(buscarPorDepartamento("Ventas"))


