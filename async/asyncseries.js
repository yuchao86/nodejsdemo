const async = require('async');

// create an array of async tasks
var tasks = [];

var feedsToFetch = ['https://www.baidu.com','https://www.sina.com.cn','https://www.taobao.com'];

feedsToFetch.forEach(function (feedUri) {

  // add each task to the task array
  tasks.push(function() {
    var articles = String(Date.now());
    // your operations
    feed(feedUri, function(err, feedArticles) {
      if (err) throw err;
      articles = articles.concat("|"+feedArticles);
      console.log(articles);
    });
  });
});

function feed(feedUri, callback){
  console.log(feedUri);
  callback(null,Date.now());
}
// call async.series with the task array and callback
async.series(tasks, function() {
  //async.parallel(tasks, function() {
 console.log("done !");
});


// void asyncForEach(Array arr, Function iterator, Function callback)
//   * iterator(item, done) - done can be called with an err to shortcut to callback
//   * callback(done)       - done recieves error if an iterator sent one
function asyncForEach(arr, iterator, callback) {

  // create a cloned queue of arr
  var queue = arr.slice(0);

  // create a recursive iterator
  function next(err) {

    // if there's an error, bubble to callback
    if (err) return callback(err);

    // if the queue is empty, call the callback with no error
    if (queue.length === 0) return callback(null);

    // call the callback with our task
    // we pass `next` here so the task can let us know when to move on to the next task
    iterator(queue.shift(), next);
  }

  // start the loop;
  next();
}

// void sampleAsync(String uri, Function done)
//   * done receives message string after 500 ms
function sampleAsync(uri, done) {

  // fake delay of 500 ms
  setTimeout(function() {

    // our operation
    // <= "foo"
    // => "async foo !"
    var message = ["async", uri, "!"].join(" ");

    // call done with our result
    done(message);
  }, 500);
}

tasks = ["cat", "hat", "wat"];

asyncForEach(tasks, function(uri, done) {
  sampleAsync(uri, function(message) {
    console.log(message);
    done();
  });
}, function() {
  console.log("done");
});