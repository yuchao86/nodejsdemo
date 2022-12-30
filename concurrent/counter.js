
class Counter {
    constructor(num = 0) {
        this.num = num;
    }

    get() {
        return this.num;
    }

    increase() {
        this.num += 1;
    }

    reset() {
        this.num = 0;
    }
}

module.exports = {
    Counter: Counter,
};