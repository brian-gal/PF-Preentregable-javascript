let dificultad;
let resultadoAnalizar = []
let historial = []
let numeroAleatorio = []
let resultado = 0
let aciertos = 0
let maxIntentos = 20
let intentos = 0
let desde;
let hasta;

function estableceDificultad() {
    while (true) {
        dificultad = parseInt(prompt("ELIJA LA DIFICULTAD:\n\n2 = Facil: del 10 al 99\n3 = Medio: del 100 al 9993\n4 = Dificil: del 1000 al 9999"));

        if (dificultad === 2 || dificultad === 3 || dificultad === 4) {
            break;
        } else {
            alert("Por favor, ingrese un valor válido (2, 3 o 4).");
        }
    }

    switch (dificultad) {
        case 2:
            desde = 10
            hasta = 99
            break;
        case 3:
            desde = 100
            hasta = 999
            break;
        case 4:
            desde = 1000
            hasta = 9999
            maxIntentos = 30
            break;
        default:
            break;
    }
}

function creandoAleatorio() {
    for (let i = 0; i < dificultad; i++) {
        numeroAleatorio.push(Math.floor(Math.random() * 10));
    }
    if (numeroAleatorio[0] == 0) {
        numeroAleatorio[0] = Math.floor(Math.random() * (9 - 1) + 1);
    }
}

function Analisis() {
    while (intentos < maxIntentos && aciertos < numeroAleatorio.length && resultado != "ME RINDO") {

        while (true) {
            resultado = prompt("ESCRIBA UN NUMERO DEL " + desde + " al " + hasta + "\n\nHistorial: " + historial.join(' - ') + "\nIntentos disponibles: " + (maxIntentos - intentos) + "\nAciertos: " + aciertos + "\nPara rendirse escribi ME RINDO");
            if ((resultado >= desde && resultado <= hasta) || resultado == "ME RINDO") {
                break;
            } else {
                alert("Por favor, ingrese un número válido de " + desde + " al " + hasta + ".");
            }
        }

        resultadoAnalizar = [] // restablece a sin valor el array en cada vuelta
        resultadoAnalizar.push(...resultado);
        historial.push(resultado);
        intentos++

        aciertos = 0  // restablece a 0 en cada vuelta
        for (let i = 0; i < numeroAleatorio.length; i++) {
            if (numeroAleatorio[i] == resultadoAnalizar[i]) {
                aciertos++
            }
        }
    }
}

function ganador() {
    if (aciertos == numeroAleatorio.length) {
        alert("¡Felicidades GANASTE! Descubriste el número " + numeroAleatorio.join("") + " con " + intentos + " intentos.");
    }
    else if (resultado == "ME RINDO") {
        alert("Me entristese que te des por vencido. El número era " + numeroAleatorio.join("") + ". Espero verte pronto, tal vez haya mas suerte la proxima.");
    }
    else {
        alert("GAME OVER\nTe has quedado sin intentos. El número era " + numeroAleatorio.join("") + ". Espero verte pronto, tal vez haya mas suerte la proxima.");
    }
}

estableceDificultad()
creandoAleatorio()
Analisis()
ganador()


