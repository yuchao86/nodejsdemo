const TokenBucket = require('./tokenbucket');

var bucket = new TokenBucket({
    capacity: 5000,
    fillQuantity:50,
    fillTime:1000,//ms
    initialCapacity: 50,
});

for(var i=0;i<10000;i++){
    var timeToWait = bucket.take(1);
    console.log(i+" token :"+timeToWait);
}

