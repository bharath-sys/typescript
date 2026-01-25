// dip : dependency inversion principle => hlm's should not depend on llm's

// hlm => high level modules , llm => low level modules

// they both should depend on abstraction 

//  hlm                             llm 
// Notificationservice             emailNotification
// mongoDb or SQLdb


// example

interface Notifier {
    send(msg: string): void;
}


interface smsNotifier {
    send(sms: string): void;
}

class EmailNotification implements Notifier {
    send(email: string) {
        console.log(email + "  sent...")
    }
}

class Notificationservice implements Notifier {
    notifier: Notifier = new EmailNotification();
    send(msg: string) {
        this.notifier.send(msg);
    }
}

const ns: Notifier = new Notificationservice();
ns.send('hello')

// which is bad practice

// now lets redesign Notificationservice

class NotificationserviceDIP {
    constructor(private readonly notifier: Notifier) { }
    send(msg: string) {
        this.notifier.send(msg);
    }
}

const emailNotifier: Notifier = new EmailNotification();
const notificationService1: Notifier = new NotificationserviceDIP(emailNotifier);

notificationService1.send('writing this sample email...')