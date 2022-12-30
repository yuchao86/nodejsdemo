//httpserver.js 
const http = require('http'); 
const ConsulConfig = require('./consul');
 const consul = new ConsulConfig(); 
 http.createServer(async (req, res) => {
    const {url, method} = req; // 测试健康检查 
    if (url === '/health') { res.end('OK!'); } // 测试动态读取数据 
    if (method === 'GET' && url === '/user/info') 
    { 
            const user = await consul.getUserConfig(); 
            res.end(`你好，我是 ${user.name} 今年 ${user.age}`); 
    } // 测试数据更新 
    if (method === 'POST' && url === '/user') 
    { 
        try { await consul.setUserConfig('age', 18) 
        // 将 age 更改为 18 res.end('OK!'); 
        } catch (err) { console.error(err); res.end('ERROR!'); } 
    } 
 }).listen(3000, 'localhost'); 
 // 192.168.20.193 为我本地的内网 ip，通过 ifconfig 查看