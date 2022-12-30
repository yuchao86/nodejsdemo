const net = require("net");
const { readFileSync } = require("fs");

const port = process.env.NODE_PORT || 3005; // 定义HTTP默认端口或者从NODE_PORT环境变量获取
const key = readFileSync("./ssl_certs/server.key");
const cert = readFileSync("./ssl_certs/server.crt");
const ca = readFileSync("./ssl_certs/server.csr");
const path = "localhost";
const alpn = "hello";
// 创建QUIC UDP IPv4套接字绑定到本地IP端口3005
const server = net.createServer({ endpoint: { port } });


// 密钥和证书来保护新连接，使用虚拟的hello应用协议。
server.listen({ port, path,key, cert, alpn });

server.on("session", (session) => {
    session.on("stream", (stream) => {
        stream.pipe(stream);
    });
});

server.on("listening", () => {
    console.info(`listening on ${port}...`);
    console.info("input content!");
});

//npm run start
//docker run -it --rm  --name quichello  -p 3005:3005  -e NODE_ENV=development  -v $PWD:/data/node/app --entrypoint '/bin/sh'  node-quic  -c 'npm install && npm run start
