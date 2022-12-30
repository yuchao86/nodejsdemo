
const axios = require('axios');

class CircuitBreaker {
    constructor(timeout, failureThreshold, retryTimePeriod) {
        // We start in a closed state hoping that everything is fine
        this.state = 'CLOSED';
        // Number of failures we receive from the depended service before we change the state to 'OPEN'
        this.failureThreshold = failureThreshold;
        // Timeout for the API request.
        this.timeout = timeout;
        // Time period after which a fresh request be made to the dependent
        // service to check if service is up.
        this.retryTimePeriod = retryTimePeriod;
        this.lastFailureTime = null;
        this.failureCount = 0;
    }

    // reset all the parameters to the initial state when circuit is initialized
    reset() {
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED';
    }

    // Set the current state of our circuit breaker.
    setState() {
        if (this.failureCount > this.failureThreshold) {
            if ((Date.now() - this.lastFailureTime) > this.retryTimePeriod) {
                this.state = 'HALF-OPEN';
            } else {
                this.state = 'OPEN';
            }
        } else {
            this.state = 'CLOSED';
        }
    }

    recordFailure() {
        this.failureCount += 1;
        this.lastFailureTime = Date.now();
    }


    async call(urlToCall) {
        // Determine the current state of the circuit.
        this.setState();
        switch (this.state) {
            case 'OPEN':
                // return  cached response if no the circuit is in OPEN state
                return { data: 'this is stale response' };
            // Make the API request if the circuit is not OPEN
            case 'HALF-OPEN':
            case 'CLOSED':
                try {
                    const response = await axios({
                        url: urlToCall,
                        timeout: this.timeout,
                        method: 'get',
                    });
                    // Yay!! the API responded fine. Lets reset everything.
                    this.reset();
                    return response;
                } catch (err) {
                    // Uh-oh!! the call still failed. Lets update that in our records.
                    this.recordFailure();
                    throw new Error(err);
                }
            default:
                console.log('This state should never be reached');
                return 'unexpected state in the state machine';
        }
    }

}

const circuitBreaker = new CircuitBreaker(3000, 5, 2000);
async function test() {
    for(var i =1;i < 10000; i++) {
        const response = await circuitBreaker.call('http://localhost:6600/adsense/queryReqTask?taskid=20220905487881000');
        console.log("RES:",i,response);
        await sleep(1500);
    }
    
    function sleep(ms) {
        return new Promise(resolve=>setTimeout(resolve, ms))
    }
}

 test();
