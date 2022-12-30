//============ 加密/解密数据模块 ===========
'use strict';
const crypto = require('crypto');

//------------------ 加密数据 -------------------
let algorithm = 'aes-128-cbc'; // algorithm 是算法的意思

/**
 * @description 加密数据
 * @description params: data--要加密的数据，必须是utf8格式的字符串；callback--处理结果集的回调函数
 * @param data {string}
 * @param callback {function(string)}
 */
let encrypt = function (data, callback) {
	let password = crypto.randomBytes(16).toString('hex');  // password是用于生产密钥的密码
	let salt = crypto.randomBytes(16).toString('hex'); // 生成盐值
	let iv = crypto.randomBytes(8).toString('hex'); // 初始化向量

	crypto.scrypt(password, salt, 16, function (err, derivedKey) {
		if (err) {
			throw err;
		} else {
			let cipher = crypto.createCipheriv(algorithm, derivedKey, iv); 	// 创建 cipher 实例

			// 加密数据
			let cipherText = cipher.update(data, 'utf8', 'hex');
			cipherText += cipher.final('hex');
			cipherText += (password+salt + iv);

			callback(cipherText)
		}
	});

};

/**
 * @description 解密通过 encrypt(); 加密的数据
 * @description param: cipherText--通过 encrypt() 加密的数据; callback--处理结果集的回调函数。
 * @param cipherText {string}
 * @param callback {function(string)}
 */
let decrypt = function (cipherText, callback) {
	let iv = cipherText.slice(-16);  // 获取初始化向量
	let salt = cipherText.slice(-48, -16);  // 获取盐值
	let password = cipherText.slice(-80, -48); // 获取密钥密码
	let data = cipherText.slice(0, -80);  //获取密文

	crypto.scrypt(password, salt, 16, function (err, derivedKey) {
		if (err) {
			throw err;
		} else {
			let decipher = crypto.createDecipheriv(algorithm, derivedKey, iv); 	// 创建 decipher 实例

			// 解密数据
			let txt = decipher.update(data, 'hex', 'utf8');
			txt += decipher.final('utf8');
			callback(txt)
		}
	});
};

//----------- 导出 加密/解密数据模块 --------------
module.exports = {
	encrypt,
	decrypt
};
