var tls = require('tls');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('yuchao-server.pfx'),
  passphrase:'yuchao123',

  // This is necessary only if using the client certificate authentication.
  requestCert: true,
  rejectUnauthorized: true

};

var server = tls.createServer(options, function(socket) {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write("welcome!\n");
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8008, function() {
  console.log('server bound');
});