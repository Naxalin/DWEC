const botonInicio = document.getElementById("iniciarQuizz");
let pregunta = 0;
let respuestasCorrectas = 0;
let preguntas = [];

botonInicio.addEventListener("click", () => {
    cargarQuizz();
});

async function cargarQuizz() {
    const response = await fetch('../datos/preguntas.json');
    if (!response.ok) throw new Error('Error al cargar las preguntas');

    preguntas = await response.json();
    mostrarPregunta(pregunta);
}

function mostrarPregunta(indice) {
    const preguntaQuizz = document.querySelector('#quiz-container');
    const q = preguntas[indice];

    preguntaQuizz.innerHTML = `
        <div class="card mb-3" data-question-id="${q.questionId}">
            <div class="card-body">
                <h5 class="card-title">${q.questionId}. ${q.text}</h5>
                <div class="list-group">
                    ${q.options.map(opt => `
                        <label class="list-group-item list-group-item-action">
                            <input type="radio" name="${q.questionId}" value="${opt.id}" class="form-check-input me-2">
                            ${opt.id}. ${opt.text}
                        </label>
                    `).join("")}
                </div>
                <div class="mt-3">
                    ${indice > 0 ? '<button id="prev-btn" class="btn btn-secondary me-2">Anterior</button>' : ''}
                    ${indice < preguntas.length - 1 ? '<button id="next-btn" class="btn btn-primary">Siguiente</button>' : '<button id="finish-btn" class="btn btn-success">Finalizar</button>'}
                </div>
            </div>
        </div>
    `;

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            verificarRespuesta(q.correctAnswer);
            pregunta++;
            mostrarPregunta(pregunta);
        });
    }

    const prevBtn = document.getElementById("prev-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            pregunta--;
            mostrarPregunta(pregunta);
        });
    }

    const finishBtn = document.getElementById("finish-btn");
    if (finishBtn) {
        finishBtn.addEventListener("click", () => {
            verificarRespuesta(q.correctAnswer);
            preguntaQuizz.innerHTML = `<div class="alert alert-success">Has respondido correctamente ${respuestasCorrectas} de ${preguntas.length} preguntas.</div>`;
        });
    }
}

function verificarRespuesta(correcta) {
    const seleccion = document.querySelector(`input[name="${preguntas[pregunta].questionId}"]:checked`);
    if (seleccion && seleccion.value === correcta) {
        respuestasCorrectas++;
    }
}
