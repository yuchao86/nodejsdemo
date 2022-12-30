const async = require('async');

let uids = ['11','22','333','444','555','666'];

async.every(uids, (uid, nx2)=>{
    console.log("-----",uid);
});

let times = 5;
async.times(times, (n,nx2) =>{
    console.log(`batch :  ${n} /${times}`);
    console.log("exec succ");
})