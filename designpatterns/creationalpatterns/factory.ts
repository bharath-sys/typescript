/**
 * FACTORY METHOD PATTERN
 * 
 * Intent: Provides an interface for creating objects in a superclass,
 * but allows subclasses to alter the type of objects that will be created.
 */

// 1. Product Interface
// This defines the interface of objects the factory method creates.
interface Product {
    productMethod(): void;
}

// 2. Concrete Product
// Provides specific implementations of the Product interface.
class ConcreteProductA implements Product {
    public productMethod(): void {
        console.log("ConcreteProductA: Executing product logic.");
    }
}

class ConcreteProductB implements Product {
    public productMethod(): void {
        console.log("ConcreteProductB: Executing different product logic.");
    }
}

// 3. Creator (Abstract)
// Declares the factory method that returns an object of type Product.
abstract class Creator {
    // The Factory Method
    public abstract createProduct(): Product;

    /**
     * Note: The Creator's primary responsibility isn't creating products.
     * It usually contains core business logic that relies on Product objects.
     */
    public someOperation(): string {
        const product = this.createProduct();
        product.productMethod();
        return "Creator: The same creator's code has just worked with the product.";
    }
}

// 4. Concrete Creators
// Overrides the factory method to change the resulting product's type.
class ConcreteCreatorA extends Creator {
    public createProduct(): Product {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    public createProduct(): Product {
        return new ConcreteProductB();
    }
}

/**
 * Client Code
 */
function clientCode(creator: Creator) {
    console.log(creator.someOperation());
}

console.log("App: Launched with ConcreteCreatorA.");
clientCode(new ConcreteCreatorA());

console.log("\nApp: Launched with ConcreteCreatorB.");
clientCode(new ConcreteCreatorB());


/**
 * QUICK NOTES: FACTORY METHOD
 * ---------------------------
 * 1. USE WHEN: You don't know beforehand the exact types and dependencies 
 *    of the objects your code should work with.
 * 
 * 2. PROS:
 *    - Avoids tight coupling between creator and concrete products.
 *    - Single Responsibility Principle: Product creation code is in one place.
 *    - Open/Closed Principle: You can introduce new products without breaking client code.
 * 
 * 3. CONS:
 *    - Code can become complex as you need to introduce many new subclasses.
 * 
 * 4. KEY DIFFERENCE: Unlike 'Simple Factory', the 'Factory Method' uses 
 *    inheritance and polymorphism to decide which object to create.
 */
