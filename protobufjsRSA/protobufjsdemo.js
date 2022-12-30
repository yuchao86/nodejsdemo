
const protobuf = require('protobufjs');
const keys = require('./keys');
const RSAutils = require('./RSAutils');


protobuf.load("msg.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var AwesomeMessage = root.lookupType("user.Login");

    // Exemplary payload
    //var payload = { awesomeField: "AwesomeString" };
    var payload = { username: "yuchao",password: "yuchaopassword" };

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer

    console.log("Buffer:", buffer);
    var msg = buffer.readUInt32BE(0).toString(2);
    console.log("Msg:",msg);
    const crypted = RSAutils.encrypt(buffer, keys.publicKey); // 加密
    console.log("crypted: ", crypted);
    const deBuffer = RSAutils.decrypt(crypted, keys.privateKey); // 解密
    console.log("deBuffer:", deBuffer);

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = AwesomeMessage.decode(deBuffer);
    // ... do something with message

    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = AwesomeMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
    console.log("Object: ",object);
});