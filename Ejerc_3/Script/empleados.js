let empleados = [];

function empleado (id, nombre, departamento, salario){
    this.id = id,
    this.nombre = nombre,
    this.departamento = departamento,
    this.salario = salario
}

export function agregarEmpleado(empleados){
    empleados.push(new empleado(empleados))
}

export function eliminarEmpleado(id){
    empleados.findIndex((empleadoEliminado) =>     empleados.findIndex((empleadoEliminado) => empleados.id === id)
.id === id)
    return empleados.splice(empleadoEliminado,1)
}

export function buscarPorDepartamento(departamento){

    return empleados.filter((empleados) => empleados.departamento === departamento)
}

export function calcularSalarioPromedio(){
    return empleados.reduce((acum, empleados) => acum + empleados.salario,0);
}

export function obtenerEmpleadosOrdenadosPorSalario(){
    return empleados.sort((a,b) => a.salario + b.salario)
}