
const bytebuffer = require('bytebuffer');

const bb = new bytebuffer()
            .writeIString('YUchao important message')
            .flip();
console.log(bb.readIString()+" from bytebuffer.js");



console.log("===",bb.toBinary());


const buf = Buffer.from([0x00,0x00,0x45,0x56]);

const mes = buf.readUInt32BE().toString(2);

console.log("----",mes);

const buf1 = Buffer.from([0x12, 0x34, 0x56, 0x78]);
             
console.log(buf1.readUInt32BE(0).toString(16));