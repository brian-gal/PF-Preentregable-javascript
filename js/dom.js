let resultadoAnalizar = []
let numeroAleatorio = []
let historial = []
let resultado;
let aciertos = 0
let maxIntentos = 20
let intentos = 0
let desde;
let hasta;
let cifras;

function restableceVariables() {
    resultadoAnalizar = []
    numeroAleatorio = []
    historial = []
    resultado;
    aciertos = 0
    maxIntentos = 20
    intentos = 0
    desde;
    hasta;
    cifras;
}

const pantalla1 = document.getElementById('pantalla1');
const pantalla2 = document.getElementById('pantalla2');
const pantalla3 = document.getElementById('pantalla3');
const pantalla4 = document.getElementById('pantalla4');
const pantalla5 = document.getElementById('pantalla5');
const pantallaFinal = document.getElementById('pantallaFinal');
const advertenciaResultado = document.getElementById('advertenciaResultado');
const advertenciaCifras = document.getElementById('advertenciaCifras');
const advertenciaMaxIntentos = document.getElementById('advertenciaMaxIntentos');

const buttonPlay = document.getElementById('buttonPlay');
buttonPlay.addEventListener('click', () => {
    detenerAudio(); // Detener el audio antes de mostrar el mensaje final
    cambiarVisibilidad(pantalla2, pantalla1);
    ocultarInstrucciones();
    restableceVariables();
});


const buttonDificultad = document.querySelectorAll('#pantalla2 button');
for (let i = 0; i < buttonDificultad.length; i++) {
    buttonDificultad[i].addEventListener('click', function () {
        cifras = i + 2; // Comienza en 1 para Fácil, 2 para Medio, etc.
        if (cifras === 5) {
            cambiarVisibilidad(pantalla3, pantalla2);
        } else {
            cambiarVisibilidad(pantalla4, pantalla2);
            buttonRendirse.classList.remove('ocultar');
            desde = Math.pow(10, cifras - 1); // en base a la cifra seleccionada crea el numero minimo que acepta 
            hasta = Math.pow(10, cifras) - 1; // en base a la cifra seleccionada crea el numero maximo que acepta 
            actualizarTexto(desde, hasta);
            creandoAleatorio()
            document.getElementById('resultado').focus();
        }
        ocultarInstrucciones()
    });
}

const buttonPersonalizado = document.getElementById('buttonPersonalizado');
buttonPersonalizado.addEventListener('click', () => {
    cifras = document.getElementById('cifras').value;
    maxIntentos = document.getElementById('maxIntentos').value;
    if (cifras < 1 || cifras > 6) {
        advertenciaCifras.textContent = `Por favor, escriba un numero entre 1 y 6`;
    } else {
        advertenciaCifras.textContent = ''; // Borra la advertencia si se cumple la condición
    }

    if (maxIntentos < 1) {
        advertenciaMaxIntentos.textContent = `Por favor, escriba un numero mayor a 1`;
    } else {
        advertenciaMaxIntentos.textContent = ''; // Borra la advertencia si se cumple la condición
    }

    if (cifras >= 1 && cifras <= 6 && maxIntentos >= 1) {
        desde = Math.pow(10, cifras - 1); // en base a la cifra seleccionada crea el numero minimo que acepta 
        hasta = Math.pow(10, cifras) - 1; // en base a la cifra seleccionada crea el numero maximo que acepta 
        actualizarTexto(desde, hasta);
        creandoAleatorio()
        cambiarVisibilidad(pantalla4, pantalla3);
        document.getElementById('resultado').focus();
        buttonRendirse.classList.remove('ocultar');
    }
    ocultarInstrucciones()
});

const buttonInstrucciones = document.getElementById('buttonInstrucciones');
buttonInstrucciones.addEventListener('click', () => {
    if (buttonInstrucciones.classList.contains('active')) {
        buttonInstrucciones.classList.remove('active');
        buttonInstrucciones.classList.add('inactive');
        pantalla5.classList.add('ocultar');
    } else {
        buttonInstrucciones.classList.remove('inactive');
        buttonInstrucciones.classList.add('active');
        pantalla5.classList.remove('ocultar');
    }
});

const buttonResultado = document.getElementById('submitResultado');
const inputResultado = document.getElementById('resultado');

// Función para manejar el evento click en el botón
buttonResultado.addEventListener('click', () => {
    procesarResultado();
    // En el lugar adecuado donde cambias la visibilidad de la pantalla para mostrar el campo de entrada
    document.getElementById('resultado').focus();

});

// Función para manejar el evento keypress en el input
inputResultado.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        procesarResultado();
    }
});

function procesarResultado() {
    resultado = inputResultado.value;
    if (resultado > hasta || resultado < desde) {
        advertenciaResultado.textContent = `Por favor, escriba un numero entre ${desde} y ${hasta}`;
        inputResultado.value = '';
    } else {
        entradaAnalisis()
        actualizarTexto()
        finalJuego()
        inputResultado.value = '';
        advertenciaResultado.textContent = ``;
    }
}


//logica
function cambiarVisibilidad(mostrar, ocultar) {
    ocultar.classList.add('ocultar');
    mostrar.classList.remove('ocultar');
}

function ocultarInstrucciones() {
    if (buttonInstrucciones.classList.contains('active')) {
        buttonInstrucciones.classList.remove('active');
        buttonInstrucciones.classList.add('inactive');
        pantalla5.classList.add('ocultar');
    }
}

//funcion nombres etiquetas
const gameTitulo = document.getElementById('game-titulo');
const gameHistorial = document.getElementById('game-historial');
const gameIntentos = document.getElementById('game-Intentos');
const gameAciertos = document.getElementById('game-Aciertos');
const pantallaGanador = document.getElementById("pantallaGanador");


function actualizarTexto() {
    gameTitulo.textContent = `Escriba un número entre ${desde} y ${hasta}`;
    gameHistorial.textContent = mensajeHistorial();
    gameIntentos.textContent = `Intentos Disponibles: ${maxIntentos - intentos}`;
    gameAciertos.textContent = mensajePista();
}

function mensajeHistorial() {
    if (historial[0] == undefined) {
        return "El historial Se encuentra vacio";
    }
    else {
        return `Historial: ${historial.join(', ')}`;
    }
}

function mensajePista() { //corregimos la palabra para que quede bien el texto envase a los aciertos
    let mensaje = " estan";
    let mensaje2 = " cifras estan";
    if (aciertos >= 1) {
        if ((numeroAleatorio.length - aciertos) == 1) {
            mensaje = " esta";
        }
        if (aciertos == 1) {
            mensaje2 = " cifra esta";
        }
        return `Pista: ` + aciertos + mensaje2 + " en su posicion y " + (numeroAleatorio.length - aciertos) + mensaje + " mal";
    }
    else if (historial[0] == undefined) {
        return "Sin pistas hasta que ingrese un numero";
    }
    else {
        return "Pista: Ninguna cifra esta en su posicion correcta";
    }
}

function creandoAleatorio() {       // Esta función genera un número aleatorio de cierta cantidad de cifras basado en la dificultad seleccionada
    for (let i = 0; i < cifras; i++) {
        numeroAleatorio.push(Math.floor(Math.random() * 10)); // crea un numero aleatorio del 0 al 9 y lo carga al array
    }
    if (numeroAleatorio[0] == 0) {      // esta condicion analiza si el primer elemento del array es 0 lo cambia por un numero aleatorio para que nunca queden valores como 010
        numeroAleatorio[0] = Math.floor(Math.random() * (9 - 1) + 1); //crea un numero aleatorio del 1 al 9
    }
}

function entradaAnalisis() {        // Esta función permite al jugador realizar cierta cantidad de intentos y recibir pistas sobre sus aciertos
    resultadoAnalizar = []; // restablesce el valor del array en cada vuelta
    resultadoAnalizar.push(...resultado);   //descompone el contenido de la variable en elementos individuales y agrega cada uno de esos elementos al array individualmente
    historial.push(resultado); // agrega al array el numero asi tal como lo puse
    intentos++  //suma un intento por cada vuelta

    aciertos = 0  // restablece a 0 en cada vuelta
    for (let i = 0; i < numeroAleatorio.length; i++) {      //este bucle junto con la condicion compara cada elemento del array y suma un acierto si son iguales
        if (numeroAleatorio[i] == resultadoAnalizar[i]) {
            aciertos++
        }
    }
    while (historial.length > 13) {  //hace que al llegar al elemento 13 en el array se borre el historial mas viejo
        historial.shift()
    }

}

function finalJuego() {
    if (aciertos == cifras) {
        mostrarMensajeFinal(`Descubriste el número ${numeroAleatorio.join('')}, con tan solo ${intentos} intentos."`, "¡Felicidades, has Ganado!");
        miAudio.src = './assets/audioVideoGanador.m4a';
        reproducirAudio()
        img.src = './assets/videoGanador.gif';

    } else if (intentos >= maxIntentos) {
        mostrarMensajeFinal(`Lo siento, has agotado tus intentos. El número era el ${numeroAleatorio.join('')}.`, "GAME OVER");
        miAudio.src = './assets/audioPerdedor.m4a';
        reproducirAudio()
        img.src = './assets/fotoPerdedor.jpg';
    
    } else {

    }
}

function mostrarMensajeFinal(mensaje, mensaje2) {
    pantallaFinal.innerHTML = `<h2>${mensaje2}</h2><h3>${mensaje}</h3>`;
    cambiarVisibilidad(pantalla1, pantalla4);
    buttonRendirse.classList.add('ocultar');
    buttonPlay.textContent = "Jugar de nuevo";
}

const buttonRendirse = document.getElementById('buttonRendirse');
buttonRendirse.addEventListener('click', () => {
    mostrarMensajeFinal(`Que decepcion, el número era el ${numeroAleatorio.join('')}.`, "TE HAS RENDIDO")
    img.src = './assets/rendirse.jpg';
});

const img = document.getElementById('gifImg');

const miAudio = document.getElementById('miAudio');

// Función para reproducir el audio
function reproducirAudio() {
    miAudio.volume = 0.5; // Establece el volumen al 50%
    miAudio.currentTime = 0; // Reinicia el audio al principio
    miAudio.play();

}
// Función para detener el audio
function detenerAudio() {
    miAudio.pause();
    miAudio.currentTime = 0; // Reinicia el audio al principio
    miAudio.src = '';
}