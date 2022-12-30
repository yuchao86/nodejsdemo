const messages = require("./protos/hello_pb");
const services = require("./protos/hello_grpc_pb");
const grpc = require("grpc");

function sayHello(call, callback) {
    // 创建一个HelloReply的消息
    var reply = new messages.HelloReply();
    // 使用内置的方法setMsg，设置消息里面参数
    // 由于helloreply我们定义的时候，就一个msg，所以这里的方法就是setMsg
    // 假设，我们定义的是code，那么这里的方法就是setCode
    reply.setMsg('Hello ' + call.request.getName());
    // 返回reply消息
    callback(null, reply);
}

// 我们先来看下main函数
function main() {
    var server = new grpc.Server(); // 创建grpc server对象
    // 添加server
    // 这里的server是我们之前在proto中定义的
    // 同时也需要指出每一个rpc路由的handle，比如我们之前在proto中的
    // rpc SayHello (HelloRequest) returns (HelloReply) {}
    // SayHello -> 对应的就是sayHello这个函数，作为handle
    // 注意，s和S，在proto定义中是大写的话，在addService中就是小写
    server.addService(services.HelloYeahService, {sayHello: sayHello});
    // 监听所有地址，绑定5000端口
    // grpc.ServerCredentials.createInsecure() 表示没有做任何认证机制
    // 这里，你可以设置SSL，Google认证机制，都是可以的，具体可以看一下文档
    server.bind('0.0.0.0:5000', grpc.ServerCredentials.createInsecure());
    // 启动服务
    server.start();
}