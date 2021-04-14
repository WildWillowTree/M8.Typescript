let car:Car, carArray = new Array();

function createCar(){
    let plate = (document.getElementById('plateId') as HTMLInputElement);
    let brand = (document.getElementById('brandId') as HTMLInputElement);
    let color = (document.getElementById('colorId') as HTMLInputElement);
    let carInfo = document.getElementById("carInfo") as HTMLElement;
    let newPlate = plate.value.toUpperCase();

    car = new Car(newPlate, brand.value, color.value);
    const carForm = document.getElementById('carFormId');
    carForm!.classList.remove('is-invalid');
    validatePlate(newPlate);

    if(validatePlate(newPlate)){
        carInfo.textContent = "Coche: Matrícula: " + car.plate 
        + " Color: " +car.color + " Marca: " + car.brand 
        + " Ruedas: " + JSON.stringify(car.wheels);
        document.getElementById("carFormId")!.hidden = true;
        document.getElementById("wheelFormId")!.style.display = "block";
        carArray.push(car);
    }
    else{
    plate.classList.add("is-invalid");
    document.getElementById("errorPlate")!.textContent = "Formato matrícula incorrecto.";
    }
    if(brand.value == "") {
    brand.classList.add("is-invalid");
    document.getElementById("errorBrand")!.textContent = "Campo obligatorio";
    }
    if(color.value == "") {
    color.classList.add("is-invalid");
    document.getElementById("errorColor")!.textContent = "Campo obligatorio";
    }
}
function validatePlate(newPlate:string) {
    var validarPlate = /^[0-9]{4}[B-DF-HJ-NP-TV-Z]{3}$/;
    if (validarPlate.test(newPlate)) {
        return true;
    }
    else {
        return false;
    }
}
function addWheels(){
    let brandWheel = document.getElementsByClassName('brandWheel') as HTMLCollectionOf<HTMLInputElement>;
    let diameterWheel = document.getElementsByClassName('diameterWheel') as HTMLCollectionOf<HTMLInputElement>;
    let validBrand = false, validDiameter = false, contador = 0;
    let wheel:Wheel;
    let wheelsInfo = document.getElementById("wheelsInfo") as HTMLElement;
    let listCars = document.getElementById("listCars") as HTMLElement;
    
    for (let i=0; i < brandWheel.length; i++){
        if(brandWheel[i].value == ""){
            brandWheel[i].classList.add("is-invalid");
            document.getElementById("errorBrand" + (i +1))!.textContent= "Campo obligatorio";
            validBrand = false;
            contador++;
        }
        else{
            brandWheel[i].classList.remove("is-invalid");
            validBrand = true;

        }
    }
    for (let i=0; i < diameterWheel.length; i++){
        if(diameterWheel[i].value == "" ) {
            diameterWheel[i].classList.add("is-invalid");
            validDiameter = false;
            contador++;
            document.getElementById("errorDiameter" + (i +1))!.textContent= "Campo obligatorio";
        }
        else{
            if(Number(diameterWheel[i].value) >= 0.4 && Number(diameterWheel[i].value) <= 2){
                validDiameter = true;
                diameterWheel[i].classList.remove("is-invalid");
            }
            else{
                alert(`El diámetro de la rueda ${[i +1]} no es correcto`);
                diameterWheel[i].classList.add("is-invalid");
                validDiameter = false;
                contador++;
            }
        }
    }
    if(contador == 0){
        for(let i = 0; i < diameterWheel.length; i++){
            wheel = new Wheel (Number(diameterWheel[i].value), brandWheel[i].value);
            car.addWheel(wheel);
        }
        wheelsInfo.textContent= "Ruedas: " + "Rueda 1: "+ JSON.stringify(car.wheels[0]) + "Rueda 2: " + JSON.stringify(car.wheels[1]) + "Rueda 3: " + JSON.stringify(car.wheels[2]) + "Rueda 4: " + JSON.stringify(car.wheels[3]);
        for (let vehicle of carArray){
            listCars.textContent = "Lista de coches: " + JSON.stringify(vehicle);
          } 
    }
 
}

  

    
 
