const { Worker } = require('worker_threads')
const async_hooks = require('async_hooks')
const fs = require('fs')

async_hooks.createHook({
    init (asyncId, type, triggerAsyncId, resource) {
      fs.writeSync(1, `init ${type}(${asyncId}): trigger: ${triggerAsyncId}\n`, resource)
    },
    destroy (asyncId) {
      fs.writeSync(1, `destroy: ${asyncId}\n`);
    }
  }).enable();

let number = 300;

const worker = new Worker("./threads/worker.js", {workerData: {num: number}});

worker.once("message", result => {
    console.log(`${number}th Fibonacci Result: ${result}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log(`It exited with code ${exitCode}`);
})

console.log("Execution in main thread");

/*
const runWorker = (workerData) => {
    return new Promise((resolve, reject) => {
        // 引入 workerExample.js `工作线程`脚本文件
        const worker = new Worker('./threads/worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

const main = async () => {
    const result = await runWorker('hello worker threads')
    console.log(result);
}

main().catch(err => console.error(err))
*/