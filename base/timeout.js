const http = require("http");
//const agent = new http.Agent({ keepAlive: true });

//const request = require("request");
const Agent = require("agentkeepalive");
const agent = new Agent();

const axios = require('axios');

setInterval(() => {
    // 向给定ID的用户发起请求
    axios.get("http://127.0.0.1:8080")
      .then(function (response) {
        // 处理成功情况
        console.log(response.data);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
        console.log('--------------------------------');
      });
    
},5000)


// 每 5 秒发起一次请求
// setInterval(() => {
//     http.get("http://127.0.0.1:8080", { agent }, res => {
//       res.on("data", (res) => {
//         console.log("response:" + res);
//       })
//       res.on("end", () => {
//         console.log("success");
//       });
//     })
//   }, 5000);

// setInterval(() => {
//     const url = "http://127.0.0.1:8080";
//     const reqInfo = request.get(url, { agent }, (err,res) => {
//       if (!err) {
//         console.log("success");
//         console.log("response:" + res.body);
//       } else if (err.code === 'ECONNRESET' && reqInfo.req.reusedSocket) {
//         // 如果错误码为ECONNRESET，且复用了TCP连接，那么重试一次
//         return request.get(url, (err,res) => {
//           if (err) {
//             throw err;
//           } else {
//             console.log("retry response:" + res.body);
//             console.log("success with retry");
//           }
//         });
//       } else {
//         throw err;
//       }
//     });
//   }, 5000);
  