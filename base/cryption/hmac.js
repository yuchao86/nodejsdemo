
const crypto = require("crypto");

const secret = 'yuchao';
const hashmac = crypto.createHmac('sha256',secret)
        .update("important message ssssss information")
        .digest('base64');
console.log(hashmac);

const cipher = crypto.createCipher("aes192","YUCHAO");

let encrypted = '';
cipher.on('readable', function () {
    const data = cipher.read();
    if (data) encrypted += data.toString('hex');
});
cipher.on('end', function () {
    console.log(encrypted);
});
cipher.write("IMPORTANT message");
cipher.end();


const hash = crypto.createHash("sha256");
hash.update("important message ssssss information");
console.log(hash.digest('base64'));

