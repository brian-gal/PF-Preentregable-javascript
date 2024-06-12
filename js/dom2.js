// Variables para almacenar referencias a elementos del DOM
const pantalla1 = document.getElementById('pantalla1');
const pantalla2 = document.getElementById('pantalla2');
const pantalla3 = document.getElementById('pantalla3');
const pantalla4 = document.getElementById('pantalla4');
const pantalla5 = document.getElementById('pantalla5');
const pantalla6 = document.getElementById('pantalla6');
const pantalla7 = document.getElementById('pantalla7');
const pantallaUnJugador = document.getElementById('unJugador');
const pantallaDosJugadores = document.getElementById('dosJugadores');
const pantallaFinal = document.getElementById('pantallaFinal');


// Variables para botones
const buttonPlay = document.getElementById('buttonPlay');
const buttonCantidadJugadores = document.querySelectorAll('#pantalla2 button');
const buttonDificultad = document.querySelectorAll('#pantalla3 button');
const buttonPersonalizado = document.getElementById('buttonPersonalizado');
const buttonResultado = document.getElementById('submitResultado');
const buttonInstrucciones = document.getElementById('buttonInstrucciones');
const buttonRendirse = document.getElementById('buttonRendirse');
const buttonConteo = document.getElementById('buttonConteo');
const buttonUnJugador = document.getElementById('buttonUnJugador');
const buttonDosJugadores = document.getElementById('buttonDosJugadores');
const buttonBorrarTodo = document.getElementById('borrarTodo');

//variables para imputs
const inputCifras = document.getElementById('cifras')
const inputMaxIntentos = document.getElementById('maxIntentos')
const jugador = document.getElementById('jugador')
const jugador1 = document.getElementById('jugador1')
const jugador2 = document.getElementById('jugador2')
const inputResultado = document.getElementById('resultado');

// Variables para mostrar información en el html DOM
const gameTitulo = document.getElementById('game-titulo');
const gameHistorial = document.getElementById('game-historial');
const gameIntentos = document.getElementById('game-Intentos');
const gameAciertos = document.getElementById('game-Aciertos');
const historialGanadas = document.getElementById('historialGanadas');
const historialPerdidas = document.getElementById('historialPerdidas');
const advertenciaResultado = document.getElementById('advertenciaResultado');
const advertenciaCifras = document.getElementById('advertenciaCifras');
const advertenciaMaxIntentos = document.getElementById('advertenciaMaxIntentos');
const advertenciaJugador = document.getElementById('advertenciaJugador');
const advertenciaJugador1 = document.getElementById('advertenciaJugador1');
const advertenciaJugador2 = document.getElementById('advertenciaJugador2');

const img = document.getElementById('gifImg');
const miAudio = document.getElementById('miAudio');
const miAudioFondo = document.getElementById('miAudioFondo');
let sonidoActivado = true;

buttonPlay.addEventListener("click", function () {
    resetearJugadores()
    cambiarVisibilidad(pantalla2, pantalla1)
    detenerAudio(miAudio)
    reproducirAudioFondo("./assets/musicaFondo.m4a")
});

buttonCantidadJugadores.forEach((button, i) => {
    button.addEventListener("click", function () {
        cantidadJugadores = i + 1;
        if (cantidadJugadores == 1) {
            cambiarVisibilidad(pantallaUnJugador, pantallaDosJugadores)
            jugador.focus();
        } else {
            cambiarVisibilidad(pantallaDosJugadores, pantallaUnJugador)
            jugador1.focus();
        }
    });
});

buttonUnJugador.addEventListener('click', function () {
    if (jugador.value.length < 9 & jugador.value.length > 2) {
        player1.name = jugador.value
        cambiarVisibilidad(pantalla3, pantalla2)
    } else {
        advertenciaJugador.textContent = jugador.value.length < 9 & jugador.value.length > 2 ? jugador.focus() : 'Por favor, escriba un nombre que contenga entre 3 y 8 caracteres';
    }
});

buttonDosJugadores.addEventListener('click', function () {
    if (jugador1.value.length < 9 & jugador1.value.length > 2 && jugador2.value.length < 9 && jugador2.value.length > 2 && jugador1.value != jugador2.value) {
        player1.name = jugador1.value
        player2.name = jugador2.value
        cambiarVisibilidad(pantalla3, pantalla2)
    } else {
        advertenciaJugador1.textContent = jugador1.value.length < 9 & jugador1.value.length > 2 ? null : 'Por favor, escriba un nombre que contenga entre 3 y 8 caracteres';
        if (jugador2.value.length < 9 && jugador2.value.length > 2) {
            if (jugador1.value !== jugador2.value) {
                advertenciaJugador2.textContent = null;
            } else {
                advertenciaJugador2.textContent = 'Ambos nombres no pueden ser idénticos, por favor cambie uno';
            }
        } else {
            advertenciaJugador2.textContent = 'Por favor, escriba un nombre que contenga entre 3 y 8 caracteres';
        }

    }
});

buttonDificultad.forEach((button, i) => {
    button.addEventListener("click", function () {
        cifras = i + 2;
        if (cifras != 5) {
            cambiarVisibilidad(pantalla5, pantalla3)
            cambiarVisibilidadbutton(buttonConteo)
            cantidadJugadores == 1 ? creandoNumeroAdivinar() : null;
            actualizarDesdeHasta()
            actualizarTexto(player1, player2)
            inputResultado.focus();
        } else {
            cambiarVisibilidad(pantalla4, pantalla3)
        }
    });
});

buttonPersonalizado.addEventListener("click", function () {
    cifras = parseInt(document.getElementById('cifras').value, 10);
    player1.maxIntentos = parseInt(document.getElementById('maxIntentos').value, 10);
    player2.maxIntentos = parseInt(document.getElementById('maxIntentos').value, 10);

    if (cifras >= 1 && cifras <= 6 && player1.maxIntentos >= 1) {       // Si las entradas son válidas, actualiza los rangos y comienza el juego 

        cantidadJugadores == 1 ? creandoNumeroAdivinar() : null;
        actualizarDesdeHasta()
        actualizarTexto(player1, player2)
        cambiarVisibilidad(pantalla5, pantalla4)
        inputResultado.focus();
        cambiarVisibilidadbutton(buttonConteo)
    } else {
        // Valida las entradas personalizadas del usuario
        advertenciaCifras.textContent = cifras < 1 || cifras > 6 || (isNaN(cifras)) ? 'Por favor, escriba un numero entre 1 y 6' : inputMaxIntentos.focus();
        advertenciaMaxIntentos.textContent = maxIntentos < 1 || (isNaN(maxIntentos)) ? 'Por favor, escriba un numero mayor a 1' : inputCifras.focus();
    }
});

buttonResultado.addEventListener("click", manejarResultado);

inputResultado.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') manejarResultado();
});

buttonInstrucciones.addEventListener("click", function () {
    toggleInstrucciones(buttonInstrucciones, pantalla6);
    console.log(turnoJugador)
});

buttonRendirse.addEventListener("click", function () {
    if (turnoJugador == 1) {
        rendirse(player1)
    } else {
        rendirse(player2)
    }
});

buttonConteo.addEventListener("click", function () {
    mostrarHistorialJugadores();
    toggleInstrucciones(buttonConteo, pantalla7)
});

buttonBorrarTodo.addEventListener("click", function () {
    localStorage.clear();
    mostrarHistorialJugadores();
});

document.getElementById("buttonSilenciar").addEventListener("click", alternarSonido);

// Funcion que muestra y oculta elementos del html agregando y sacando la class
function cambiarVisibilidad(mostrar, ocultar) {
    ocultar.classList.add('ocultar');
    mostrar.classList.remove('ocultar');
    ocultainstrucciones(pantalla6)
    ocultainstrucciones(pantalla7)
}

// Función que alterna las clases del botón e instrucciones
function toggleInstrucciones(button, pantalla) {
    if (pantalla.classList.contains('ocultar')) {
        pantalla.classList.remove('ocultar');
        button.classList.add('active');
        button.classList.remove('inactive');
    } else {
        ocultainstrucciones(pantalla)
    }
}

function ocultainstrucciones(pantalla) {
    pantalla.classList.add('ocultar');
}

function cambiarVisibilidadbutton(button) {
    if (button.classList.contains('ocultar')) {
        button.classList.remove('ocultar');
    } else {
        button.classList.add('ocultar');
    }
}

function actualizarTexto(turno, contrario) {
    if (cantidadJugadores == 1) {
        gameTitulo.textContent = `Escribi un número entre ${desde} y ${hasta}`;
        gameHistorial.textContent = turno.historial.length ? `Historial: ${turno.historial.join(', ')}` : 'El historial se encuentra vacio';
        gameIntentos.textContent = `Intentos Disponibles: ${turno.maxIntentos - turno.intentos}`;
        gameAciertos.textContent = turno.aciertos ? `Pista: ${turno.aciertos} ${turno.aciertos > 1 ? 'cifras estan' : 'cifra esta'} en su posicion y ${turno.numeroAdivinar.length - turno.aciertos} ${turno.numeroAdivinar.length - turno.aciertos > 1 ? 'estan' : 'esta'} mal` : 'Pista: Ninguna cifra esta en su posicion correcta';
    } else if (contrario.numeroAdivinar.length == 0 && cantidadJugadores == 2) {
        gameTitulo.textContent = `Turno de ${turno.name}`;
        gameHistorial.textContent = `Escribi un número entre ${desde} y ${hasta} sin que nadie te vea`;
        gameIntentos.textContent = `${turno.name} escribi el numero que va a tener que adivinar ${contrario.name}`;
        gameAciertos.textContent = `Cuando termines, toca el boton confirmar`;
    } else {
        inputResultado.placeholder = `Ingresa un número entre ${desde} y ${hasta} para adivinar el número de tu oponente`;
        gameTitulo.textContent = `Turno de ${turno.name}`;
        gameHistorial.textContent = turno.historial.length ? `Historial: ${turno.historial.join(', ')}` : 'El historial se encuentra vacio';
        gameIntentos.textContent = `Intentos Disponibles: ${turno.maxIntentos - turno.intentos}`;
        gameAciertos.textContent = turno.aciertos ? `Pista: ${turno.aciertos} ${turno.aciertos > 1 ? 'cifras estan' : 'cifra esta'} en su posicion y ${turno.numeroAdivinar.length - turno.aciertos} ${turno.numeroAdivinar.length - turno.aciertos > 1 ? 'estan' : 'esta'} mal` : 'Pista: Ninguna cifra esta en su posicion correcta';
    }

}
// leo adivina el 35
//brian adivina el 11
// Función para obtener todos los registros de jugadores desde localStorage
function obtenerHistorialJugadores() {
    let historial = {};
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave.includes('_ganadas') || clave.includes('_perdidas') || clave.includes('_rendidas')) {
            let [nombre, tipo] = clave.split('_');
            if (!historial[nombre]) {
                historial[nombre] = { ganadas: 0, perdidas: 0, rendidas: 0 };
            }
            historial[nombre][tipo] = parseInt(localStorage.getItem(clave));
        }
    }
    return historial;
}

function mostrarHistorialJugadores() {
    let historial = obtenerHistorialJugadores();
    let contenedorHistorial = document.getElementById('contenedorHistorial');

    contenedorHistorial.innerHTML = ''; // Limpiar contenido previo

    if (Object.keys(historial).length === 0) {
        contenedorHistorial.innerHTML = `
            <div class="historial-item">
                <p><strong>El historial está vacío.</strong></p>
            </div>`;
    } else {
        for (let nombre in historial) {
            let jugadorHistorial = historial[nombre];
            let claveGanadas = jugadorHistorial.ganadas === 1 ? "vez" : "veces";
            let clavePerdidas = jugadorHistorial.perdidas === 1 ? "vez" : "veces";
            let claveRendidas = jugadorHistorial.rendidas === 1 ? "vez" : "veces";

            let textoHistorial = `<div class="historial-item"><p><strong>${nombre}</strong>:</p>`;

            if (jugadorHistorial.ganadas > 0) {
                textoHistorial += `<p>Has ganado un total de ${jugadorHistorial.ganadas} ${claveGanadas}.</p>`;
            }
            if (jugadorHistorial.perdidas > 0) {
                textoHistorial += `<p>Has perdido un total de ${jugadorHistorial.perdidas} ${clavePerdidas}.</p>`;
            }
            if (jugadorHistorial.rendidas > 0) {
                textoHistorial += `<p>Te has rendido un total de ${jugadorHistorial.rendidas} ${claveRendidas}.</p>`;
            }

            // Agregar botón de borrar
            textoHistorial += `<button class="boton-borrar" onclick="borrarHistorial('${nombre}')">Borrar Historial</button>`;

            textoHistorial += '</div>';

            contenedorHistorial.innerHTML += textoHistorial;
        }
    }
}

// Función para borrar todo el historial de un jugador
function borrarHistorial(nombre) {
    localStorage.removeItem(`${nombre}_ganadas`);
    localStorage.removeItem(`${nombre}_perdidas`);
    localStorage.removeItem(`${nombre}_rendidas`);
    mostrarHistorialJugadores(); // Actualizar el historial en el DOM después de borrar
}


// Función para mostrar un mensaje final en el DOM al finalizar el juego
function mostrarMensajeFinal(mensaje, mensaje2, audioSrc, imgSrc) {
    pantallaFinal.innerHTML = `<h2>${mensaje2}</h2><h3>${mensaje}</h3>`;
    cambiarVisibilidad(pantalla1, pantalla5);
    detenerAudio(miAudioFondo)
    buttonPlay.textContent = 'Jugar de nuevo';
    reproducirAudio(audioSrc);
    img.src = imgSrc;
    cambiarVisibilidadbutton(buttonRendirse)
    cambiarVisibilidadbutton(buttonConteo)
}

function actualizarDesdeHasta() {
    desde = Math.pow(10, cifras - 1);
    hasta = Math.pow(10, cifras) - 1;
}