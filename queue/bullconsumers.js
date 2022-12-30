'use strict'

const http = require('http');
let https = require("https");
const Queue = require('bull');

const testQueue = new Queue("kuaishou:queue",{
    prefix:'test',
    redis:{
        port:6379,
        host:'localhost',
        db:0,
        password:'',
    },
    limiter:{
        max:10000,
        duration:5000,
    },
})

// testQueue.process(async(job) => {
//     return doSomething(job.data);
// })

testQueue.process(function (job,done){
    doSomething(job.data);
    done();
});

function doSomething(data){
    console.log("consumers data is:"+JSON.stringify(data));

    let appid = "yu";
    let secret = "chao";
    let code = "yuchao";
    var url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
    console.log("URL:"+url);
    https.request(url, function (res) {
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
	    //process.stdout.write(data);
        });
        res.on("end", function () {
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
            console.log(result);
        });
    }).on("error", function (err) {
        console.log(err.stack)
        //callback.apply(null);
    });
    
    // const options = {
    //     hostname: '127.0.0.1',
    //     port: 6600,
    //     path: '/adsense/addReqTask',
    //     method: 'GET'
    //   };
    //   const req = http.request(data.req_url, function (res) {
    //     res.statusCode;
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //       console.log('BODY: ' + chunk);
    //     });
    //   });
      
    //   req.on('error', function (e) {
    //     console.log('problem with request: ' + e.message);
    //   });
    //   req.end();


    //   //Post请求
    // const options = {
    // //   hostname: '127.0.0.1',
    // //   port: 7001,
    // //   path: '/import/v1/grooming-salons',
    // method: 'POST',
    // headers: {
    //     'Content-Type': 'application/json; charset=UTF-8'
    // }
    // };

    // console.log("consumers data is:"+JSON.stringify(data));

    // let req = http.request(data.req_url, options, function (res) {
    // // console.log('STATUS: ' + res.statusCode);
    // // console.log('HEADERS: ' + JSON.stringify(res.headers));
    // res.setEncoding('utf8');
    // res.on('data', function (chunk) {
    //     // console.log('BODY: ' + chunk);
    //     if (res.statusCode != 200) {
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('BODY: ' + chunk);
    //     console.log('brandId: ' + shop.brandId);
    //     }
    // });

    // if (res.statusCode == 200) {
    //     successCount++;
    // } else {
    //     failCount++;
    // }

    // console.log(`total - successCount: ${successCount}, failCount: ${failCount}, brandId: ${shop.brandId}`);
    // console.log("--------");
    // });

    // req.on('error', function (e) {
    // failCount++;
    // console.log(`total - err - successCount: ${successCount}, failCount: ${failCount}`);
    // console.log('problem with request: ' + e.message);
    // });

    // // write data to request body
    // req.write(content);
    // req.end();
    
}







 
