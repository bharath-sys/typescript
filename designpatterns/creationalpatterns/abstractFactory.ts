// products
interface ProductA {
    method1(): void;
    method2(): void;
}

interface ProductB {
    method1(): void;
    method2(): void;
}

// concrete products 
class ConcreteProduct1A implements ProductA {
    method1() {
        console.log("implementing method 1");
    }
    method2() {
        console.log("implementing method 2");
    }
}

class ConcreteProduct2A implements ProductA {
    method1() {
        console.log("implementing method 1");
    }
    method2() {
        console.log("implementing method 2");
    }
}

class ConcreteProduct1B implements ProductB {
    method1() {
        console.log("implementing method 1");
    }
    method2() {
        console.log("implementing method 2");
    }
}

class ConcreteProduct2B implements ProductB {
    method1() {
        console.log("implementing method 1");
    }
    method2() {
        console.log("implementing method 2");
    }
}


// -----------------------

// factories
abstract class AbstractFactory {
    abstract getProductA(): ProductA;
    abstract getProductB(): ProductB;
}

// concreteFactories
class ConcreteFactory1 extends AbstractFactory {
    getProductA(): ProductA {
        return new ConcreteProduct1A();
    }
    getProductB(): ProductB {
        return new ConcreteProduct1B();
    }
}

class ConcreteFactory2 extends AbstractFactory {
    getProductA(): ProductA {
        return new ConcreteProduct2A();
    }
    getProductB(): ProductB {
        return new ConcreteProduct2B();
    }
}

// -----------------------

// factory-selector 
enum FactoryType {
    Type1,
    Type2
}

class FactoryProducer {
    static getFactory(type: FactoryType): AbstractFactory {
        switch (type) {
            case FactoryType.Type1:
                return new ConcreteFactory1();
            case FactoryType.Type2:
                return new ConcreteFactory2();
        }
    }
}

// -----------------------

// client 
function clientCode(factory: AbstractFactory) {
    const productA = factory.getProductA();
    const productB = factory.getProductB();

    productA.method1();
    productB.method2();
}

console.log("Testing Abstract Factory with Type 1 (Suite 1):");
clientCode(FactoryProducer.getFactory(FactoryType.Type1));

console.log("\nTesting Abstract Factory with Type 2 (Suite 2):");
clientCode(FactoryProducer.getFactory(FactoryType.Type2));

// client <-> factory-selector <-> concrete-factory <-> concrete-product
