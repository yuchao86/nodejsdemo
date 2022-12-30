// Pattern Definition
// Abstrast Part
/** Interface that the adapter want to call */
class ITarget {
    request() { }
}

// Concrete Part
/** Final class to call */
class Adaptee {
    specificRequest() {
        console.log("Yaaaaay I'm a specific request !")
    }
}

/** Class that adapt the ITarget (extends) to the Apatee (has a) */
class Adapter extends ITarget {
    adaptee = null

    /** This class HAS An adaptee */
    constructor(adaptee) {
        super()
        this.adaptee = adaptee
    }

    /** Interface metod matching the adaptee class */
    request() {
        this.adaptee.specificRequest()
    }
}

/** Final user that use the Adapter to call the Adaptee  */
class Client {
    adapter = null

    /** Cretation of Adapter with the Adaptee */
    constructor() {
        this.adapter = new Adapter(new Adaptee())
    }

    /** Call of the Adapter */
    doSomeRequests() {
        this.adapter.request()
    }
}

// Pattern Usage
const client = new Client()
client.doSomeRequests()