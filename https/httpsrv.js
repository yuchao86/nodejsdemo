const http = require("http");
const agent = new http.Agent({ keepAlive: true });

// 从 Node.js 8 开始，服务器的 keep-alive 默认 5 秒超时
http
  .createServer((req, res) => {
    res.write("hello world");
    res.end();
  })
  .listen(8080);

console.log('server listening on port 8080 successfully');