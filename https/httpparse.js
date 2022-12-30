const url = require('url');
const path = require('path');

let urladdr = 'https://11111.com/api/task/query?number=1&key=肯德基';
let urlObj = url.parse(urladdr,true);

console.log(urlObj);
let src = 'http://*****.mp4';
src = urladdr;
if(!src.includes('%')){
   src = encodeURI(src);
}

console.log(src);

let filepath = "C:\Users****.mp4";
let fileObj = path.parse(filepath);
console.log(fileObj);

let obj = filepath.split('\\x');
console.log(obj);