// =========== 测试加/解密模块 =============
const fs = require('fs');
const path = require('path');
const cipher = require('./cipher');


let encryptData = "";
let str = '今年(应是2003年)是我大学毕业满10年的日子,也是我投身IT技术的第10年。';
cipher.encrypt(str, function (result) {

    encryptData = result.toString();
	//fs.writeFile(path.join(__dirname, '/1.txt'), result, function (err) {
		console.log('加密数据写入成功',encryptData);
	//});
});

encryptData = "b6e3adeb7254f624f507db3be841a94aaa99a75f445852e203d7b7f8dff618caf05fd2140a7176446223c56c4ff8be08e2e9d99a58960f0756dc6764c8fe739ccde40d9086b8f22ade822da3a9a2bc98d57ab9b66ba36af7b8852742cdb3e6fd5d327451d583d8b391df6a80efd532b2b586f32e70bf9811ffd905ac83bc2310e9c96f8fcf862e48";

//fs.readFile(path.join(__dirname, '/1.txt'), 'utf8', function (err, info) {
	cipher.decrypt(encryptData, function (result) {
		console.log(result);
		console.log(result===str);
	});

//});
