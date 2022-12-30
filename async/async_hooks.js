// const asyncHooks = require('async_hooks');
// const fs = require('fs');
// const asyncId = () => asyncHooks.executionAsyncId();
// const triggerAsyncId = () => asyncHooks.triggerAsyncId();

// console.log(`Global asyncId: ${asyncHooks.executionAsyncId()}, Global triggerAsyncId: ${triggerAsyncId()}`);

// fs.open('hello.txt', (err, res) => {
//   console.log(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
// });
// const hooks = asyncHooks.createHook({});
// hooks.enable();

// Promise.resolve().then(() => {
//   // Promise asyncId: 7. Promise triggerAsyncId: 6
//   console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
// })

const asyncHooks = require("async_hooks");
const { executionAsyncId } = asyncHooks;
 
// 保存异步调用的上下文。
const contexts = {};
 
const hooks = asyncHooks.createHook({
 // 对象构造时会触发 init 事件。
 init: function(asyncId, type, triggerId, resource) {
  // triggerId 即为当前函数的调用者的 asyncId 。
  if (contexts[triggerId]) {
   // 设置当前函数的异步上下文与调用者的异步上下文一致。
   contexts[asyncId] = contexts[triggerId];
  }
 },
 // 在销毁对象后会触发 destroy 事件。
 destroy: function(asyncId) {
  if (!contexts[asyncId]) return;
  // 销毁当前异步上下文。
  delete contexts[asyncId];
 }
});
 
// 关键！允许该实例中对异步函数启用 hooks 。
hooks.enable();
 
// 模拟业务处理函数。
function handler(params) {
 // 设置 context ，可在中间件中完成此操作（如 Logger Middleware）。
 contexts[executionAsyncId()] = params;
 contexts['trackId'] = params;
  
 // 以下是业务逻辑。
 console.log(`handler ${JSON.stringify(params)}`);
 f();
}
 
function f() {
 setTimeout(() => {
  // 输出所属异步过程的 params 。
  console.log(`setTimeout ${JSON.stringify(contexts[executionAsyncId()])}`);
  console.log('context id'+JSON.stringify(contexts['trackId']));
 });
}
 
// 模拟两个异步过程（两个请求）。
setTimeout(handler, 5, { id: 0 });
setTimeout(handler, 5, { id: 1 });

  