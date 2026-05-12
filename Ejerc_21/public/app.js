async function cargarAlumnos() {
    const lista = document.getElementById('lista')

    const res = await fetch('/imagenes')
    const alumnos = await res.json()

    lista.innerHTML = ''

    if (alumnos.length === 0) {
        lista.innerHTML = '<p class="vacio">No hay alumnos registrados aún.</p>'
        return
    }

    alumnos.forEach(alumno => {
        const div = document.createElement('div')
        div.className = 'alumno-card'
        div.innerHTML = `
            <img src="${alumno.imagen}" alt="${alumno.nombre}"/>
            <p class="nombre">${alumno.nombre} ${alumno.apellidos}</p>
            <p class="localidad">${alumno.localidad || 'Sin localidad'}</p>
            <button class="btn-eliminar" onclick="eliminar(${alumno.id})">Eliminar</button>
        `
        lista.appendChild(div)
    })
}

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault()

    const btn = document.getElementById('btn-submit')
    const btnText = btn.querySelector('.btn-text')
    const btnLoading = btn.querySelector('.btn-loading')

    btn.disabled = true
    btnText.style.display = 'none'
    btnLoading.style.display = 'inline'

    const formData = new FormData(e.target)

    await fetch('/subir', {
        method: 'POST',
        body: formData
    })

    btn.disabled = false
    btnText.style.display = 'inline'
    btnLoading.style.display = 'none'

    e.target.reset()
    cargarAlumnos()
})

async function eliminar(id) {
    if (!confirm('¿Seguro que quieres eliminar este alumno?')) return
    await fetch(`/alumno/${id}`, { method: 'DELETE' })
    cargarAlumnos()
}

cargarAlumnos()