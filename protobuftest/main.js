
var basepb = require('./pb/api_common_pb');
//var RSA = require('hybrid-crypto-js').RSA;
//var rsa = new RSA({entropy:saltEntropy});
var Crypt = require('hybrid-crypto-js').Crypt;

var saltEntropy = Math.random(1000,9999);
var crypt = new Crypt({entropy:saltEntropy,
                aesStandard:'AES-CBC',
                rsaStandard:'RSA-OAEP',});

var privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\n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\r\n-----END RSA PRIVATE KEY-----\r\n';
var publicKey ='-----BEGIN PUBLIC KEY-----\r\nMIICIjANBgkqhkiG9w0BAQEFAgEA1t\r\nJa0kT6E2EHGz7avKmo5P+MDqqJqHTCRgDz/Gfn2M3wBTK0JbXBKGWpOe8YEH3/CY\r\nJTLdMrPceA9AnumMvPVMOk02jlmz+eKn8zW0EUx6egF8yF1TcLVKQcxR//nbAZEY\r\n5YqRs1q6yL35s62ZY5W+ZvaaBFYMXPHMYEunrDBWwlvuyK2WRYDlKd+ELY+6OcvC\r\nJBBkT0SNwBVxz0mNXaqGrv5U9kcSES6RRJjAXd4PokDcn3kXfYps7cPDPjqLovRB\r\n46bsnDms1G4bU/mty6o2i2HJSkmjmqanSlKj2fcm3PGizML7dSTHZZSeQ2tlTmh5\r\n1QiqTwOTY9cR4sDKEP/+ylEKAvqFXFwH3uIL8SUTeUqr9JlDjIA6NVIr7pRzRdqI\r\nYKP68iFWh2Han4NFvlObfKrxI6XtqhYabRJ5CXA2cAd4zRVCDrMacz76TjbUKVPC\r\nbUIR8d+cS91qi+0By4w12SC8+c1pt6ZHWOhLH8+Rp1JThpibJVXXqj63zmGdY9j6\r\n0envsLKy9oEfGZiB8CtEFj5kHVujcufXvslLJkHj7NlZfpoqm5d/rtxELmg3aazS\r\nEi4FdF94hHnW/DasrFP1GiOTAh+0+s9y80PDQVgikpe9k1ieICgHUpM5EmWDndAU\r\nf6wE/PR/1ERPH8/ODFr3Mo0CAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n';

var message = new basepb.requestModel();
message.setMsg("hello,yuchao ,youku ");
message.setCode("200");
message.setData("beijing");
var bytes = message.serializeBinary(); 
console.log("1=:",bytes);
var encryptedBytes = crypt.encrypt(publicKey,bytes);
console.log("encrypt=:",encryptedBytes);

var decrypted = crypt.decrypt(privateKey, encryptedBytes);
// Get decrypted message
var msg = decrypted.message;
var msgarr = msg.toString().split(',');
console.log("decrypt msg=",msgarr);
var message2 = basepb.requestModel.deserializeBinary(new Uint8Array(msgarr));
console.log("2=:",message2);
console.log("3=:",message2.array.length);