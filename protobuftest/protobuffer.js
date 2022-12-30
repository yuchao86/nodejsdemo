
var searchpb = require('./pb/search_req_pb');
var Crypt = require('hybrid-crypto-js').Crypt;

var saltEntropy = Math.random(1000,9999);
var crypt = new Crypt({entropy:saltEntropy,
                aesStandard:'AES-CBC',
                rsaStandard:'RSA-OAEP',});

var privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\nMIIJKAIBAAKCAgEA1t6LreeZXKQdaSZsdnzUK8UchCAZ1UljVqOeRAhi/a44XgAB0xXVk48P4NIM=\r\n-----END RSA PRIVATE KEY-----\r\n';
var publicKey ='-----BEGIN PUBLIC KEY-----\r\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AGz7avKmo5P+MDqqJqHTCRgDz/Gfn2M3wBTK0JbXBKGWpOe8YEH3/CY\r\nJTLdMrPceA9AnumMvPVMOk02jlmz+eKn8zW0EUx6egF8yF1TcLVKQcxR//nbAZEY\r\n5YqRs1q6yL35s62ZY5W+ZvaaBFYMXPHMYEunrDBWwlvuyK2WRYDlKd+ELY+6OcvC\r\nJBBkT0SNwBVxz0mNXaqGrv5U9kcSES6RRJjAXd4PokDcn3kXfYps7cPDPjqLovRB\r\n46bsnDms1G4bU/mty6o2i2HJSkmjmqanSlKj2fcm3PGizML7dSTHZZSeQ2tlTmh5\r\n1QiqTwOTY9cR4sDKEP/+ylEKAvqFXFwH3uIL8SUTeUqr9JlDjIA6NVIr7pRzRdqI\r\nYKP68iFWh2Han4NFvlObfKrxI6XtqhYabRJ5CXA2cAd4zRVCDrMacz76TjbUKVPC\r\nbUIR8d+cS91qi+0By4w12SC8+c1pt6ZHWOhLH8+Rp1JThpibJVXXqj63zmGdY9j6\r\n0envsLKy9oEfGZiB8CtEFj5kHVujcufXvslLJkHj7NlZfpoqm5d/rtxELmg3aazS\r\nEi4FdF94hHnW/DasrFP1GiOTAh+0+s9y80PDQVgikpe9k1ieICgHUpM5EmWDndAU\r\nf6wE/PR/1ERPH8/ODFr3Mo0CAwEAAQ==\r\n-----END PUBLIC KEY-----\r\n';

var search_req = new searchpb.SearchRequest();
search_req.setQuery("yuchao");
search_req.setAvailable(true);
search_req.setDistance(123.23);
search_req.setLocation(1112.11);
search_req.setOffset(8);
search_req.setPageNumber(1);
search_req.setResultPerPage(2);
//search_req.setExtraData(12);

var bytes = search_req.serializeBinary(); 
console.log("1=:",bytes);
var encryptedBytes = crypt.encrypt(publicKey,bytes);
console.log("encrypt=:",encryptedBytes);

var decrypted = crypt.decrypt(privateKey, encryptedBytes);
// Get decrypted message
var msg = decrypted.message;
var msgarr = msg.toString().split(',');
console.log("decrypt msg=",msgarr);
var message2 = searchpb.SearchRequest.deserializeBinary(new Uint8Array(msgarr));
console.log("2=:",message2);
console.log("3=:",message2.array.length);


function toBytes(encoding){
    var bytes = [];
    var buff = new Buffer.alloc(this, encoding);
    for(var i= 0; i< buff.length; i++){
      var byteint = buff[i];
      bytes.push(byteint);
    }
    return bytes;
}