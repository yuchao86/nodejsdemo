const { parentPort } = require('worker_threads');
parentPort.on('message', (task) => {
  console.log("task demo:",task);
  parentPort.postMessage(task.a + task.b);
});