const grpc = require('@grpc/grpc-js')
const hello_proto = require('./proto')

const Consul = require('consul');


let cnt = 1

function sayHello(call, callback) {
    callback(null, { message: `[${cnt++}] yuchao echo: ` + call.request.message })
}

function main() {
    var server = new grpc.Server()
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello })
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start()
        console.log('grpc server started')        
    })
}

var serviceName = "Hello_Service";

const consul = new Consul({
	host:"127.0.0.1",
	port:8500,
	promisity:true
})
consul.agent.service.register({
	name:serviceName,
	address:"127.0.0.1",
	port:50051
},
function(err,result){
    if(err){
        console.error(err);
    }
    console.log(serviceName + " register succ");
})
main()