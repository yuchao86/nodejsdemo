
const v8 = require("v8");
v8.setFlagsFromString('--trace_gc');

const heap = v8.getHeapSpaceStatistics();
console.log(heap);
const heapstatus = v8.getHeapStatistics();
console.log(heapstatus);

