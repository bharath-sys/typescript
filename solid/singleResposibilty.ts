/* 

SRP
each class will have only single responsibilty 
srp != single method 

*/


//  bad practice ... 

// class OrderService {
//     constructor () {}
    
    // createOrder()
    // makePayment()
    // confirmOrder()
    // sendNotification

// }

//  single responsibility principle 
// good practice 

interface IOrderService {
    processOrder(amount: number) : void;
}

interface paymentGateway {
    pay(amount: number) : void;
}

interface notifier {
    sendNotification(): void;
}

class OrderService implements IOrderService{
    constructor(
        private paymentGateway : paymentGateway,
        private notifier: notifier
    ){
    }
    processOrder(amount:number) {
        // createOrder
        this.paymentGateway.pay(amount);
        // confirm order
        this.notifier.sendNotification();
    }
}

