"use strict";

const { read } = require("fs");

const EventEmitter = require("events").EventEmitter;

class MyEventEmitter extends EventEmitter {
};

const myEventEmitter = new MyEventEmitter();

myEventEmitter.on("topic", function yuchao(topic) {
    console.log("called");

});
myEventEmitter.on("topic", function yuchao1(topic) {
    console.log("called1");

});
myEventEmitter.on('topic', () => {
    console.log("called2");
});

myEventEmitter.once("topic", function www(once) {
    console.log("only called once", once);
});

//myEventEmitter.removeListener(eventName, callback)
//myEventEmitter.removeAllListener(eventName, callback)

// myEventEmitter.emit("topic", function (topic) {
//     console.log("+++", topic);
// });


myEventEmitter.listeners("topic").forEach(function (listener) {
    console.log(listener);
});
myEventEmitter.on("error", (error) => {
    console.log("1error", error);
})
myEventEmitter.emit("error", new Error(" yuchao error happened"));


console.log(myEventEmitter.eventNames());

setTimeout(function () {
    myEventEmitter.emit("topic", "yuchao");
}, 1000)


myEventEmitter.on('newListener', (eventname, listener) => {
    console.log('newListener==', eventname, listener);
});

myEventEmitter.on('removeListener', (eventname, listener) => {
    console.log('removeListener', eventname, listener);
});

const fs = require('fs');
// const readStreams = fs.createReadStream(__dirname + "/../excel/IronMan.mp4", {
//     highWaterMark: 10000
// });
// readStreams.on('readable', () => {
//     console.log('readStreams fully');
//     readStreams.read();

// })

// readStreams.on('data', (data) => {
//     console.log(data);
// })

const zlib = require('zlib');
const file = __dirname + '/../excel/IronMan.mp4';
fs.readFile(file, (err, buffer) => {
    zlib.gzip(buffer, (err, buffer) => {
        fs.writeFile(file + '.gz', buffer, err => {
            console.log('File successfully compressed');
        });
    });
});


fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.tar.gz'))
    .on('finish',
        () => console.log('File successfully compressed1'));


