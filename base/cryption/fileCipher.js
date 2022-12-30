
// 使用 require 方法加载 fs 核心模块
const fs = require('fs')
const CryptoJS = require('crypto-js');  //引用AES源码js

// 同步读取文件
let contentText = fs.readFileSync('base/cryption/gameMsg.proto','utf-8');
//console.log(contentText);

// AES加密
function Encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse("1234567812345678");  //十六位十六进制数作为密钥
    console.log('key:::',key)
    const iv = CryptoJS.enc.Utf8.parse('8765432187654321');   //十六位十六进制数作为密钥偏移量
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
// AES解密
function Decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse("1234567812345678");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('8765432187654321');   //十六位十六进制数作为密钥偏移量
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

let outStr = Encrypt(contentText);
// 同步写文件
fs.writeFileSync('out.txt',Encrypt(contentText));
fs.writeFileSync('out.obj',Decrypt(outStr));
