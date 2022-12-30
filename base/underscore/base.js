
const _ = require('underscore');

var number = [0,11,22,13,4,25,16,7,18,9];

_.each(number, function(number) {
    console.log(number +1);
});

var num = _.map(number, function(number) {return number*3;});
console.log(num);

var evens = _.filter(number, function(number) {return number%2 === 1;});
console.log(evens);

if(_.contains(number,3)){
    number[3] = 1;
}
console.log(number);
var oden = _.find(number, function(number) {return number%2 === 0;});
console.log(oden);

var groupby = _.groupBy(number, function(number) {return number;});
console.log(groupby);
number = _.shuffle(number);
console.log(number);
var sortby = _.sortBy(number, function(number) {return number;});
console.log(sortby);

var myfun = _.bind(console.log, console);
_.delay(myfun,1000,'yuchao');

function print(){
    var time = new Date().getTime();
    console.log("print function:",time)
}
var now = new Date().getTime();
console.log("T1 now:",now);
var throttled = _.delay(print, 1000);
console.log("result:",throttled);

console.log("diff time:",1667204710965-1667204709951);
