const Bull = require('bull')
// 1. 创建队列
const myFirstQueue = new Bull('my-first-queue');

// 3. 添加任务
(async () => {
    const job = myFirstQueue.add({
        foo: 'bar'
    });
})();


console.log(" queue finished");