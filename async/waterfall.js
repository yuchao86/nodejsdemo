
var async = require('async');
//初始化
var async_lists = [{ aa: 11, bb: 21 }, { aa: 31, bb: 41 }, { aa: 51, bb: 61 }, { aa: 71, bb: 81 }, { aa: 91, bb: 91 }];
var task = [];
task.push(function (callback) {
    console.log('第一个task任务');
    //循环
    async.eachSeries(async_lists, function (async_list, cb) {
        task_a(async_list, cb)
    }, function (err) {
        if (err) return callback(err);
        //重新赋值
        async_lists = [{ aa: 12, bb: 22 }, { aa: 32, bb: 42 }, { aa: 52, bb: 62 }, { aa: 72, bb: 82 }, { aa: 92, bb: 92 }];
        callback()
    });
})
task.push(function (callback) {
    console.log('第二个task任务');
    async.eachSeries(async_lists, function (async_list, cb) {
        task_a(async_list, cb)
    }, function (err) {
        if (err) return callback(err);
        async_lists = [{ aa: 13, bb: 23 }, { aa: 33, bb: 43 }, { aa: 53, bb: 63 }, { aa: 73, bb: 83 }, { aa: 93, bb: 93 }];
        callback()
    });
})
task.push(function (callback) {
    console.log('第三个task任务');
    async.eachSeries(async_lists, function (async_list, cb) {
        task_a(async_list, cb)
    }, function (err) {
        if (err) return callback(err);
        callback()
    });
})

//最外层流程控制
async.waterfall(task, function (err, result) {
    if (err) return console.log(err);
    console.log('成功');
})

function task_a(async_list, cb) {
    var task2 = [];
    task2.push(function (cb) {
        console.log('第一次 : ', async_list);
        setTimeout(function () {

            cb()
        }, 1000);
    })
    task2.push(function (cb) {
        console.log('第二次 : ', async_list);
        console.log('---------------------------');
        setTimeout(function () {

            cb()
        }, 1000);
    })
    //循环内流程控制
    async.waterfall(task2, function (err, result) {
        if (err) return cb(err);
        cb();
    })
}

console.time("aa");   //测试时间  只能测试同步得 还是保存了一个时间 后面在减去这个时间
for(var i =0;i<10;i++){
     (function(a){ // a =i 被保留下来 a=1,2,3...
        
        setTimeout(function() {
            console.log(a);   //所以打印得是0123456789  在查询方面比较有用
        }, 100);
    })(i)
}
console.timeEnd("aa")