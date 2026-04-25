const BASE = '/api';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    let mensaje = `Error ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) mensaje = body.error;
    } catch (_) {}
    throw new Error(mensaje);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getLibros() {
  return request(`${BASE}/libros`);
}

export async function getLibroById(id) {
  return request(`${BASE}/libro/${id}`);
}

export async function getPrestados() {
  return request(`${BASE}/prestados`);
}

export async function getVencidos() {
  return request(`${BASE}/vencidos`);
}

export async function getPrestamosPorUsuario(nombre) {
  const params = new URLSearchParams({ nombre });
  return request(`${BASE}/prestamos/usuario?${params}`);
}

export async function getFormularioPrestamo(libroId) {
  return request(`${BASE}/prestamo/formulario/${libroId}`);
}

export async function crearPrestamo(datos) {
  return request(`${BASE}/prestamo/nuevo`, {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export async function devolverPrestamo(libroId) {
  return request(`${BASE}/prestamo/devolver/${libroId}`, {
    method: 'POST',
  });
}