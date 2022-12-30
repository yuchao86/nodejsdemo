var async=require("async");
async.series({
    one: function(callback){
        callback(null,1)  ;
    },
    two: function(callback){
        callback(null,2) ;
    }
},function(err, results) {
    console.log(results)
});

// let taskArr = [{taskId:1,taskName:"task1"},{taskId:2,taskName:"task2"},{taskId:3,taskName:"task3"}];

// async.series(taskArr,function(err,results){
//     console.log("-----",results);
// })

//Using Callbacks
async.series([
    function(callback) {
        setTimeout(function() {
            // do some async task
            callback(null, 'ONE');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            // then do another async task
            callback(null, 'TWO');
        }, 100);
    }
], function(err, results) {
    console.log(results);
    // results is equal to ['one','two']
});

// an example using objects instead of arrays
async.series({
    one: function(callback) {
        setTimeout(function() {
            // do some async task
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            // then do another async task
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    console.log(results);
    // results is equal to: { one: 1, two: 2 }
});

//Using Promises
async.series([
    function(callback) {
        setTimeout(function() {
            callback(null, 'One');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'Two');
        }, 100);
    }
]).then(results => {
    console.log(results);
    // results is equal to ['one','two']
}).catch(err => {
    console.log(err);
});

// an example using an object instead of an array
async.series({
    one: function(callback) {
        setTimeout(function() {
            // do some async task
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            // then do another async task
            callback(null, 2);
        }, 100);
    }
}).then(results => {
    console.log(results);
    // results is equal to: { one: 1, two: 2 }
}).catch(err => {
    console.log(err);
});

//Using async/await
async () => {
    try {
        let results = await async.series([
            function(callback) {
                setTimeout(function() {
                    // do some async task
                    callback(null, 'one');
                }, 200);
            },
            function(callback) {
                setTimeout(function() {
                    // then do another async task
                    callback(null, 'two');
                }, 100);
            }
        ]);
        console.log(results);
        // results is equal to ['one','two']
    }
    catch (err) {
        console.log(err);
    }
}

// an example using an object instead of an array
async () => {
    try {
        let results = await async.parallel({
            one: function(callback) {
                setTimeout(function() {
                    // do some async task
                    callback(null, 1);
                }, 200);
            },
           two: function(callback) {
                setTimeout(function() {
                    // then do another async task
                    callback(null, 2);
                }, 100);
           }
        });
        console.log(results);
        // results is equal to: { one: 1, two: 2 }
    }
    catch (err) {
        console.log(err);
    }
}