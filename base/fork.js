
const child_process = require('child_process');

console.log(" processing");

for(var i =  0; i< 3; i++) {
    var child = child_process.exec('node base/pubsub.js', function(err, stdout, stderr) {
        if(err) {
            console.log(err);
        }
        console.log(stdout,stderr);
    });
    child.on('exit', function(code) {
        console.log(code);
    });
}

for(var i = 0; i< 3; i++) {
    var child = child_process.fork('base/pubsub.js',[i]);
    child.on('close', function(code) {
        console.log(code);
    })
}

