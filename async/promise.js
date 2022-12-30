
new Promise(function (resolve, reject) {
    resolve('yuchao');
})

const prmis1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('yuchao100');
    }, 1000);
    //reject('reject100');
});

const prmis2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('yuchao200');
    }, 1000);
    //reject('reject200');
});

const prmis3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('yuchao300');
    }, 1000);
    //reject('reject300');
});

Promise.all([prmis1, prmis3, prmis2]).then((value) => {
    console.log('>>>', value);
}).catch((err) => {
    console.log('>>>', err);
}).finally((fi) => {
    console.log('====', fi)

});


function taskA() {
    console.log("Task A");
}
function taskB() {
    console.log("Task B");
}
function onRejected(error) {
    console.log("Catch Error: A or B", error);
}
function finalTask() {
    console.log("Final Task");
}

let promise = Promise.resolve();

promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .finally(finalTask);

function increment(value) {
    return value + 1;
}

function doubleUp(value) {
    return value * 2;
}

function output(value) {
    console.log(value); // => (1 + 1) * 2
}

let promise1 = Promise.resolve(9);

promise1
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function (error) {
        console.error(error); // Promise Chain发生异常时调用
    });