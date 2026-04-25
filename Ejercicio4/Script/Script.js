console.log(document.title)
console.log(document.links)

/*     <script src="Script/Script.js"></script>
*/

let premiumCard = document.querySelector('.premium');
console.log(premiumCard.textContent);
/*Necesitamos hacer un inventario de todos los cursos. Genera una colección con todos los elementos que representan una tarjeta de curso y muéstrala en la consola.*/

let inventario = document.querySelectorAll('div.card');

for(cursos of inventario){
    console.log(cursos);
}

/* Localiza el formulario de la página por su identificador único ‘formulario-contacto’. */

let formulario = document.getElementById('formulario-contacto');

console.log(formulario);
/* Hay un párrafo en la página que contiene información sobre el precio en un atributo de datos. Encuéntralo usando ese atributo y muestra su contenido. */

let precio = document.querySelector(".oculto");
console.log(precio.ATTRIBUTE_NODE);


/*Dentro del formulario de contacto, encuentra el campo destinado a la dirección de correo electrónico. */

let formu = document.getElementById("formulario-contacto");
let correo = formu.querySelector("input[type=email]");
console.log(correo)

/*El segundo enlace del menú de navegación es importante. Selecciónalo directamente (sin iterar una lista) y muestra su texto en la consola.*/
let enlace = document.querySelector("a:nth-of-type(2)");
console.log(enlace.textContent);
/* El título principal de la página es demasiado genérico. Cámbialo para que diga ‘Nueva Guía Interactiva del DOM’. */
document.querySelector('h1').textContent = "Nueva Guía Interactiva del DOM";

/* El primer enlace del menú de navegación está roto. Asegúrate de que apunte a ‘https://www.google.com’. */
document.querySelector("nav a").href = "https://www.google.com";

/* Para darle más énfasis al título principal, asígnale la clase ‘titulo-grande’. Deberás añadir los estilos para esta clase en el CSS si quieres ver un cambio visual.*/
document.querySelector("h1").className = "titulo-grande";

/* El equipo de UX sugiere que sería útil para los usuarios ver de un vistazo cuántos cursos ofrecemos. La tarea consiste en que el enlace del menú que lleva a la sección de contacto refleje siempre el número total de cursos listados en la página. Por ejemplo, si hay 3 cursos, el enlace debería cambiar a “Contacto (3 Cursos)”. */
document.querySelector("a:nth-of-type(3)").textContent = `Contacto [${document.querySelectorAll(".card").lenght} cursos ]`

/* El departamento de marketing ha notado que la imagen del primer curso, el de JavaScript Moderno, tiene una tasa de clics muy baja. Han proporcionado una nueva imagen en la ruta ‘img/hacer4.jpg’ que debemos usar como reemplazo. Actualiza la imagen de ese curso en específico. **/
document.querySelector("img").src = "img/hacer4.jpg";

/* El botón de “Más Información” en la tarjeta premium tiene un texto poco llamativo. Cámbialo por ‘Ver Detalles Premium’. */
document.querySelector(".card.premium button").textContent = "Ver mas información";

/* Partiendo de la primera tarjeta de curso, localiza y trabaja sobre su tarjeta vecina, la que le sigue inmediatamente. */
let tituloSegundo = document.querySelector(".card");
let abajo = tituloSegundo.nextElementSibling;
console.log(abajo)

abajo.querySelector(".categoria").textContent = "Cursos Online";

/* El botón en la tarjeta premium es nuestro punto de partida. Desde él, navega por el DOM hacia arriba hasta encontrar el contenedor que agrupa toda su información (un div con la clase ‘info’).
*/
let boton = document.querySelector(".card button");
let raiz = boton.closest(".info");
console.log(raiz);

/*  Encuentra el título h2 que se encuentra dentro de la tarjeta del curso premium. */
let origen = document.querySelector(".card button");   
let contenedor = origen.closest(".info");              
let titulo = contenedor.querySelector("h2"); 
console.log(titulo); 

/* Partiendo desde el pie de página (footer), localiza el contenedor principal que está justo antes y aplícale un borde de 2px de color rojo para destacarlo. */
let pie = document.querySelector("footer");
let contenido = pie.previousElementSibling;
contenido.style.border = "2px solid red";

/* Comienza en el primer div de información (.info). Desde ahí, sube a su elemento padre (la tarjeta) y, una vez ahí, desciende para encontrar el primer elemento hijo de esa tarjeta, que debería ser la imagen.*/
let primerDivForm = document.querySelector(".info");
let nodo = primerDivForm.parentNode;
let hijo = nodo.children;
console.log(hijo);

/* Localiza el segundo enlace del menú. Tu objetivo es, partiendo de él, llegar hasta el título <h1> principal de la cabecera y cambiar su color a naranja. */

let segundoEnlace = document.querySelectorAll(".navegacion a")[2];
let nodoPadre = segundoEnlace.parentNode;
let tituloPagina = nodoPadre.previousElementSibling;
tituloPagina.style.color = "orange";

/* */


function mostrarInformacionPremium(){
    alert("Accediendo a información exclusiva para miembros premium")
};
/* El formulario de contacto debe ser funcional. Evita que la página se recargue al enviarlo y, en su lugar, captura los valores de los campos de nombre y mensaje y muéstralos en la consola.*/


let formularioContacto = document.getElementById("formulario-contacto");
formularioContacto.addEventListener("submit", function(event){
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;
    console.log("Nombre: " + nombre);
    console.log("Email: " + email);
    console.log("Mensaje: " + mensaje);
    formularioContacto.reset();
}
);

/* Hay información oculta en la tarjeta del curso de React. Implementa una funcionalidad para que, al hacer clic en el título de ESE curso, el párrafo oculto se vuelva visible.  */

function parrafoOculto(){
    let parrafo = document.querySelector(".oculto")
    parrafo.style.display = "block";
}

/* Para estandarizar los títulos de los cursos, recorre todos los h2 que están dentro de las tarjetas y añade el prefijo “[CURSO]” al principio de su texto.  */

let tituloCurso = document.querySelectorAll(".card h2");
tituloCurso.forEach(titulo => {
    titulo.textContent = "[CURSO] "+titulo.textContent;
});

/* Para mejorar la legibilidad, se ha decidido agrupar visualmente los cursos por temática. Tu objetivo es encontrar todas las tarjetas de cursos que pertenezcan a la categoría ‘Desarrollo Web’. Una vez identificadas, debes aplicarles un ligero fondo de color (#f0f0f0) para que se distingan del resto.*/

let categoria = document.querySelectorAll(".card .categoria");
categoria.forEach(categorias => {
    if(categorias.textContent === "Desarrollo Web"){
        categorias.style.backgroundColor = "#f0f0f0";
    }
});

/* Es necesario añadir la duración a todos los cursos. Para cada tarjeta, debes crear dinámicamente un nuevo párrafo, asignarle la clase ‘duracion’ y el texto ‘Duración: 20 horas’, y añadirlo al final de la sección de información. */


let curso = document.querySelectorAll(".card h2");
curso.forEach(cursos => {
    let parrafoNuevo = document.createElement("p");
    parrafoNuevo.textContent = "Duracion: 20 horas";
    cursos.appendChild(parrafoNuevo);
});

/* Queremos aplicar un estilo especial a los cursos estándar. Filtra la lista de tarjetas para obtener solo aquellas que NO son ‘premium’. A las tarjetas resultantes, aplícales un borde punteado de 2px de color negro. */

cursosClase = document.querySelectorAll(".card");
noPremium = Array.from(cursosClase).filter(curso => !curso.classList.contains("premium"));
noPremium.forEach(curso => {
    curso.style.border = "2px dashed black";
});

/*  Necesitamos una lista limpia con los nombres de las categorías para nuestro sistema de analítica. Genera un array que contenga únicamente el texto de cada párrafo de categoría y muéstralo en la consola. */
let nombres = document.querySelectorAll(".card ");
let almacenarNombres = [];

nombres.forEach(curso => {
    almacenarNombres.push(curso.querySelector("p").textContent);
});
console.log(almacenarNombres);

/* Para mejorar la accesibilidad y el rastreo, recorre todos los enlaces de la navegación y asígnales un atributo data-tipo con el valor enlace-nav.*/

let enlaces = document.querySelectorAll(".navegacion a");
enlaces.forEach(enlace => {
    enlace.setAttribute("data-tipo", "enlace-nav");
});

console.log(enlaces);

/* Limita tu búsqueda a la sección del formulario. Encuentra el área de texto (textarea) y cambia su texto de ejemplo (placeholder) a ‘Escribe aquí tu consulta detallada’. */

let texto = document.querySelector("#formulario-contacto textarea");
texto.setAttribute("placeholder", "Escribe tu consulta aqui");
/* Hay una oferta especial para el curso de React. Localiza su tarjeta y, buscando solo dentro de ella, encuentra el párrafo oculto para añadirle el texto ’ (¡Oferta especial!)’ al final. */

let oferta = document.querySelector(".oculto");
oferta.textContent = "(¡Oferta especial!) "+oferta.textContent;

/* */
let imagenes = document.querySelectorAll(".card img");
imagenes.forEach(img => {
    img.classList.add("imagen-curso");
});