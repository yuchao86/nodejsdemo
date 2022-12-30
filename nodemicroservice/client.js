const hello_proto = require('./proto')
const grpc = require('@grpc/grpc-js')

const Consul = require('consul');

function main() {
    var client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure())
    client.sayHello({ message: 'Hello' }, function(err, response) {
        if (err) {
            console.error('Error: ', err)
        } else {
            console.log(response.message)
        }
    })
}
const consul = new Consul({
	host:"127.0.0.1",
	port:8500,
	promisity:true
})
consul.agent.service.list(function (err, data, res) {
    console.log(data);
  });

main()