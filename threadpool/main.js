const WorkerPool = require('./WorkerPool.js');
const os = require('os');

const pool = new WorkerPool(os.cpus().length,"taskDemo");
console.log(`cpus length:`, os.cpus().length,"taskDemo");
let finished = 0;
for (let i = 0; i < 16; i++) {
  pool.runTask({ a: 100, b: i }, (err, result) => {
    console.log(i, err, result);
    if (++finished === 10)
      pool.close();
  });
}
