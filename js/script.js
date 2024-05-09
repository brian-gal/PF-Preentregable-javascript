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
let cifras;

function estableceDificultad() {
    while (true) {
        dificultad = parseInt(prompt("ELIJA LA DIFICULTAD:\n\n1 = Facil: del 10 al 99\n2 = Medio: del 100 al 999\n3 = Dificil: del 1000 al 9999\n4 = OTRO: Elegi de cuantas cifras sera el numero y la cantidad de intentos"));

        if (dificultad === 1 || dificultad === 2 || dificultad === 3 || dificultad === 4) {
            switch (dificultad) {
                case 1:
                    cifras = 2
                    desde = 10
                    hasta = 99
                    break;
                case 2:
                    cifras = 3
                    desde = 100
                    hasta = 999
                    break;
                case 3:
                    cifras = 4
                    desde = 1000
                    hasta = 9999
                    maxIntentos = 30
                    break;
                case 4:
                    do {
                        cifras = parseInt(prompt("¿De cuántas cifras quieres que sea el número?\n\nEl minimo es 1"));
                    } while (isNaN(cifras) || cifras < 1);
                    desde = Math.pow(10, cifras - 1);
                    hasta = Math.pow(10, cifras) - 1;
                    do {
                        maxIntentos = parseInt(prompt("¿Cuántos intentos queres tener?"));
                    } while (isNaN(maxIntentos) || maxIntentos < 1);
                    break;
            }
            break;
        } else {
            alert("Por favor, ingrese un valor válido (2, 3 o 4).");
        }
    }
}

function creandoAleatorio() {
    for (let i = 0; i < cifras; i++) {
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
        alert("No te des por vencido. El número era " + numeroAleatorio.join("") + ". Tal vez haya mas suerte la proxima.");
    }
    else {
        alert("GAME OVER\nTe has quedado sin intentos. El número era " + numeroAleatorio.join("") + ". Espero verte pronto, tal vez haya mas suerte la proxima.");
    }
}

function jugar() {
    let primeraVez = true;

    while (true) {
        let mensaje, mensaje2;

        if (primeraVez) {
            alert("En este juego, tu objetivo es adivinar un número aleatorio. Recibirás pistas sobre tus aciertos: números correctos en la posición correcta. Elige la dificultad y ¡comienza a adivinar! ¡Buena suerte!")
            mensaje = "¿QUERES COMENZAR A JUGAR?";
        } else {
            mensaje = "¿QUERES VOLVER A JUGAR?";
        }

        if (primeraVez) {
            mensaje2 = "Lamento que te vayas sin probarlo tal vez la próxima. Buena suerte";
        } else {
            mensaje2 = "Espero que haya disfrutado el juego.";
        }

        let jugarDeNuevo = parseInt(prompt(mensaje + "\n\n1 = SI\n2 = NO"));

        if (jugarDeNuevo === 1 || jugarDeNuevo === 2) {
            if (jugarDeNuevo === 1) {
                estableceDificultad();
                creandoAleatorio();
                Analisis();
                ganador();
            } else {
                alert(mensaje2);
                break;
            }
        } else {
            alert("Por favor, ingrese un valor válido (1 o 2).");
        }

        primeraVez = false;
    }
}

jugar();

