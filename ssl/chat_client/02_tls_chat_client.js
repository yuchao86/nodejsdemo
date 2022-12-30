var tls = require('tls');
var fs  = require('fs');

var port = 4001;
var host = '192.168.10.147';
var options = {
  key:  fs.readFileSync('client_key.pem'),
  cert: fs.readFileSync('client_cert.pem'),
  rejectUnauthorized: false
};

process.stdin.resume();

var client = tls.connect(port, host, options, function() {
  console.log("client tls connected");
    if(! client.authorized){
        console.log("client denied access:",client.authorizationError);
    }else{
        client.write(" this is client message");
    }
    client.on('data', function(data){
        console.log("get server msg:",data);
    });
  console.log('connected');
  process.stdin.pipe(client, {end: false});
  client.pipe(process.stdout);
});