class Singleton {
    private static instance?: Singleton | null = null; // class can be used as a type for instances and also as values we generally use 

    private constructor() { } // to prevent new Singleton();

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new Singleton();
        }
        return this.instance;
    }

}

// const S: Singleton = new Singleton();

const S1: Singleton = Singleton.getInstance();
const S2: Singleton = Singleton.getInstance();
console.log(S1 == S2);