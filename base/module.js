const url = require('url');

console.log(url);

var app = {
	name: 'app',
	version: '1.0.0',
	sayName: function(name){
		console.log(this.name);
	}
}
module.exports = app;

var func1 = function() {
    console.log("func1");
 };
  
 var func2 = function() {
    console.log("func2");
 };
   
 exports.function1 = func1;
 exports.function2 = func2;

var CLASS = function(args){
    this.args = args;
}
CLASS.prototype.func = function(){
	console.log(this.name);
}
module.exports = CLASS;


console.log("module",module);
console.log('module.exports',module.exports);
console.log('exports',exports);
