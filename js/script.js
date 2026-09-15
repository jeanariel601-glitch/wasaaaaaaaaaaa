const pages = [
    "portada",
    "pag-1",
    "pag-2",
    "pag-3",
    "pag-4",
    "pag-5",
    "pag-6",
    "evaluacion",
    "creditos"
];

let currentIndex = 0;

const quizData = [
    {
        pregunta: "¿Qué es lo primero que le sale a una semilla al comenzar a germinar?",
        opciones: [
            "Una hoja verde",
            "Una flor colorida",
            "La raíz (radícula)",
            "Un fruto jugoso"
        ],
        correcta: 2
    },
    {
        pregunta: "¿Qué elemento absorbe principalmente la semilla para ablandar su cubierta y despertar?",
        opciones: [
            "Agua",
            "Lava",
            "Aceite",
            "Arena"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cómo se llama el proceso mediante el cual las hojas de la planta fabrican su propio alimento usando la luz solar?",
        opciones: [
            "Respiración celular",
            "Fotosíntesis",
            "Germinación",
            "Evaporación"
        ],
        correcta: 1
    },
    {
        pregunta: "¿En qué dirección crece normalmente la primera raíz de una semilla?",
        opciones: [
            "Hacia arriba buscando el cielo",
            "Hacia los lados horizontalmente",
            "En círculos",
            "Hacia abajo buscando la tierra y el agua"
        ],
        correcta: 3
    }
];

let currentQuestionIndex = 0;

function actualizarVista() {
    // Ocultar todas las páginas
    pages.forEach(id => {
        document.getElementById(id).classList.remove("active");
    });

    const paginaActualId = pages[currentIndex];
    document.getElementById(paginaActualId).classList.add("active");

    const navControls = document.getElementById("nav-controls");
    if (currentIndex === 0) {
        navControls.style.display = "none"; 
    } else {
        navControls.style.display = "flex";
        document.getElementById("btn-anterior").disabled = (currentIndex === 1);
        
        if (currentIndex === pages.length - 1) {
            document.getElementById("page-indicator").innerText = "Créditos Finales";
            document.getElementById("btn-siguiente").style.display = "none";
        } else if (currentIndex === pages.length - 2) {
            document.getElementById("page-indicator").innerText = "Evaluación";
            document.getElementById("btn-siguiente").style.display = "block";
        } else {
            document.getElementById("page-indicator").innerText = `Página ${currentIndex} de 6`;
            document.getElementById("btn-siguiente").style.display = "block";
        }
    }

    if (paginaActualId === "evaluacion") {
        cargarPregunta();
    }
}

function siguientePagina() {
    if (currentIndex < pages.length - 1) {
        currentIndex++;
        actualizarVista();
    }
}

function paginaAnterior() {
    if (currentIndex > 1) {
        currentIndex--;
        actualizarVista();
    }
}

function reiniciarLibro() {
    currentIndex = 0;
    currentQuestionIndex = 0;
    actualizarVista();
}

function cargarPregunta() {
    const quizBox = document.getElementById("quiz-box");
    const feedback = document.getElementById("quiz-feedback");
    feedback.innerText = "";
    feedback.className = "feedback";

    if (currentQuestionIndex >= quizData.length) {
        quizBox.innerHTML = `
            <div class="question-box" style="text-align: center;">
                <p>🎉 ¡Felicitaciones! Has superado la evaluación correctamente.</p>
                <p>Haz clic en "Siguiente" para ver los créditos.</p>
            </div>
        `;
        document.getElementById("btn-siguiente").disabled = false;
        return;
    }

    document.getElementById("btn-siguiente").disabled = true;

    const q = quizData[currentQuestionIndex];
    let html = `
        <div class="question-box">
            <p>Pregunta ${currentQuestionIndex + 1} de ${quizData.length}: ${q.pregunta}</p>
            <div class="options-grid">
    `;

    q.opciones.forEach((opcion, index) => {
        html += `<button class="option-btn" onclick="verificarRespuesta(${index})">${opcion}</button>`;
    });

    html += `</div></div>`;
    quizBox.innerHTML = html;
}

function verificarRespuesta(indexSeleccionado) {
    const q = quizData[currentQuestionIndex];
    const feedback = document.getElementById("quiz-feedback");

    if (indexSeleccionado === q.correcta) {
        feedback.innerText = "¡Correcto! Muy bien hecho. Puedes continuar.";
        feedback.className = "feedback correct";
        
        const botones = document.querySelectorAll(".option-btn");
        botones.forEach(b => b.disabled = true);

        currentQuestionIndex++;
        
        setTimeout(() => {
            if (currentQuestionIndex < quizData.length) {
                cargarPregunta();
            } else {
                cargarPregunta(); // 
            }
        }, 1200);

    } else {
        feedback.innerText = "Incorrecto. Inténtalo de nuevo para poder avanzar.";
        feedback.className = "feedback incorrect";
    }
}

window.onload = () => {
    actualizarVista();
};