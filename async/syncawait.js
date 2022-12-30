function setTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done');
        }, 1000);
    })
}

async function test(callback) {
    let res = await setTime();
    callback(res);
}

test(function (res) {
    console.log(res);
})