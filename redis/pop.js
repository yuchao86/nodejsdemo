var redis = require("ioredis");
var client = redis.createClient(6379, '127.0.0.1', {connect_timeout: 1});


/* SHOW ALL LIST ITEMS--*/
// client.lrange('testlist', 0, -1, function (error, items) {
//     if (error) throw error

//     items.forEach(function (item) {
//     /// processItem(item)
//     console.log(item);
//     })
//     console.log('===');
// })


// LPOP移除并返回列表key的头元素。
// blpop LPOP命令的阻塞版本
for(var i = 0;i<100000;i++){
    client.brpop(['testlist1','testlist2','testlist3','testlist4','testlist5'], 0, function(err, data) {
        console.log(' brpop: ' + data);
            //setTimeout(function() {
                //      addWorker();
            //}, 0);
    });
}
