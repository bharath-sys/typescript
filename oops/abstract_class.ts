abstract class Vehicle {
    constructor() {
        
    }
    abstract startEngine(): void;
}

class Car extends Vehicle {
    startEngine(): void {
        console.log("Car engine started.");
    }
}

class Motorcycle extends Vehicle {
    startEngine(): void {
        console.log("Motorcycle engine started.");
    }
}

const myCar = new Car();
myCar.startEngine(); // Output: Car engine started.

const myMotorcycle = new Motorcycle();
myMotorcycle.startEngine(); // Output: Motorcycle engine started.