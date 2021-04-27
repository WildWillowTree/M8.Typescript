let cohet: Cohet, cohet1:Cohet, cohet2:Cohet;
let aceleracion:number,deceleracion:number, potTotal:number, i:number, rockets = new Array(), contador1 = 0, contador2 = 0, imagen:HTMLElement;

//////  CREAR  //////

function createRocket1(id:string, propulsors:number, potMaxProp:number[]){
    cohet1 = new Cohet(id, propulsors, potMaxProp);
    createRocket(cohet1);
    (document.getElementById("cohet1") as HTMLImageElement).style.visibility = "visible";
}
function createRocket2(id:string, propulsors:number, potencia:number[]){
    if(rockets.length > 0){
        cohet2 = new Cohet(id, propulsors, potencia);
        createRocket(cohet2);
        (document.getElementById("cohet2") as HTMLImageElement).style.visibility = "visible";
    }
}
function createRocket(cohet:Cohet){ 
    (document.getElementById("output") as HTMLElement).style.visibility = "visible";;
    rockets.push(cohet);
    for(i=0; i<rockets.length; i++){
        let cohetInfo = document.getElementById("cohetInfo" + (i+1)) as HTMLElement;
        potTotal = (rockets[i].potMaxProp).reduce(potenciaMax);
        cohetInfo.innerHTML = `Cohet ${i+1}:
        ID: ${rockets[i].id}
        Propulsors: ${rockets[i].numProp}
        Potencia: ${rockets[i].potMaxProp}
        Potencia Max: ${potTotal}`;   
    } 
    if(rockets.length > 0){
        (document.getElementById("rules") as HTMLElement).textContent = "Crea el cohete 2";
    }
    if(rockets.length > 1){
        (document.getElementById("rules") as HTMLElement).textContent = "Todos deben ganar";
        (document.getElementById("rules") as HTMLElement).style.fontSize = "1.5em";
        (document.getElementById("goal") as HTMLElement).style.visibility = "visible";;
    }
}
function potenciaMax(total:number, value:number){
    return total + value;
}

//////  ACELERAR  //////

function acelerar1(){
    let imagen1 = document.getElementById("cohet1") as HTMLImageElement;
    contador1++;
    acelerar(cohet1, contador1, imagen1);
}
function acelerar2(){
    let imagen2 = document.getElementById("cohet2") as HTMLImageElement;
    contador2++;
    acelerar(cohet2, contador2, imagen2);
}
function acelerar(cohet:Cohet, contador:number, imagen:HTMLElement){ 
    cohet.acelerar(cohet);
    for(i=0; i<rockets.length; i++){ 
        aceleracion = (rockets[i].potencia).reduce(potenciaMax);
        let potenciaInfoFast = document.getElementById("potenciaInfoFast" + (i+1)) as HTMLElement;
        potenciaInfoFast.innerHTML = `Potencia:
         ${aceleracion} 
         Propulsors: ${rockets[i].potencia}`;
        animacion(cohet, contador, imagen);
    }
}

//////  FRENAR  //////

function frenar1(){
    let imagen1 = document.getElementById("cohet1") as HTMLImageElement;
    contador1--;
    frenar(cohet1, contador1, imagen1);
}
function frenar2(){
    let imagen2 = document.getElementById("cohet2") as HTMLImageElement;
    contador2--;
    frenar(cohet2,contador2, imagen2);
}
function frenar(cohet:Cohet,contador:number, imagen:HTMLElement){
    cohet.frenar(cohet);
    for(i=0; i<rockets.length; i++){ 
        deceleracion = (cohet.potencia).reduce(potenciaMax);
        let potenciaInfoFast = document.getElementById("potenciaInfoFast" + (i+1)) as HTMLElement;
        potenciaInfoFast.innerHTML = "Total: " + deceleracion + "Propulsors: " + rockets[i].potencia;
        animacion(cohet, contador, imagen);
        if(deceleracion == 0){
            imagen.style.top = `${420}px`;
        }
    }
}

////// GO  //////

function go(){
    let contadorGoal = 0;
    let posicion = 0;

    for(i = 0; i < rockets.length; i++){
        let imagen = document.getElementById("cohet" + (i+1)) as HTMLImageElement;
        let goal = document.getElementById("goal") as HTMLElement;
        let goalPostion = goal.offsetTop, j = 0;
            posicion = imagen.offsetTop - imagen.offsetWidth;
                aceleracion = (rockets[i].potencia).reduce(potenciaMax);
            if(aceleracion > 0){
                imagen.style.top = `${posicion - aceleracion}px`;
            }
        if((posicion < goalPostion) && (posicion < 0)){
            contadorGoal++;
        }
    } 
    if((contadorGoal == rockets.length) && (posicion < 10)){
        (document.getElementById("rules") as HTMLElement).textContent = "Genial!!!";
        (document.getElementById("cohet1") as HTMLImageElement).style.visibility = "hidden";
        (document.getElementById("cohet2") as HTMLImageElement).style.visibility = "hidden";
    }
    else if(posicion < 10){
        (document.getElementById("rules") as HTMLElement).textContent = "Vuelve a probar!";
        (document.getElementById("cohet1") as HTMLImageElement).style.visibility = "hidden";
        (document.getElementById("cohet2") as HTMLImageElement).style.visibility = "hidden";
    }  
}       

/////// ANIMACIONS  ///////

function animacion(cohet:Cohet, contador:number, imagen:HTMLElement){
    
    if((contador > 0) && (!cohet.fullPower)){
        imagen.classList.add("move");
        imagen.classList.remove("max");
    }
    else if(cohet.fullPower){
        imagen.classList.remove("move");
        imagen.classList.add("max");
    }
    else{
        imagen.classList.remove("move");
    } 
}

  