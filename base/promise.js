const fs = require("fs");

// 调用Promise构造函数，创建一个promise的实例
let p = new Promise((resolve, reject) => {
    // 写异步操作（读文件）
    fs.readFile(`${__dirname}/readme.txt`, "utf-8", (err, data) => {
        if (!err) {
            // 操作成功（读文件成功）
            resolve(data); // 调用resolve方法
            // 调用then()里面的第一个参数函数
        } else {
            reject(err); // 调用reject方法
            // 调用then()里面的第二个参数函数
        }
    });
});

p.then(
    (data) => {
        console.log(data);
    },
    (err) => {
        console.log('---',err);
    }

);