// LSP : child must be able to substitute parent class then it is valid 

interface shape {
    area(): number
}

interface threeDimensionalShape extends shape {
    volume(): number;
}

class Square implements shape {
    constructor(private readonly side: number) {
    };
    area(): number {
        return this.side * this.side;
    }
}


function printArea(shape: shape): void {
    console.log(shape.area());
}

const board = new Square(4);
printArea(board);