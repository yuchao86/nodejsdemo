

const stackup = require('stackup');

const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('dosomething '),3000);
    })
}

const dosomething = async() => {
    console.log(await doSomethingAsync());
}

console.log('before')
dosomething();
console.log('after');

const aFunction = async() => {
    return '测试a'
}
aFunction().then(
    (message) => {
        console.log(message)
    }
);
const bFucntion = () => {
    return Promise.resolve('测试b')
}
bFucntion().then((resolve) => {
    console.log(resolve)
});

const cFucntion = () => {
    return ('测试c')
}
cFucntion()