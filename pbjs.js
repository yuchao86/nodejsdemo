
let pbroot = require("protobufjs").Root;
let json = require("./out.json");
let root = pbroot.fromJSON(json);

let Message = root.lookupType("websocket.WebsocketMessage");

let msgObj = {topic:"yuchao",body:"Yu Chao"};

let bpmsg = Message.create(msgObj);
console.log(bpmsg);

