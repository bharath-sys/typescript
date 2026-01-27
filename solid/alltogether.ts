{
    // booking servie 

    // bad design 

    // class BookingServiece {
    //     placeOrder(productId:string,amount:number,paymentType){
    //         if(paymentType=='card') payUsingCreditCard();
    //         saveOrder()
    //         sendNotification()
    //     }
    // }

    // voilates all principles ->
    //  srp -> to many responsibilites for single class 
    // ocp -> for extension we need to change the code
    // dip -> business logic depends on low level components

    // good approach 

    interface PaymentGateway {
        pay(amount: number): void
    }

    interface Notifier {
        notify(message: string): void
    }

    interface Repo {
        save(orderId: string): void
    }

    class NotificationService {
        constructor(private readonly Notifier: Notifier) {
        }
        sendNotification(message: string) {
            this.Notifier.notify(message);
        }
    }

    class PaymentService {
        constructor(private readonly paymentGateway: PaymentGateway) {

        }
        processPayment(amount: number) {
            this.paymentGateway.pay(amount);
        }
    }

    class OrderService {
        constructor(private readonly orderRepositary: Repo) {

        }
        saveOrder(orderId: string) {
            this.orderRepositary.save(orderId);
        }
    }

    class BookingService {
        constructor(
            private readonly DbService: OrderService,
            private readonly PaymentGateway: PaymentService,
            private readonly NotificationService: NotificationService
        ) { }

        placeOrder(productId: string, amount: number, message: string) {
            this.PaymentGateway.processPayment(amount);
            this.DbService.saveOrder(productId);
            this.NotificationService.sendNotification(message)
        }
    }

    class CreditCardPayment implements PaymentGateway {
        pay(amount: number): void {
            console.log("amount paid via credit card : ", amount);
        }
    }

    class OrderRepo implements Repo {
        save(orderId: string): void {
            console.log("saved order ID to DB : ", orderId)
        }
    }

    class EmailNotification implements Notifier {
        notify(message: string): void {
            console.log("success message send via email : ", message);
        }
    }

    const bookingService = new BookingService(
        new OrderService(new OrderRepo()),
        new PaymentService(new CreditCardPayment()),
        new NotificationService(new EmailNotification())
    );

    bookingService.placeOrder("ORDER_101", 500, "thanks by 101");


}