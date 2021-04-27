"use strict";
class Cohet {
    constructor(id, numProp, potMaxProp) {
        this.potencia = new Array();
        this.full = 0;
        this.fullPower = false;
        this.stop = true;
        this.id = id;
        this.numProp = numProp;
        this.potMaxProp = potMaxProp;
        for (i = 0; i < this.potMaxProp.length; i++) {
            this.potencia.push(0);
        }
    }
    acelerar(cohet) {
        this.full = 0;
        this.stop = false;
        for (i = 0; i < this.potMaxProp.length; i++) {
            if (this.potencia[i] < this.potMaxProp[i]) {
                this.potencia[i] += 10;
            }
            if (this.potencia[i] == this.potMaxProp[i]) {
                this.full++;
                if (this.full == (this.potencia.length)) {
                    this.fullPower = true;
                }
            }
        }
    }
    frenar(cohet) {
        for (i = 0; i < this.potMaxProp.length; i++) {
            this.fullPower = false;
            if (this.potencia[i] > 0) {
                this.potencia[i] -= 10;
            }
            else if (this.potencia[i] == 0) {
                this.full--;
                this.stop = true;
            }
        }
    }
}
