interface PaymentMethod {
    pay(amount: number): void;
}

class PaymentService {
    constructor(private paymentMethod: PaymentMethod) { }
    pay(amount: number): void {
        this.paymentMethod.pay(amount);
    }
}

class CreditCardPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card.`);
    }
}

class UPIPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paid ${amount} using UPI.`);
    }
}

const creditCardPayment = new CreditCardPayment();
const upiPayment = new UPIPayment();



const paymentService1 = new PaymentService(creditCardPayment);
paymentService1.pay(100); // Output: Paid 100 using Credit Card.

const paymentService2 = new PaymentService(upiPayment);
paymentService2.pay(200); // Output: Paid 200 using UPI.