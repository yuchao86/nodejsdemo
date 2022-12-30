const xxtea = require('xxtea');
const nodeRSA = require('node-rsa');
const fs = require('fs');

var buf = Buffer.alloc(10);
buf.fill("yuchaomessage");

// console.log("BUF:", buf);
// const encrypted = xxtea.encrypt(buf, "yuchaopassword");

// console.log("encrypted11: ", encrypted);

// const decrypted = xxtea.decrypt(encrypted,"yuchaopassword");

// console.log("decrypted: ", decrypted);

const key = new nodeRSA({b:512});
const keypair = key.generateKeyPair();
const publicKey = keypair.exportKey('public');
const privateKey = keypair.exportKey('private');
console.log("keypair:", publicKey,privateKey);
console.log(key.isPrivate(privateKey));
console.log(key.isPublic());

console.log('keySize:', key.getKeySize());
console.log("MaxMessageSize:", key.getMaxMessageSize());

const text = "YUCHAO Pub-Pri RSA MESSAGE";
const encrypted = key.encrypt(text, 'base64');
console.log("encrypted: ", encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log("decrypted: ", decrypted);

const msg = "YUCHAO Pri-Pub RSA MESSAGE";
const msgEncrypted = key.encryptPrivate(msg,'base64');
console.log("msgEncrypted:", msgEncrypted);
const msgDecrypted = key.decryptPublic(msgEncrypted);
console.log("msgDecrypted:",msgDecrypted);
console.log('msg:',msgDecrypted.toString('utf8'));


const signstr = "YUCHAO SIGN INFORMATION";
const sign = key.sign(signstr, 'base64');
console.log("sign: ", sign);
const verify = key.verify(signstr,sign,'','base64');
console.log("verify:", verify);

const priKey = fs.readFileSync("./rsa_private_key.pem",'utf8');
const pubKey = fs.readFileSync("./rsa_public_key.pem",'utf8');
console.log("priKey: ", priKey);
console.log("pubKey: ",pubKey);


const newKey = new nodeRSA(priKey);
const newPub = newKey.exportKey('public');

console.log("newPub: ", newPub);

const nkey = new nodeRSA();
nkey.importKey(priKey);
const npri = nkey.exportKey('private');
console.log("nPrivate:",npri);
