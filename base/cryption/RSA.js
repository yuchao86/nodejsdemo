// utils.js
const crypto = require('crypto');
const keys = require('./keys');
const RSAutils = require('./RSAutils');

const plainText = 'THis is gameMsg';

const crypted = RSAutils.encrypt(plainText, keys.publicKey); // 加密
console.log("crypted: ", crypted);
const decrypted = RSAutils.decrypt(crypted, keys.privateKey); // 解密
console.log(decrypted.toString());


let msg = "yuchao protobuf message";
let sign = crypto.createSign("RSA-SHA256")
            .update(msg)
            .sign(keys.privateKey,'hex');

console.log("sign:",sign);

let verify = crypto.createVerify("RSA-SHA256");
verify.update(msg);
let result = verify.verify(keys.publicKey, sign,'hex');
console.log("result:", result);




// crypto.generateKeyPair('rsa', {
//   modulusLength: 4096,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//     cipher: 'aes-256-cbc',
//     passphrase: 'top secret'
//   }
// }, (err, publicKey, privateKey) => {
//   // Handle errors and use the generated key pair.
//     if(err) throw err;
//   console.log("PUBLIC KEY :",publicKey);
//   console.log("PRIVATE KEY:",privateKey);

// });