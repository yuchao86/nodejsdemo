var tls = require('tls');
var fs = require('fs');

var options = {
	// These are necessary only if using the client certificate authentication
	key: fs.readFileSync('client/client.key'),
	cert: fs.readFileSync('client/client.crt'),

	rejectUnauthorized: true,
	// This is necessary only if the server uses the self-signed certificate
	ca: [ fs.readFileSync('ca/ca.crt') ]
};

var cleartextStream = tls.connect(8008, '127.0.0.1', options, function() {
	console.log('client connected',
		cleartextStream.authorized ? 'authorized' : 'unauthorized');
	cleartextStream.setEncoding('utf8');
	if(!cleartextStream.authorized){
		console.log('cert auth error: ', cleartextStream.authorizationError);
	}
	//    console.log(cleartextStream.getPeerCertificate());
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
	console.log(data);
	cleartextStream.write('Hello,this message is come from client!');
	//cleartextStream.end();
});
cleartextStream.on('end', function() {
	console.log('disconnected');
});
cleartextStream.on('error', function(exception) {
	console.log(exception);
});
