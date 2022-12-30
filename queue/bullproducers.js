const Queue = require('bull');

const testQueue = new Queue("kuaishou:queue", {
    prefix: 'test',
    redis: {
        port: 6379,
        host: 'localhost',
        db: 0,
        password: '',
    },
    limiter: {
        max: 10000,
        duration: 5000,
    },
})

const job = function () {
    let tasks = [{data:{
        "req_taskid": "",
        "req_channel": "Kuaishou",
        "req_url": "https://ad.e.kuaishou.com/rest/openapi/v2/campaign/create",
        "req_md5": "",
        "req_mothed": "POST",
        "req_header": "",
        "req_data_type": "JSON",
        "req_data": "{\"advertiser_id\": 20000152,\"campaign_name\":\"market api创建计划\",\"type\":4}",
        "req_timeout": "10000",
        "req_ratelimit": "3000",
        "req_totallimit": "1000",
        "req_daliytop": "2000",
        "req_extern": "",
        "real_time": "1660723455011",
        "realtradeid": "",
        "_id": "62fca0ff82bea3b6172c251e",
        "__v": 0,
        "state": 0,
        "err": ""
    }, },{data:{
        "req_taskid": "",
        "req_channel": "Kuaishou",
        "req_url": "https://ad.e.kuaishou.com/rest/openapi/v2/campaign/create",
        "req_md5": "",
        "req_mothed": "POST",
        "req_header": "",
        "req_data_type": "JSON",
        "req_data": "{\"advertiser_id\": 20000152,\"campaign_name\":\"market api创建计划\",\"type\":4}",
        "req_timeout": "10000",
        "req_ratelimit": "3000",
        "req_totallimit": "1000",
        "req_daliytop": "2000",
        "req_extern": "",
        "real_time": "1660723455011",
        "realtradeid": "",
        "_id": "62fca0ff82bea3b6172c251e",
        "__v": 0,
        "state": 0,
        "err": ""
    }}];
    // },{
    //     lifo:true, //任务先进先出
    //     //delay:1000, //等等多少毫秒，直到任务结束
    //     priority:3,//1-5 1最高，5最低
    //     attempts:3,//如果失败，尝试次数
    //     timeout:10000, //10秒后认为这个认为失败
    //     removeOnComplete:true, //任务完成删除
    //     //removeOnFail:true,//失败删除
    //     // repeat:{
    //     //     every:1000,
    //     //     limit:2
    //     // }
    // }],

    testQueue.addBulk(tasks);
}

job();
