


var arr1 = new Array(100)
for (var i = 0; i < arr1.length; i++) {
  arr1[i] = i
}
console.log(arr1)



var params = [];
params.push("yu","chao");
params.push("beijing");
console.log(params);

var obj = {};
obj["yu"] = "chao";

console.log(obj);

let json = '{"type": 1, "ad_type": 0, "bid_type": 0, "sub_type": 5, "day_budget": 0, "advertiser_id": 12495150, "campaign_name": "捕鱼大咖-Android-捕鱼大咖-Android-2", "day_budget_schedule": "[]"}';

let jsonObj = JSON.parse(json);
console.log(jsonObj);

for(var key in jsonObj){
    console.log(key);
    console.log(jsonObj[key]);
}
const _ = require('underscore');
var arr = [12,32,22,3,4,1,16];
var shuffled = _.shuffle(arr);
var count = 3;
 var newarr = shuffled.slice(0,count);

console.log(newarr);
