// ISP : interface segrigation principle => no fat interface ( client must not be dependent on unused methods if they are not need )

interface record {
    fhd(): void,
    hd(): void,
    sd(): void
}

// bad practice is base model can only record sd but needs to implement all lets say 

class BaseIphoneCamera implements record {
    fhd() {
        throw new Error("not supported");
    };
    hd() {
        throw new Error("not supported");
    };
    sd() {
        console.log(`recording in sd....`);
    }
}

// now the best practice according isp would be 

interface SDRecorder { sd(): void }
interface HDRecorder { hd(): void }
interface FHDRecorder { fhd(): void }


class ProiPhone implements HDRecorder, SDRecorder {
    constructor() { };
    sd() {
        console.log(`recording in sd....`);
    }
    hd() {
        console.log(`recording in Hd....`);
    }
}

const iphone16Pro = new ProiPhone();
iphone16Pro.hd();