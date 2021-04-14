"use strict";
var car, carArray = new Array();
function createCar() {
    var plate = document.getElementById('plateId');
    var brand = document.getElementById('brandId');
    var color = document.getElementById('colorId');
    var carInfo = document.getElementById("carInfo");
    var newPlate = plate.value.toUpperCase();
    car = new Car(newPlate, brand.value, color.value);
    var carForm = document.getElementById('carFormId');
    carForm.classList.remove('is-invalid');
    validatePlate(newPlate);
    if (validatePlate(newPlate)) {
        carInfo.textContent = "Coche: Matrícula: " + car.plate
            + " Color: " + car.color + " Marca: " + car.brand
            + " Ruedas: " + JSON.stringify(car.wheels);
        document.getElementById("carFormId").hidden = true;
        document.getElementById("wheelFormId").style.display = "block";
        carArray.push(car);
    }
    else {
        plate.classList.add("is-invalid");
        document.getElementById("errorPlate").textContent = "Formato matrícula incorrecto.";
    }
    if (brand.value == "") {
        brand.classList.add("is-invalid");
        document.getElementById("errorBrand").textContent = "Campo obligatorio";
    }
    if (color.value == "") {
        color.classList.add("is-invalid");
        document.getElementById("errorColor").textContent = "Campo obligatorio";
    }
}
function validatePlate(newPlate) {
    var validarPlate = /^[0-9]{4}[B-DF-HJ-NP-TV-Z]{3}$/;
    if (validarPlate.test(newPlate)) {
        return true;
    }
    else {
        return false;
    }
}
function addWheels() {
    var brandWheel = document.getElementsByClassName('brandWheel');
    var diameterWheel = document.getElementsByClassName('diameterWheel');
    var contador = 0;
    var wheel;
    var wheelsInfo = document.getElementById("wheelsInfo");
    var listCars = document.getElementById("listCars");
    for (var i = 0; i < brandWheel.length; i++) {
        if (brandWheel[i].value == "") {
            brandWheel[i].classList.add("is-invalid");
            document.getElementById("errorBrand" + (i + 1)).textContent = "Campo obligatorio";
            contador++;
        }
        else {
            brandWheel[i].classList.remove("is-invalid");
        }
        if (diameterWheel[i].value == "") {
            diameterWheel[i].classList.add("is-invalid");
            contador++;
            document.getElementById("errorDiameter" + (i + 1)).textContent = "Campo obligatorio";
        }
        else {
            if (Number(diameterWheel[i].value) >= 0.4 && Number(diameterWheel[i].value) <= 2) {
                diameterWheel[i].classList.remove("is-invalid");
            }
            else {
                alert("El di\u00E1metro de la rueda " + [i + 1] + " no es correcto");
                diameterWheel[i].classList.add("is-invalid");
                contador++;
            }
        }
    }
    if (contador == 0) {
        for (var i = 0; i < diameterWheel.length; i++) {
            wheel = new Wheel(Number(diameterWheel[i].value), brandWheel[i].value);
            car.addWheel(wheel);
        }
        wheelsInfo.textContent = "Ruedas: " + "Rueda 1: " + JSON.stringify(car.wheels[0]) + "Rueda 2: " + JSON.stringify(car.wheels[1]) + "Rueda 3: " + JSON.stringify(car.wheels[2]) + "Rueda 4: " + JSON.stringify(car.wheels[3]);
        for (var _i = 0, carArray_1 = carArray; _i < carArray_1.length; _i++) {
            var vehicle = carArray_1[_i];
            listCars.textContent = "Lista de coches: " + JSON.stringify(vehicle);
        }
    }
}
