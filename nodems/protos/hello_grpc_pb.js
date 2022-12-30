// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var hello_pb = require('./hello_pb.js');

function serialize_hello_HelloReply(arg) {
  if (!(arg instanceof hello_pb.HelloReply)) {
    throw new Error('Expected argument of type hello.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_HelloReply(buffer_arg) {
  return hello_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hello_HelloRequest(arg) {
  if (!(arg instanceof hello_pb.HelloRequest)) {
    throw new Error('Expected argument of type hello.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_HelloRequest(buffer_arg) {
  return hello_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 定义一个服务HelloYeah
// 其中有个rpc方法叫做 SayHello
// 同时我们可以看到传参为HelloRequest，HelloRequest属于消息
// 返回消息为HelloReply
var HelloYeahService = exports.HelloYeahService = {
  sayHello: {
    path: '/hello.HelloYeah/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: hello_pb.HelloRequest,
    responseType: hello_pb.HelloReply,
    requestSerialize: serialize_hello_HelloRequest,
    requestDeserialize: deserialize_hello_HelloRequest,
    responseSerialize: serialize_hello_HelloReply,
    responseDeserialize: deserialize_hello_HelloReply,
  },
};

exports.HelloYeahClient = grpc.makeGenericClientConstructor(HelloYeahService);
