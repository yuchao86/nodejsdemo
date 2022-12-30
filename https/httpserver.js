var express = require("express");
const http = require('http')
var ejs = require('ejs');

var app = express();

app.engine('html', ejs.renderFile);

app.set("view engine", "html");

app.use(function (req, res, next) {
  res.locals.tableinfo = {
    tablename: "未成功任务列表："
  };
  next();
});



app.get("/", function (req, res) {
  const options = {
    hostname: 'localhost',
    port: 6600,
    path: '/adsense/monitor/task',
    method: 'GET'
  }

  let res1 = null;
  const req1 = http.request(options, res2 => {
    console.log(`状态码: ${res.statusCode}`)

    res2.on('data', d => {
      //console.log(String(d));
      res1 = (String(d));
    })
  })

  req1.on('error', error => {
    console.error(error)
  })

  req1.end()
  var list = JSON.parse(res1);
  res.render("../www/index.html", { title: "我是NodeJs测试", list: list.data });
});

app.listen(8188);

console.log("服务器运行中");