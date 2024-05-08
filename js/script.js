/* let instrucciones = alert("intrucciones\nEl juego consiste en adivinar un numero aleatorio, contando solo con la pista de los aciertos, es decir si el numero es 155 y escribis 160 tendrias 1 acierto ya que el 1 esta en la pocision correcta, caso contrario si pones 610 ya que no tendrias ningun acierto, utiliza esto a tu favor para descubrir cual es el numero magico.\nHaga click en aceptar para comenzar")
*/
let dificultad = prompt("elija la dificultad\nFacil: Numero de 3 cifras mas historial con \nDificil: Numero de 4 cifras mas historial\nExperto: Numero de 4 cifras sin historial")
/* while (dificultad !== "facil" && dificultad !== "dificil" && dificultad !== "experto") {
    dificultad = prompt("por favor, escriba una dificultad valida\nFacil\nDificil\nExperto")
} */

let numeroAleatorio = []
if (dificultad == "facil") {
    for (let i = 0; i < 3; i++) {
        numeroAleatorio.push(Math.floor(Math.random() * 10));
    }
}
else {
    for (let i = 0; i < 4; i++) {
        numeroAleatorio.push(Math.floor(Math.random() * 10));
    }
}

let resultadoAnalizar = []
let historial = []
let resultado = 0
let aciertos = 0
let maxIntentos = 20
let intentos = 0

while (intentos < maxIntentos && aciertos < numeroAleatorio.length && resultado != "me rindo") {
    resultado = prompt("Escriba un numero de " + numeroAleatorio.length + " cifras" + "\nHISTORIAL: " + historial.join(' - ') + "\nIntentos disponibles: " + (maxIntentos - intentos) + "\n Aciertos: " + aciertos);
    resultadoAnalizar = []
    resultadoAnalizar.push(...resultado);
    historial.push(resultado);
    intentos++

    aciertos = 0
    for (let i = 0; i < numeroAleatorio.length; i++) {
        if (numeroAleatorio[i] == resultadoAnalizar[i]) {
            aciertos++
        }
    }
}

if (aciertos == numeroAleatorio.length) {
    alert("¡Felicidades, ganaste! Descubriste el número " + numeroAleatorio.join(""));
}
if (resultado == "me rindo") {
    alert("Nos entristese que te rindas. El número era " + numeroAleatorio.join("") + ". Espero verte pronto intentandolo de nuevo");
}
else {
    alert("Lo siento, has agotado tus intentos. El número era " + numeroAleatorio.join(""));
}

console.log(numeroAleatorio)
console.log(resultadoAnalizar)
console.log(historial)
console.log("aciertos " + aciertos)
console.log("intentos " + intentos)
console.log("numero ingresado " + resultado)
console.log("maximos intentos " + maxIntentos)
console.log("numero objetivo " + numeroAleatorio.join(""))