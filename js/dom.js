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
}

const pantalla1 = document.getElementById('pantalla1');
const pantalla2 = document.getElementById('pantalla2');
const pantalla3 = document.getElementById('pantalla3');
const pantalla4 = document.getElementById('pantalla4');
const pantalla5 = document.getElementById('pantalla5');
const pantalla6 = document.getElementById('pantalla6');
const pantallaFinal = document.getElementById('pantallaFinal');
const advertenciaResultado = document.getElementById('advertenciaResultado');
const advertenciaCifras = document.getElementById('advertenciaCifras');
const advertenciaMaxIntentos = document.getElementById('advertenciaMaxIntentos');

const buttonPlay = document.getElementById('buttonPlay');
buttonPlay.addEventListener('click', iniciarJuego);

const buttonDificultad = document.querySelectorAll('#pantalla2 button');
buttonDificultad.forEach((button, i) => {
    button.addEventListener('click', () => {
        cifras = i + 2;
        if (cifras === 5) {
            cambiarVisibilidad(pantalla3, pantalla2);
        } else {
            cambiarVisibilidad(pantalla4, pantalla2);
            buttonRendirse.classList.remove('ocultar');
            desde = Math.pow(10, cifras - 1);
            hasta = Math.pow(10, cifras) - 1;
            actualizarTexto(desde, hasta);
            creandoAleatorio();
            document.getElementById('resultado').focus();
        }
        ocultarInstrucciones(buttonInstrucciones, pantalla5);
        ocultarInstrucciones(buttonConteo, pantalla6);
        buttonConteo.classList.add('ocultar');
    });
});

const buttonPersonalizado = document.getElementById('buttonPersonalizado');
buttonPersonalizado.addEventListener('click', () => {
    cifras = parseInt(document.getElementById('cifras').value, 10);
    maxIntentos = parseInt(document.getElementById('maxIntentos').value, 10);

    advertenciaCifras.textContent = cifras < 1 || cifras > 6 ? 'Por favor, escriba un numero entre 1 y 6' : '';
    advertenciaMaxIntentos.textContent = maxIntentos < 1 ? 'Por favor, escriba un numero mayor a 1' : '';

    if (cifras >= 1 && cifras <= 6 && maxIntentos >= 1) {
        desde = Math.pow(10, cifras - 1);
        hasta = Math.pow(10, cifras) - 1;
        actualizarTexto(desde, hasta);
        creandoAleatorio();
        cambiarVisibilidad(pantalla4, pantalla3);
        document.getElementById('resultado').focus();
        buttonRendirse.classList.remove('ocultar');
    }
    ocultarInstrucciones(buttonInstrucciones, pantalla5);
});

const buttonInstrucciones = document.getElementById('buttonInstrucciones');
buttonInstrucciones.addEventListener('click', () => {
    toggleInstrucciones(buttonInstrucciones, pantalla5);
});

const buttonConteo = document.getElementById('buttonConteo');
buttonConteo.addEventListener('click', () => {
    toggleInstrucciones(buttonConteo, pantalla6);
});

const buttonResultado = document.getElementById('submitResultado');
const inputResultado = document.getElementById('resultado');

buttonResultado.addEventListener('click', procesarResultado);
inputResultado.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') procesarResultado();
});

const buttonRendirse = document.getElementById('buttonRendirse');
buttonRendirse.addEventListener('click', rendirse);

const img = document.getElementById('gifImg');
const miAudio = document.getElementById('miAudio');

const gameTitulo = document.getElementById('game-titulo');
const gameHistorial = document.getElementById('game-historial');
const gameIntentos = document.getElementById('game-Intentos');
const gameAciertos = document.getElementById('game-Aciertos');
const historialGanadas = document.getElementById('historialGanadas');
const historialPerdidas = document.getElementById('historialPerdidas');

function iniciarJuego() {
    detenerAudio();
    cambiarVisibilidad(pantalla2, pantalla1);
    ocultarInstrucciones(buttonInstrucciones, pantalla5);
    ocultarInstrucciones(buttonConteo, pantalla6);
    restableceVariables();
}

function procesarResultado() {
    resultado = inputResultado.value;
    if (resultado > hasta || resultado < desde) {
        advertenciaResultado.textContent = `Por favor, escriba un numero entre ${desde} y ${hasta}`;
    } else {
        analizarEntrada();
        actualizarTexto();
        verificarFinalJuego();
        advertenciaResultado.textContent = ``;
    }
    inputResultado.value = '';
}

function cambiarVisibilidad(mostrar, ocultar) {
    ocultar.classList.add('ocultar');
    mostrar.classList.remove('ocultar');
}

function ocultarInstrucciones(button, pantalla) {
    if (button.classList.contains('active')) {
        toggleInstrucciones(button, pantalla);
    }
}

function toggleInstrucciones(button, pantalla) {
    button.classList.toggle('active');
    button.classList.toggle('inactive');
    pantalla.classList.toggle('ocultar');
}

function actualizarTexto() {
    gameTitulo.textContent = `Escriba un número entre ${desde} y ${hasta}`;
    gameHistorial.textContent = historial.length ? `Historial: ${historial.join(', ')}` : 'El historial se encuentra vacio';
    gameIntentos.textContent = `Intentos Disponibles: ${maxIntentos - intentos}`;
    gameAciertos.textContent = aciertos ? `Pista: ${aciertos} ${aciertos > 1 ? 'cifras estan' : 'cifra esta'} en su posicion y ${numeroAleatorio.length - aciertos} ${numeroAleatorio.length - aciertos > 1 ? 'estan' : 'esta'} mal` : 'Pista: Ninguna cifra esta en su posicion correcta';
}

function actualizarTextoHistorial() {
    let vecesGanadas = localStorage.getItem('vecesGanadas');
    let vecesPerdidas = localStorage.getItem('vecesPerdidas');
    let clave1;
    let clave2;

    clave1 = vecesGanadas == 1 ? "vez" : "veces";
    clave2 = vecesPerdidas == 1 ? "vez" : "veces";

    if (!vecesGanadas) {
        historialGanadas.textContent = `Aun no has ganado en ninguna oportunidad`;
    } else {
        historialGanadas.textContent = `Has ganado un total de ${vecesGanadas} ${clave1}`;
    }
    if (!vecesPerdidas) {
        historialGanadas.textContent = `Aun no has perdido en ninguna oportunidad`;
    } else {
        historialPerdidas.textContent = `Has perdido un total de ${vecesPerdidas} ${clave2}`;
    }
}

function creandoAleatorio() {
    while (numeroAleatorio.length < cifras) {
        const num = Math.floor(Math.random() * 10);
        if (numeroAleatorio.length === 0 && num === 0) continue;
        numeroAleatorio.push(num);
    }
}

function analizarEntrada() {
    resultadoAnalizar = resultado.split('').map(Number);
    historial.push(resultado);
    intentos++;

    aciertos = resultadoAnalizar.filter((num, i) => num === numeroAleatorio[i]).length;

    if (historial.length > 13) historial.shift();
}

function verificarFinalJuego() {
    if (aciertos === cifras) {
        actualizarConteo('vecesGanadas');
        mostrarMensajeFinal(`Descubriste el número ${numeroAleatorio.join('')}, con tan solo ${intentos} intentos.`, '¡Felicidades, has Ganado!', './assets/audioVideoGanador.m4a', './assets/videoGanador.gif');
    } else if (intentos >= maxIntentos) {
        actualizarConteo('vecesPerdidas');
        mostrarMensajeFinal(`Lo siento, has agotado tus intentos. El número era el ${numeroAleatorio.join('')}.`, 'GAME OVER', './assets/audioPerdedor.m4a', './assets/fotoPerdedor.jpg');
    }
}

function mostrarMensajeFinal(mensaje, mensaje2, audioSrc, imgSrc) {
    pantallaFinal.innerHTML = `<h2>${mensaje2}</h2><h3>${mensaje}</h3>`;
    cambiarVisibilidad(pantalla1, pantalla4);
    buttonRendirse.classList.add('ocultar');
    buttonConteo.classList.remove('ocultar');
    actualizarTextoHistorial()
    buttonPlay.textContent = 'Jugar de nuevo';
    reproducirAudio(audioSrc);
    img.src = imgSrc;
}

function rendirse() {
    mostrarMensajeFinal(`Que decepcion, el número era el ${numeroAleatorio.join('')}.`, 'TE HAS RENDIDO', './assets/audioPerdedor.m4a', './assets/rendirse.jpg');
    actualizarConteo('vecesPerdidas');
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

function actualizarConteo(nombre) {
    let conteo = localStorage.getItem(nombre);
    if (!conteo) {
        conteo = 0;
    }
    conteo++;
    localStorage.setItem(nombre, conteo);
}

actualizarTextoHistorial()