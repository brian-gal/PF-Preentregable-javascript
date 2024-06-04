// Variables para almacenar referencias a elementos del DOM
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

// Variables para botones y elementos de entrada
const buttonPlay = document.getElementById('buttonPlay');
const buttonDificultad = document.querySelectorAll('#pantalla2 button');
const buttonPersonalizado = document.getElementById('buttonPersonalizado');
const inputCifras = document.getElementById('cifras')
const inputMaxIntentos = document.getElementById('maxIntentos')
const buttonInstrucciones = document.getElementById('buttonInstrucciones');
const buttonConteo = document.getElementById('buttonConteo');
const buttonResultado = document.getElementById('submitResultado');
const inputResultado = document.getElementById('resultado');
const buttonRendirse = document.getElementById('buttonRendirse');
const img = document.getElementById('gifImg');
const miAudio = document.getElementById('miAudio');

// Variables para mostrar información del juego en el DOM
const gameTitulo = document.getElementById('game-titulo');
const gameHistorial = document.getElementById('game-historial');
const gameIntentos = document.getElementById('game-Intentos');
const gameAciertos = document.getElementById('game-Aciertos');
const historialGanadas = document.getElementById('historialGanadas');
const historialPerdidas = document.getElementById('historialPerdidas');


// Agregando event listeners a los botones
buttonPlay.addEventListener('click', iniciarJuego);

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

buttonPersonalizado.addEventListener('click', () => {
    cifras = parseInt(document.getElementById('cifras').value, 10);
    maxIntentos = parseInt(document.getElementById('maxIntentos').value, 10);

    // Valida las entradas personalizadas del usuario
    advertenciaCifras.textContent = cifras < 1 || cifras > 6 || (isNaN(cifras)) ? 'Por favor, escriba un numero entre 1 y 6' : inputMaxIntentos.focus();
    advertenciaMaxIntentos.textContent = maxIntentos < 1 || (isNaN(maxIntentos)) ? 'Por favor, escriba un numero mayor a 1' : inputCifras.focus();

    // Si las entradas son válidas, actualiza los rangos y comienza el juego
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

buttonInstrucciones.addEventListener('click', () => {
    toggleInstrucciones(buttonInstrucciones, pantalla5);
});

buttonConteo.addEventListener('click', () => {
    toggleInstrucciones(buttonConteo, pantalla6);
});



buttonResultado.addEventListener('click', procesarResultado);
inputResultado.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') procesarResultado();
});

buttonRendirse.addEventListener('click', rendirse);

// Función para actualizar la información del juego en el DOM
function actualizarTexto() {
    gameTitulo.textContent = `Escriba un número entre ${desde} y ${hasta}`;
    gameHistorial.textContent = historial.length ? `Historial: ${historial.join(', ')}` : 'El historial se encuentra vacio';
    gameIntentos.textContent = `Intentos Disponibles: ${maxIntentos - intentos}`;
    gameAciertos.textContent = aciertos ? `Pista: ${aciertos} ${aciertos > 1 ? 'cifras estan' : 'cifra esta'} en su posicion y ${numeroAleatorio.length - aciertos} ${numeroAleatorio.length - aciertos > 1 ? 'estan' : 'esta'} mal` : 'Pista: Ninguna cifra esta en su posicion correcta';
}

// Función para actualizar el historial de partidas ganadas y perdidas en el DO
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
        historialPerdidas.textContent = `Aun no has perdido en ninguna oportunidad`;
    } else {
        historialPerdidas.textContent = `Has perdido un total de ${vecesPerdidas} ${clave2}`;
    }
}

// Función para mostrar un mensaje final en el DOM al finalizar el juego
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

// Funcion que muestra y oculta elementos del html agregando y sacando la class
function cambiarVisibilidad(mostrar, ocultar) {
    ocultar.classList.add('ocultar');
    mostrar.classList.remove('ocultar');
}

// Funcion que cambia el elemento de instrucciones en el html agregando y sacando la class
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


// Ejecuta la funcion para actualizar el registro de partidas ganadas o perdidas apenas abris el juego
actualizarTextoHistorial()
