const net = require("net");
const { readFileSync } = require("fs");

const port = process.env.NODE_PORT || 3005; // 定义HTTP默认端口或者从NODE_PORT环境变量获取
const key = readFileSync("./ssl_certs/server.key");
const cert = readFileSync("./ssl_certs/server.crt");
const ca = readFileSync("./ssl_certs/server.csr");
const servername = "localhost";
const alpn = "hello";

// const socket = net.createConnection({
//     client: {
//         key,
//         cert,
//         ca,
//         requestCert: true,
//         alpn,
//         servername,
//     },
// });

const req = net.connect({
    address: servername,
    port,
    client: {
        key,
        cert,
        ca,
        requestCert: true,
        alpn,
        servername,
    },
});
req.on("secure", () => {
    const stream = req.openStream();
    // stdin -> stream
    process.stdin.pipe(stream);
    stream.on("data", (chunk) =>
        console.success("client(on-secure): ", chunk.toString())
    );
    stream.on("end", () => console.info("client(on-secure): end"));
    stream.on("close", () => {
        console.warn("stream is closed!");
        socket.close();
    });
    stream.on("error", (err) => console.error(err));
});