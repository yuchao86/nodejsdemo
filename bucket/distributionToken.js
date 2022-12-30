const Redis = require("ioredis");
const redis = new Redis(6379, "127.0.0.1");
const fs = require('fs');

async function test() {
    const redisLuaScript = fs.readFileSync('./bucket/tokenBucket.lua');

    let key = "yuchaoToken";
    let config = {
        refill_interval_ms: 1000,   // How often should new tokens be added to the bucket?
        max_bucket_size: 100,        // How big is the bucket?
        cost: 1                     // optional, if you want to consume more than 1 token
    }
    const expire = Math.ceil(config.refill_interval_ms * config.max_bucket_size / 1000);
    const cost = config.cost || 1;

    const result1 = await redis.eval(redisLuaScript, 2, `${key}:cnt`, `${key}:ts`, Date.now(), config.refill_interval_ms, config.max_bucket_size, expire, cost);
    const result2 = await redis.eval(redisLuaScript, 2, `${key}:cnt`, `${key}:ts`, Date.now(), config.refill_interval_ms, config.max_bucket_size, expire, cost);
    console.log(result1, result2); // 1 0
}

async function getRedisToken(key, config) {
    let tokensLeft;
    const redisLuaScript = fs.readFileSync('./bucket/tokenBucket.lua');

    const expire = Math.ceil(config.refill_interval_ms * config.max_bucket_size / 1000);
    console.log("Expire: " + expire);
    const cost = config.cost || 1;
    try {
        tokensLeft = await redis.eval(redisLuaScript, 2, `${key}:count`, `${key}:times`, Date.now(), config.refill_interval_ms, config.max_bucket_size, expire, cost);
    } catch (e) {
        //sha = await scriptAsync('load', script);
        tokensLeft = await redis.eval(redisLuaScript, 2, `${key}:count`, `${key}:times`, Date.now(), config.refill_interval_ms, config.max_bucket_size, expire, cost);
    }

    tokensLeft = parseFloat(tokensLeft); // Redis returns floats as strings
    if (tokensLeft < 0) {
        return {
            tokensLeft: -1,
            timeLeftMs: tokensLeft * config.refill_interval_ms * -1,
        }
    } else if (tokensLeft == 0) {
        return {
            tokensLeft: 0,
            timeLeftMs: cost * config.refill_interval_ms,
        }
    } else {
        return {
            tokensLeft,
            timeLeftMs: 0,
        }
    }
}

let key = "Distribution:Token";
let config = {
    refill_interval_ms: 1000*2,   // How often should new tokens be added to the bucket?
    max_bucket_size: 50,        // How big is the bucket?
    cost: 1                     // optional, if you want to consume more than 1 token
}
//test();
async function test1() {
    for (var i = 0; i < 100; i++) {

        let token = await getRedisToken(key, config);

        console.log("i and Token:", i, token);
        console.log("sdsdfsd:",Math.round(token.timeLeftMs /100));

        // 调用方法休眠半秒；
        await sleep(200);

    }
}
// 函数实现，参数单位 毫秒 ；
function sleep(ms) {
    return new Promise(resolve =>setTimeout(() =>resolve(), ms));
};


test1();
