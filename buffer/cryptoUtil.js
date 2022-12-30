//cryptUtil.js
(function(){
    var xxtea = require('xxtea-node');
    var xxhash = require('xxhashjs');
    const crypto = require('crypto')
    
    
    exports.encrytBuf = function(buf, key){
        var encrypted = xxtea.encrypt(buf, key);
        return encrypted;
    }
    exports.decryptBuf = function(buf, key){
        var dencrypted = xxtea.decrypt(buf, key);
        return dencrypted;
    }    
    exports.hash32 = function(buf, key){
        return xxhash.h32(buf, key);
    }
    
    exports.md5 = function (str) {
        if (str) {
            let _md5 = crypto.createHash('md5')
            return _md5.update(str).digest('hex')
        } else
            return ''
    }
    
    exports.sha1 = function (str) {
        if (str) {
            let _sha1 = crypto.createHash('sha1')
            return _sha1.update(str).digest('hex')
        } else
            return ''
    }
    })();