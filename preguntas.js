const preguntas = [
  {
    tema: "HTML",
    texto: "HTML se utiliza para organizar el contenido de una página web.",
    correcta: true,
    explicacion: "¡Correcto! HTML permite estructurar títulos, párrafos, imágenes, enlaces y otros elementos."
  },
  {
    tema: "CSS",
    texto: "CSS sirve para cambiar los colores, las letras y la apariencia de una página web.",
    correcta: true,
    explicacion: "¡Correcto! CSS controla el estilo visual y la presentación de los elementos."
  },
  {
    tema: "HTML",
    texto: "HTML significa “Hoja de Estilo Creativa”.",
    correcta: false,
    explicacion: "Incorrecto. HTML significa HyperText Markup Language, o lenguaje de marcado de hipertexto."
  },
  {
    tema: "CSS",
    texto: "CSS puede cambiar el color de fondo de una página web.",
    correcta: true,
    explicacion: "¡Correcto! La propiedad background-color permite definir el color de fondo."
  },
  {
    tema: "HTML",
    texto: "La etiqueta <h1> se utiliza normalmente para un título principal.",
    correcta: true,
    explicacion: "¡Correcto! <h1> representa un encabezado de nivel principal."
  },
  {
    tema: "CSS",
    texto: "CSS es el lenguaje que se usa principalmente para escribir los párrafos y el contenido de la página.",
    correcta: false,
    explicacion: "¡Bien! HTML organiza el contenido; CSS se ocupa principalmente de su apariencia."
  },
  {
    tema: "HTML",
    texto: "Con HTML se pueden agregar imágenes y enlaces a una página web.",
    correcta: true,
    explicacion: "¡Correcto! HTML incluye elementos como <img> para imágenes y <a> para enlaces."
  },
  {
    tema: "HTML + CSS",
    texto: "HTML y CSS pueden trabajar juntos en una misma página web.",
    correcta: true,
    explicacion: "¡Correcto! HTML estructura el contenido y CSS define su presentación."
  },
  {
    tema: "CSS",
    texto: "CSS permite modificar el tamaño de la letra y los márgenes de los elementos.",
    correcta: true,
    explicacion: "¡Correcto! CSS tiene propiedades para controlar la tipografía, el espacio y la distribución."
  },
  {
    tema: "HTML + CSS",
    texto: "Si una página usa HTML, ya no necesita CSS para tener colores y estilos personalizados.",
    correcta: false,
    explicacion: "¡Correcto! HTML puede mostrar contenido sin CSS, pero CSS facilita personalizar su diseño."
  }
];

let indice = 0;
let puntaje = 0;
let respondida = false;

const contador = document.getElementById("contador");
const puntajeTexto = document.getElementById("puntaje");
const barra = document.getElementById("barraProgreso");
const tema = document.getElementById("tema");
const pregunta = document.getElementById("pregunta");
const retro = document.getElementById("retroalimentacion");
const botones = document.querySelectorAll(".opcion");
const siguiente = document.getElementById("siguiente");
const zonaPregunta = document.getElementById("zonaPregunta");
const resultado = document.getElementById("resultado");

function mostrarPregunta() {
  respondida = false;
  const actual = preguntas[indice];
  contador.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
  puntajeTexto.textContent = `Puntaje: ${puntaje}`;
  barra.style.width = `${(indice / preguntas.length) * 100}%`;
  tema.textContent = actual.tema;
  pregunta.textContent = actual.texto;
  retro.textContent = "";
  retro.className = "retroalimentacion";
  siguiente.disabled = true;
  siguiente.textContent = indice === preguntas.length - 1 ? "Ver resultado →" : "Siguiente pregunta →";
  botones.forEach(boton => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });
}

function responder(valor, botonElegido) {
  if (respondida) return;
  respondida = true;

  const actual = preguntas[indice];
  const acierto = valor === actual.correcta;
  if (acierto) puntaje++;

  botones.forEach(boton => {
    boton.disabled = true;
    const valorBoton = boton.dataset.respuesta === "true";
    if (valorBoton === actual.correcta) boton.classList.add("correcta");
    else if (boton === botonElegido) boton.classList.add("incorrecta");
  });

  retro.textContent = `${acierto ? "¡Muy bien!" : "No es correcto."} ${actual.explicacion}`;
  retro.classList.add(acierto ? "bien" : "mal");
  puntajeTexto.textContent = `Puntaje: ${puntaje}`;
  barra.style.width = `${((indice + 1) / preguntas.length) * 100}%`;
  siguiente.disabled = false;
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    responder(boton.dataset.respuesta === "true", boton);
  });
});

siguiente.addEventListener("click", () => {
  if (!respondida) return;
  if (indice < preguntas.length - 1) {
    indice++;
    mostrarPregunta();
  } else {
    zonaPregunta.classList.add("oculto");
    resultado.classList.remove("oculto");
    document.getElementById("mensajeFinal").textContent = `Tu puntaje fue ${puntaje} de ${preguntas.length}.`;
    let mensaje;
    if (puntaje === 10) mensaje = "¡Excelente! Dominas los conceptos básicos de HTML y CSS.";
    else if (puntaje >= 7) mensaje = "¡Muy buen trabajo! Tienes una buena comprensión del tema.";
    else if (puntaje >= 5) mensaje = "¡Buen intento! Repasa las diferencias entre HTML y CSS y vuelve a probar.";
    else mensaje = "¡A seguir practicando! Revisa qué hace HTML y qué hace CSS e inténtalo otra vez.";
    document.getElementById("detalleFinal").textContent = mensaje;
    contador.textContent = "Actividad completada";
    barra.style.width = "100%";
  }
});

document.getElementById("reiniciar").addEventListener("click", () => {
  indice = 0;
  puntaje = 0;
  resultado.classList.add("oculto");
  zonaPregunta.classList.remove("oculto");
  mostrarPregunta();
});

mostrarPregunta();
