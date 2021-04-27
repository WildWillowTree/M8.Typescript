"use strict";
let cohet, cohet1, cohet2;
let aceleracion, deceleracion, potTotal, i, rockets = new Array(), contador1 = 0, contador2 = 0, imagen;
//////  CREAR  //////
function createRocket1(id, propulsors, potMaxProp) {
    cohet1 = new Cohet(id, propulsors, potMaxProp);
    createRocket(cohet1);
    document.getElementById("cohet1").style.visibility = "visible";
}
function createRocket2(id, propulsors, potencia) {
    if (rockets.length > 0) {
        cohet2 = new Cohet(id, propulsors, potencia);
        createRocket(cohet2);
        document.getElementById("cohet2").style.visibility = "visible";
    }
}
function createRocket(cohet) {
    document.getElementById("output").style.visibility = "visible";
    ;
    rockets.push(cohet);
    for (i = 0; i < rockets.length; i++) {
        let cohetInfo = document.getElementById("cohetInfo" + (i + 1));
        potTotal = (rockets[i].potMaxProp).reduce(potenciaMax);
        cohetInfo.innerHTML = `Cohet ${i + 1}:
        ID: ${rockets[i].id}
        Propulsors: ${rockets[i].numProp}
        Potencia: ${rockets[i].potMaxProp}
        Potencia Max: ${potTotal}`;
    }
    if (rockets.length > 0) {
        document.getElementById("rules").textContent = "Crea el cohete 2";
    }
    if (rockets.length > 1) {
        document.getElementById("rules").textContent = "Todos deben ganar";
        document.getElementById("rules").style.fontSize = "1.5em";
        document.getElementById("goal").style.visibility = "visible";
        ;
    }
}
function potenciaMax(total, value) {
    return total + value;
}
//////  ACELERAR  //////
function acelerar1() {
    let imagen1 = document.getElementById("cohet1");
    contador1++;
    acelerar(cohet1, contador1, imagen1);
}
function acelerar2() {
    let imagen2 = document.getElementById("cohet2");
    contador2++;
    acelerar(cohet2, contador2, imagen2);
}
function acelerar(cohet, contador, imagen) {
    cohet.acelerar(cohet);
    for (i = 0; i < rockets.length; i++) {
        aceleracion = (rockets[i].potencia).reduce(potenciaMax);
        let potenciaInfoFast = document.getElementById("potenciaInfoFast" + (i + 1));
        potenciaInfoFast.innerHTML = `Potencia:
         ${aceleracion} 
         Propulsors: ${rockets[i].potencia}`;
        animacion(cohet, contador, imagen);
    }
}
//////  FRENAR  //////
function frenar1() {
    let imagen1 = document.getElementById("cohet1");
    contador1--;
    frenar(cohet1, contador1, imagen1);
}
function frenar2() {
    let imagen2 = document.getElementById("cohet2");
    contador2--;
    frenar(cohet2, contador2, imagen2);
}
function frenar(cohet, contador, imagen) {
    cohet.frenar(cohet);
    for (i = 0; i < rockets.length; i++) {
        deceleracion = (cohet.potencia).reduce(potenciaMax);
        let potenciaInfoFast = document.getElementById("potenciaInfoFast" + (i + 1));
        potenciaInfoFast.innerHTML = "Total: " + deceleracion + "Propulsors: " + rockets[i].potencia;
        animacion(cohet, contador, imagen);
        if (deceleracion == 0) {
            imagen.style.top = `${420}px`;
        }
    }
}
////// GO  //////
function go() {
    let contadorGoal = 0;
    let posicion = 0;
    for (i = 0; i < rockets.length; i++) {
        let imagen = document.getElementById("cohet" + (i + 1));
        let goal = document.getElementById("goal");
        let goalPostion = goal.offsetTop, j = 0;
        posicion = imagen.offsetTop - imagen.offsetWidth;
        aceleracion = (rockets[i].potencia).reduce(potenciaMax);
        if (aceleracion > 0) {
            imagen.style.top = `${posicion - aceleracion}px`;
        }
        if ((posicion < goalPostion) && (posicion < 0)) {
            contadorGoal++;
        }
    }
    if ((contadorGoal == rockets.length) && (posicion < 10)) {
        document.getElementById("rules").textContent = "Genial!!!";
        document.getElementById("cohet1").style.visibility = "hidden";
        document.getElementById("cohet2").style.visibility = "hidden";
    }
    else if (posicion < 10) {
        document.getElementById("rules").textContent = "Vuelve a probar!";
        document.getElementById("cohet1").style.visibility = "hidden";
        document.getElementById("cohet2").style.visibility = "hidden";
    }
}
/////// ANIMACIONS  ///////
function animacion(cohet, contador, imagen) {
    if ((contador > 0) && (!cohet.fullPower)) {
        imagen.classList.add("move");
        imagen.classList.remove("max");
    }
    else if (cohet.fullPower) {
        imagen.classList.remove("move");
        imagen.classList.add("max");
    }
    else {
        imagen.classList.remove("move");
    }
}
