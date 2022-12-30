const url = require('url');
const path = require('path');

let video_url = "http://***.mp4";
let url_obj = url.parse(video_url);

console.log("================================",url_obj);

let path_obj = path.parse(video_url);
console.log('--------------------------------',path_obj);

var local_path = path.resolve(__dirname,'yuchao.mp4');
console.log("================================",local_path)

let file = "C:\***.3227168d.mp4";
var dddd = path.parse(file);
console.log(dddd);

console.log(path.resolve(__dirname+'/distributionTokenBucket.lua'));
console.log(__dirname);