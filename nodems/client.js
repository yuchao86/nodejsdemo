const messages = require("./protos/hello_pb");
const services = require("./protos/hello_grpc_pb");
const grpc = require("grpc");

function main() {
    // 创建一个grpc的客户端连接
    // 参数就是地址和认证方式
    // 认证方式要和服务端一致，否则就会导致认证失败
    const client = new services.HelloYeahClient("127.0.0.1:5000", grpc.credentials.createInsecure());
    // 定义请求的对象
    const req = new messages.HelloRequest();
    // 设置请求的内容
    req.setName("terence");
    req.setAge(10);
    // 通过客户端调用服务端的sayHello函数，通过回调知道返回信息
    client.sayHello(req, (err, res) => {
        // 返回的res就是服务端定义的reply
        // 这里获取指定字段的信息就是使用get
        // 比如这里返回的res，要获取里面msg字段，那么就需要使用getMsg()这个方法
        console.log(res.getMsg());
    });
}

main();