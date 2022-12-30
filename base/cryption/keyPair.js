// var crypto = require("crypto");
// var fs = require("fs");
  
// var now = Math.floor(new Date() / 1000);
// var dir = "rsa-key_" + now;
// fs.mkdirSync(dir);
  
// crypto.generateKeyPair(
//     "rsa",
//     {modulusLength: 2048},
//     (err, publicKey, privateKey) => {
//         fs.writeFile(
//             dir + "/public.pem",
//             publicKey.export({ type: "spki", format: "pem" }),
//             err => {}
//         );
//         fs.writeFile(
//             dir + "/public_key.txt",
//             publicKey.export({ type: "spki", format: "der" }) +
//             "\n",
//             err => {}
//         );
//         fs.writeFile(
//             dir + "/private.pem",
//             privateKey.export({ type: "pkcs1", format: "pem" }),
//             err => {}
//         );
//     }
//   );
  
//   console.log("Public key saved in " + dir + "/public_key.txt");



var cp = require('child_process')
, assert = require('assert');

var privateKey, publicKey;
publicKey = '';
cp.exec('openssl genrsa 2048', function(err, stdout, stderr) {
assert.ok(!err);
privateKey = stdout;
console.log(privateKey);
makepub = cp.spawn('openssl', ['rsa', '-pubout']);
makepub.on('exit', function(code) {
  assert.equal(code, 0); 
  console.log(publicKey);
});
makepub.stdout.on('data', function(data) {
  publicKey += data;
});
makepub.stdout.setEncoding('ascii');
makepub.stdin.write(privateKey);
makepub.stdin.end();  
});