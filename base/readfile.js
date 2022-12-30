const lineByLine = require('n-readlines');
const liner = new lineByLine('./base/readme.txt');

let line;
let lineNumber = 0;
 
while (line = liner.next()) {
    console.log('Line ' + lineNumber + ': ' + line.toString('ascii'));
    lineNumber++;
}
 
console.log('end of line reached');