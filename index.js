var http = require('http');
var path = require('path');
var express = require('express');

var express_server = express();
express_server.use( express.static( path.join( __dirname, 'assets' ) ) );
var http_server = http.createServer( express_server );
http_server.listen( 8080 );