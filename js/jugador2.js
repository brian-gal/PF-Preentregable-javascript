let cantidadJugadores;
let botonRendirseActivado = false
let turnoJugador = 1
let desde;
let hasta;
let cifras;

const player1 = {
    name: null,
    resultadoAnalizar: [],
    numeroAdivinar: [],
    historial: [],
    resultado: null,
    aciertos: 0,
    maxIntentos: 20,
    intentos: 0,
}
const player2 = {
    name: null,
    resultadoAnalizar: [],
    numeroAdivinar: [],
    historial: [],
    resultado: null,
    aciertos: 0,
    maxIntentos: 20,
    intentos: 0,
}

function resetearJugadores() {
    player1.name = null;
    player1.resultadoAnalizar = [];
    player1.numeroAdivinar = [];
    player1.historial = [];
    player1.resultado = null;
    player1.aciertos = 0;
    player1.intentos = 0;

    player2.name = null;
    player2.resultadoAnalizar = [];
    player2.numeroAdivinar = [];
    player2.historial = [];
    player2.resultado = null;
    player2.aciertos = 0;
    player2.intentos = 0;

    turnoJugador = 1

    // borra el valor de los imput de haber quedado algo escrito
    inputMaxIntentos.value = '';
    inputCifras.value = '';
    inputResultado.value = '';
}


// Función para generar un número aleatorio de la longitud especificada por 'cifras'
function creandoNumeroAdivinar() {
    while (player1.numeroAdivinar.length < cifras) {
        const num = Math.floor(Math.random() * 10);
        if (player1.numeroAdivinar.length === 0 && num === 0) continue;
        player1.numeroAdivinar.push(num);
    }
}

function manejarResultado() {
    if (cantidadJugadores == 1) {
        procesarResultado(player1, player2)
    } else {
        if (turnoJugador == 1) {
            procesarResultado(player1, player2)
        } else {
            procesarResultado(player2, player1)
        }
    }
    if (player1.historial.length == 2) {
        cambiarVisibilidadbutton(buttonRendirse)
        botonRendirseActivado = true
    } else {
        null
    }
}

// Función para procesar el resultado ingresado por el usuario
function procesarResultado(turno, contrario) {

    turno.resultado = inputResultado.value;

    if (turno.resultado > hasta || turno.resultado < desde) {
        advertenciaResultado.textContent = `Por favor, escriba un numero entre ${desde} y ${hasta}`;
    } else if (turno.historial.includes(turno.resultado)) {
        advertenciaResultado.textContent = `Ese numero ya existe en el historial, por favor, escriba otro numero entre ${desde} y ${hasta}`;
    } else if (contrario.numeroAdivinar.length == 0 && cantidadJugadores == 2) {
        contrario.numeroAdivinar = Array.from(turno.resultado).map(Number);
        actualizarTexto(contrario, turno)
        turnoJugador == 2 ? turnoJugador = 1 : turnoJugador = 2;
        advertenciaResultado.textContent = ``;
    }
    else {
        analizarEntrada(turno);
        verificarFinalJuego(turno);
        advertenciaResultado.textContent = ``;
        inputResultado.value = '';
        if (turnoJugador == 1 && cantidadJugadores == 2) {
            actualizarTexto(player2, player1)
            turnoJugador = 2
        } else {

            actualizarTexto(player1, player2)
            turnoJugador = 1
        }
    }
    inputResultado.focus();
}

// Función para analizar la entrada del usuario y actualizar el historial
function analizarEntrada(turno) {
    turno.resultadoAnalizar = turno.resultado.split('').map(Number);
    turno.historial.push(turno.resultado);
    turno.intentos++;
    turno.aciertos = turno.resultadoAnalizar.filter((num, i) => num === turno.numeroAdivinar[i]).length;
    turno.historial.length > 13 ? turno.historial.shift() : null;
}

// Función para verificar si se ha ganado o perdido el juego
function verificarFinalJuego(turno) {
    if (turno.aciertos === cifras) {
        mostrarMensajeFinal(`Descubriste el número ${turno.numeroAdivinar.join('')}, con tan solo ${turno.intentos} intentos.`, `¡Felicidades, has Ganado ${turno.name}!`, './assets/audioVideoGanador.m4a', './assets/videoGanador.gif');
        actualizarConteo(turno.name, 'ganadas');
    } else if (turno.intentos >= turno.maxIntentos) {
        mostrarMensajeFinal(`Lo siento, has agotado tus intentos ${turno.name}. El número era el ${turno.numeroAdivinar.join('')}.`, `GAME OVER`, './assets/audioPerdedor.m4a', './assets/fotoPerdedor.jpg');
        actualizarConteo(turno.name, 'perdidas');
    }
}

function rendirse(turno) {
    mostrarMensajeFinal(`Que decepcion, el número era el ${turno.numeroAdivinar.join('')}.`, `TE HAS RENDIDO ${turno.name}`, './assets/audioPerdedor.m4a', './assets/rendirse.jpg');
    actualizarConteo(turno.name, 'rendidas');
}

// Función para actualizar el conteo de partidas ganadas o perdidas en el almacenamiento local
function actualizarConteo(nombre, tipo) {
    let conteo = localStorage.getItem(`${nombre}_${tipo}`);
    if (!conteo) {
        conteo = 0;
    }
    conteo = parseInt(conteo) + 1;
    localStorage.setItem(`${nombre}_${tipo}`, conteo);
}

function reproducirAudio(src) {
    miAudio.src = src;
    miAudio.play();
}

function reproducirAudioFondo(src) {
    miAudioFondo.src = src;
    miAudioFondo.addEventListener('ended', function () {
        // Reinicia la reproducción cuando el audio termina
        miAudioFondo.currentTime = 0;
        miAudioFondo.play();
    });

    miAudioFondo.play();
}

function detenerAudio(id) {
    id.pause();
    id.currentTime = 0;
    id.src = '';
}

function alternarSonido() {
    if (sonidoActivado) {
        miAudio.volume = 0;
        miAudioFondo.volume = 0;
        document.getElementById("iconoVolumen").classList.remove("bi-volume-up");
        document.getElementById("iconoVolumen").classList.add("bi-volume-mute");
        sonidoActivado = false;
    } else {
        miAudio.volume = 0.4;
        miAudioFondo.volume = 0.2;
        document.getElementById("iconoVolumen").classList.remove("bi-volume-mute");
        document.getElementById("iconoVolumen").classList.add("bi-volume-up");
        sonidoActivado = true;
    }
}

