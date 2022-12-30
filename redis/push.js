var redis = require("ioredis");
var client = redis.createClient(6379, '127.0.0.1', {connect_timeout: 1});

let arr = ["some val","some val2","some val3"];
//Use multi() to pipeline multiple commands at once
let multi = client.multi();

for (let i=0; i<10000; i++) {
    //console.log(arr[i]);
    //將一個或多個值value插入到列表key的表尾。
    client.lpush('testlist1', 'some val1');
    client.lpush('testlist2', 'some val2');
    client.lpush('testlist3', 'some val3');
    client.lpush('testlist4', 'some val4');
    client.lpush('testlist5', 'some val5');
    
}
// client.lpush('testlist','yucaho');
multi.exec(function(err, response) {
    if(err) throw err; 

})

/* SHOW ALL LIST ITEMS--*/
// client.lrange('testlist', 0, -1, function (error, items) {
//     if (error) throw error

//     items.forEach(function (item) {
//     /// processItem(item)
//     console.log(item);
//     })
//     console.log('===');
// })
