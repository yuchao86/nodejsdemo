
var tls = require('tls');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('yuchao-server.pfx'),
  passphrase:'yuchao123',
  rejectUnauthorized: true
};

var socket = tls.connect(8008, options, function() {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', function(data) {
  console.log(data);
});
socket.on('end', function() {
  server.close();
});