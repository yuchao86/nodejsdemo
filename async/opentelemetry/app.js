/* app.js */

const express = require("express");
const http = require('http');

const PORT = process.env.PORT || "8080";
const app = express();

app.get("/", (req, res) => {
    http.get("http://www.baidu.com");
  res.send("Hello World");
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});