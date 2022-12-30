
var async = require('async');
//初始化
let a = false;
let b = 1;
//最外层流程控制
async.waterfall([
    function (cb) {
        console.log('第一次 : ');
        setTimeout(function () {

            cb(null,true)
        }, 1000);
    },
    function (res,cb) {
        console.log('第二次 : ');
        console.log('---------------------------',res);
        setTimeout(function () {

            cb(null,b+1)
        }, 1000);
    },
    function (res,cb) {
        console.log('第三次 : ');
        console.log('---------------------------',res);
        setTimeout(function () {

            cb()
        }, 1000);
    }

], function (err, result) {
    if (err) return console.log(err);
    console.log('成功');
})