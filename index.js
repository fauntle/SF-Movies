var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');

var ecstatic_server = ecstatic({
	root: path.join( __dirname, 'assets' )
});
var server = http.createServer( ecstatic_server );

server.listen( 8080 );