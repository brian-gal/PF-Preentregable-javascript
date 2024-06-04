// Variables globales
let resultadoAnalizar = [];
let numeroAleatorio = [];
let historial = [];
let resultado;
let aciertos = 0;
let maxIntentos = 20;
let intentos = 0;
let desde;
let hasta;
let cifras;;

// Función para restablecer todas las variables a sus valores iniciales
function restableceVariables() {
    resultadoAnalizar = [];
    numeroAleatorio = [];
    historial = [];
    resultado = undefined;
    aciertos = 0;
    maxIntentos = 20;
    intentos = 0;
    desde = undefined;
    hasta = undefined;
    cifras = undefined;
    // borra el valor de los imput de haber quedado algo escrito
    inputMaxIntentos.value = '';
    inputCifras.value = '';
    inputResultado.value = '';
}

function iniciarJuego() {
    detenerAudio();
    cambiarVisibilidad(pantalla2, pantalla1);
    ocultarInstrucciones(buttonInstrucciones, pantalla5);
    ocultarInstrucciones(buttonConteo, pantalla6);
    restableceVariables();
}

// Función para generar un número aleatorio de la longitud especificada por 'cifras'
function creandoAleatorio() {
    while (numeroAleatorio.length < cifras) {
        const num = Math.floor(Math.random() * 10);
        if (numeroAleatorio.length === 0 && num === 0) continue;
        numeroAleatorio.push(num);
    }
}

// Función para analizar la entrada del usuario y actualizar el historial
function analizarEntrada() {
    resultadoAnalizar = resultado.split('').map(Number);
    historial.push(resultado);
    intentos++;

    aciertos = resultadoAnalizar.filter((num, i) => num === numeroAleatorio[i]).length;

    if (historial.length > 13) historial.shift();
}

// Función para procesar el resultado ingresado por el usuario
function procesarResultado() {
    resultado = inputResultado.value;
    if (resultado > hasta || resultado < desde) {
        advertenciaResultado.textContent = `Por favor, escriba un numero entre ${desde} y ${hasta}`;
    } else if (historial.includes(resultado)) {
        advertenciaResultado.textContent = `Ese numero ya existe en el historial, por favor, escriba otro numero entre ${desde} y ${hasta}`;
    }
    else {
        analizarEntrada();
        actualizarTexto();
        verificarFinalJuego();
        advertenciaResultado.textContent = ``;
    }
    inputResultado.value = '';
    inputResultado.focus();
}

// Función para verificar si se ha ganado o perdido el juego
function verificarFinalJuego() {
    if (aciertos === cifras) {
        actualizarConteo('vecesGanadas');
        mostrarMensajeFinal(`Descubriste el número ${numeroAleatorio.join('')}, con tan solo ${intentos} intentos.`, '¡Felicidades, has Ganado!', './assets/audioVideoGanador.m4a', './assets/videoGanador.gif');
    } else if (intentos >= maxIntentos) {
        actualizarConteo('vecesPerdidas');
        mostrarMensajeFinal(`Lo siento, has agotado tus intentos. El número era el ${numeroAleatorio.join('')}.`, 'GAME OVER', './assets/audioPerdedor.m4a', './assets/fotoPerdedor.jpg');
    }
}

function rendirse() {
    actualizarConteo('vecesPerdidas');
    mostrarMensajeFinal(`Que decepcion, el número era el ${numeroAleatorio.join('')}.`, 'TE HAS RENDIDO', './assets/audioPerdedor.m4a', './assets/rendirse.jpg');
}

// Función para actualizar el conteo de partidas ganadas o perdidas en el almacenamiento local
function actualizarConteo(nombre) {
    let conteo = localStorage.getItem(nombre);
    if (!conteo) {
        conteo = 0;
    }
    conteo++;
    localStorage.setItem(nombre, conteo);
}

function reproducirAudio(src) {
    miAudio.volume = 0.5;
    miAudio.src = src;
    miAudio.play();
}

function detenerAudio() {
    miAudio.pause();
    miAudio.currentTime = 0;
    miAudio.src = '';
}

