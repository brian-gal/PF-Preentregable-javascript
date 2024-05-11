let dificultad;
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
let primeraVez = true;

function estableceDificultad() {        // Esta función permite al usuario elegir la dificultad del juego
    while (true) {
        dificultad = prompt("ELIJA LA DIFICULTAD:\n\n1 = Facil\n2 = Medio\n3 = Dificil\n4 = Personalizado");
        if (dificultad == "1" || dificultad == "2" || dificultad == "3" || dificultad == "4" || dificultad == null) {
            switch (dificultad) {
                case "1":
                    cifras = 2;
                    desde = 10;
                    hasta = 99;
                    break;
                case "2":
                    cifras = 3;
                    desde = 100;
                    hasta = 999;
                    break;
                case "3":
                    cifras = 4;
                    desde = 1000;
                    hasta = 9999;
                    maxIntentos = 30;
                    break;
                case "4":
                    do {
                        cifras = parseInt(prompt("¿De cuántas cifras quieres que sea el número?\n\nEl minimo es 1 y el maximo 10"));
                        if (cifras < 1 || cifras > 10) {
                            alert("Introdusca un valor entre 1 y 10")
                        }
                    } while (isNaN(cifras) || cifras < 1 || cifras > 10);
                    desde = Math.pow(10, cifras - 1); // en base a la cifra seleccionada crea el minimo
                    hasta = Math.pow(10, cifras) - 1; // en base a la cifra seleccionada crea el maximo
                    do {
                        maxIntentos = parseInt(prompt("¿Cuántos intentos queres tener?"));
                    } while (isNaN(maxIntentos) || maxIntentos < 1);
                    break;
            }
            break;
        } else {
            alert("Por favor, ingrese un valor válido (1, 2, 3, 4).");
        }
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
    while (intentos < maxIntentos && aciertos < numeroAleatorio.length) {
        while (true) {
            resultado = prompt("ESCRIBA UN NUMERO DEL " + desde + " al " + hasta + "\n\nHistorial: " + historial.join(' - ') + "\nIntentos disponibles: " + (maxIntentos - intentos) + "\nAciertos: " + mensajePista() + "\n\nSi necesitas una explicacion detallada escribi 'AYUDA'");
            if ((resultado >= desde && resultado <= hasta) || resultado == null) {
                break;
            } else if (resultado.toLowerCase() == "ayuda") {
                alert("Ejemplo: Si el número secreto es 42 y eliges el número 27, no recibirás ninguna pista de aciertos, ya que ninguna de las cifras adivinadas es la correcta en la posición correcta. Por otro lado, si eliges el número 47, recibirás una pista que indica que tienes 1 acierto en la posición correcta, lo que significa que has adivinado correctamente la cifra 4 en la posición correcta. Sin embargo, no sabes cuál es la cifra correcta, pero sabes que del número que elegiste hay esa cantidad de aciertos. Usa las pistas a tu favor: Con la información de las pistas, puedes intentar deducir las cifras correctas en la posición correcta. Por ejemplo, si tienes un acierto en la posición correcta para el número 47, puedes intentar cambiar la cifra 7 por otra para ver si obtienes más aciertos. Continúa adivinando: Continúa eligiendo números y recibiendo pistas hasta que adivines todas las cifras en la posición correcta o te quedes sin intentos.")
            }
            else {
                alert("Por favor, ingrese un número válido de " + desde + " al " + hasta + ".");
            }
        }

        if (resultado == null) {    //esta condicion permite cancelar o rendirse antes de encontrar el numero aleatorio
            break;
        } else {
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
        }
    }
}

function mensajeFinal() {       // Estas funciónes simplemente asignan un mensaje en base a una condicion
    if (aciertos == numeroAleatorio.length) {
        return "¡Felicidades GANASTE! Descubriste el número " + numeroAleatorio.join("") + " con " + intentos + " intentos.";
    }
    else if (resultado == null) {
        return "No te des por vencido. El número era " + numeroAleatorio.join("") + ". Tal vez haya mas suerte la proxima.";
    }
    else {
        return "GAME OVER\nTe has quedado sin intentos. El número era " + numeroAleatorio.join("") + ". Espero verte pronto, tal vez haya mas suerte la proxima.";
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
        return aciertos + mensaje2 + " en su posicion y " + (numeroAleatorio.length - aciertos) + mensaje + " mal";
    }
    else if (historial[0] == undefined) {
        return "Escriba un numero para comenzar";
    }
    else {
        return "Ninguna cifra esta en su posicion correcta";
    }
}

function mensajeQueresJugar() {
    if (primeraVez) {
        return "¿QUERES COMENZAR A JUGAR?\n\nTu objetivo es adivinar un número secreto. Para hacerlo, deberás ingresar un número y utilizar las pistas que se te darán sobre tus aciertos. Cada cifra que adivines correctamente y esté en la posición correcta se contará como un acierto. Sin embargo, no sabrás cuál es la cifra a la cual le acertaste en cada intento, eso deberás descubrirlo por ti mismo. ¡Comienza a adivinar y disfruta del desafío!";
    } else {
        return mensajeFinal() + "\n\n¿QUERES VOLVER A JUGAR?";
    }
}

function mensajeAdios() {
    if (primeraVez) {
        return "Lamento que te vayas sin jugar, no sabes lo que te perdes";
    } else {
        return "Espero que hayas disfrutado el juego.";;
    }
}

function flujoJuego() {          // Esta función controla el flujo del juego, permitiendo al jugador jugar varias veces si lo desea
    while (true) {
        let jugarDeNuevo = confirm(mensajeQueresJugar());
        if (jugarDeNuevo == true) {
            estableceDificultad();
            if (dificultad == null) {   // esta condicion analiza si el juego se cancelo antes de elegir una dificultad y detiene el juego
                alert(mensajeAdios());
                break;
            } else {
                aciertos = 0;            // restablesco el valor
                intentos = 0;            // restablesco el valor
                numeroAleatorio = [];    // restablesco el valor 
                historial = [];          // restablesco el valor
                creandoAleatorio();
                entradaAnalisis();
                primeraVez = false;     //actualiza el valor de la variable para saber que ya se jugo al juego al menos 1 vez y cambiar el mensaje
            }
        } else {
            alert(mensajeAdios());
            break;
        }
    }
}

flujoJuego();        // Inicia el juego

