const redis = require('redis');
const redis_token_bucket = require('./redisTokenBucket');
const client = redis.createClient()
//const consume = redis_token_bucket.getRedisToken(client);


console.log("client: " ,client);

consume('example_bucket_key', {
    refill_interval_ms: 1000,   // How often should new tokens be added to the bucket?
    max_bucket_size: 60,        // How big is the bucket?
    cost: 1                     // optional, if you want to consume more than 1 token
})
.then(result => {
    if (result.tokensLeft < 0) {
        console.log(`Error, wait ${result.timeLeftMs} milliseconds before retrying`);
    } else {
        console.log('Success');
    }
});