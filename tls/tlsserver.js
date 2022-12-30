var tls = require('tls');
    var fs = require('fs');
 
    var options = {
        key: fs.readFileSync('server/server.key'),
        cert: fs.readFileSync('server/server.crt'),
 
        // This is necessary only if using the client certificate authentication.
        requestCert: true,
 
        rejectUnauthorized: true,
//    passphrase:'test',
        // This is necessary only if the client uses the self-signed certificate.
        ca: [ fs.readFileSync('ca/ca.crt') ]
        };
 
    var server = tls.createServer(options, function(cleartextStream) {
        console.log('server connected',
            cleartextStream.authorized ? 'authorized' : 'unauthorized');
        cleartextStream.write('this message is come from server!');
        cleartextStream.setEncoding('utf8');
        cleartextStream.pipe(cleartextStream);
        cleartextStream.on('data', function(data) {
        console.log(data);
        });
    });
    server.listen(8008, function() {
        console.log('server bound');
        });