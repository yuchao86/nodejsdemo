
const https = require('https');
const url = require('url');


var post_data="………………";//请求数据

let timestamps = new Date();
let accessToken = 'b313b6624b4771536b21f827cb257202xx';
let contentType = 'application/json';

let kuaishou_url = "https://ad.e.kuaishou.com/rest/openapi/v1/creative/list";
let urlObj = url.parse(kuaishou_url,true);

let header = {
    "Access-Token": String(accessToken),
    "Content-Type": String(contentType),
    "sign": ""
}
var postData = {
    'page' : 20000152,
    'page_size' : 10,
    'advertiser_id' : 12870597,
    'status' : -1,
};
var reqdata = JSON.stringify(postData);//JSON解析成字符串


const options = {
  hostname: urlObj.hostname,
  port: 443,
  path: urlObj.path,
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


            

        