
//npm install --save stackup
const stackup = require('stackup');



function add(i, j) {
    console.log("i的类型为:" + typeof(i) + "<br/>");
    console.log("j的类型为:" + typeof(j));
    return i + j;
}

function sum() {
    var result = 0;
    for(var index in arguments) {
        result += arguments[index];
    }
    return result;
}

console.log(add(1,1));
console.log(sum(1, 3, 5, 2, 56,'2'));

var i = 0;
var g = {};
var msg = 'yu';

g[i].ddd = function(client, msg) {
    if(msg){
        console.log(msg);
    }
};



console.log(g);

