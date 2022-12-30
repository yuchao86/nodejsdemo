const Bull = require('bull')
// 1. 创建队列
const myFirstQueue = new Bull('my-first-queue');
// 2. 绑定任务处理函数
myFirstQueue.process(async (job) => {
  return doSomething(job.data);
});
// 3. 添加任务
(async () => {
    const job = await myFirstQueue.add({
        foo: 'bar'
    });
})();


function doSomething(data) {
    console.log(data);
};

console.log(" queue finished");