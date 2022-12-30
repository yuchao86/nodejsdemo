
const https = require('https');



var post_data="………………";//请求数据

let timestamps = new Date();
let accessToken = '69d99a7c1fdf3f4b271b';
let contentType = 'application/json';

let kuaishou_url = 'https://ad.e.kuaishou.com/rest/openapi/v2/campaign/create';

let header = {
    "Access-Token": String(accessToken),
    "Content-Type": String(contentType),
}
var postData = {
    'advertiser_id' : 20000152,
    'uid' : 'anonymous@163.com',
    'campaign_name' : 'test创建计划',
    'type' : 4,
};
var reqdata = JSON.stringify(postData);//JSON解析成字符串


const options = {
  hostname: 'ad.e.kuaishou.com',
  port: 443,
  path: '/rest/openapi/v2/campaign/create',
  method: 'POST',
  headers: header,

};

const req = https.request(options, (res) => {
  console.log('状态码:', res.statusCode);
  console.log('请求头:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.write(reqdata);//写入请求数据
req.end();


            

        


  if(body != null){

        let req_url = 'http://****.com/api/task/notify';

        let urlObj = url.parse(req_url,true);

        let resData = JSON.parse(body);
        let header = {"Content-Type": "application/json"};

        var postData = {
            'task_id' : taskId,
            'status':2,
            'resp_status' : resData.code,
            'resp_data_type' : "json",
            'resp_data' : JSON.stringify(resData),
        };
        var reqdata = JSON.stringify(postData);//JSON解析成字符串
        console.log('task notify data '+reqdata);

        const options = {
            uri:req_url,
            url:req_url,
            hostname: urlObj.hostname,
            port: 80,
            path: urlObj.pathname,
            method: "POST",
            headers: header,
            body: reqdata,
            //key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
            //cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
        };

        _core.httpClient.post(options, function (err, res, body) {
            console.log('config:'+config.debug);
        if (config.debug){
            console.log('task notify result: ', err, body);
        }
        if (body) {
            if (typeof (body) == "string") {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    err = 'prase err';
                }
            }
            if (err || (body.errcode != 0 && body.errmsg != 'OK')) {
                return next(err, body);
            }
            return next(err, body);
        } else {
            return next(err, body);
        }
        });
    }
