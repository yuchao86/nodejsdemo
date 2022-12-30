var protobuf = require("protobufjs");
const cipher = require('./cipher');


protobuf.load("./base/cryption/gameMsg.proto", function(err, root) {
    if (err)
        throw err;
 
    // Obtain a message type
    var WebsocketMessage = root.lookupType("websocket.WebsocketMessage");
 
    // Exemplary payload
    var payload = { Topic: "weatherstation1.RPC",Body:new Buffer.alloc(15, 'hello the world', 'utf8')};
   
    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = WebsocketMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);
 
    // Create a new message
    var message = WebsocketMessage.create(payload); // or use .fromObject if conversion is necessary
    console.log("message created:",message)
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = WebsocketMessage.encode(message).finish();
    // ... do something with buffer
    console.log("buffer:",buffer);
    console.log("buffer string:",buffer.toString());
    cipher.encrypt(buffer, function (result) {

        encryptData = result.toString();
        console.log('加密数据成功',encryptData);
        cipher.decrypt(encryptData, function (result){
            console.log("decrypt data:",result);
            // Decode an Uint8Array (browser) or Buffer (node) to a message
            var message = WebsocketMessage.decode(result);
            // ... do something with message
            console.log("Topic:"+message.Topic);
            console.log("Body:"+message.Body)
            // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
        });
        
    });

    
});