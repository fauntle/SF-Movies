const MYSQL_HOST = process.env.SFMOVIES_MYSQL_HOST;
const MYSQL_USER = process.env.SFMOVIES_MYSQL_USER;
const MYSQL_PASSWORD = process.env.SFMOVIES_MYSQL_PASSWORD;
const MYSQL_DB = process.env.SFMOVIES_MYSQL_DB;
const MYSQL_URL = process.env.CLEARDB_DATABASE_URL;

var http = require('http');
var path = require('path');
var express = require('express');
var mysql = require('mysql');

var express_server = express();
express_server.use( express.static( path.join( __dirname, 'assets' ) ) );
var http_server = http.createServer( express_server );
http_server.listen( 8080 );

var pool = mysql.createPool( MYSQL_URL || {
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DB
});

// embarassingly simple API endpoint for searching locations
// only exists due to the failures of the SFData API
express_server.get( '/api/v1/locations', function( req, res ){
	var query = req.query.q || '';
	var limit = parseInt( req.query.limit, 10 ) || 25;
	var sql_query = 'SELECT * FROM movies WHERE title LIKE ? LIMIT ?';
	pool.query( sql_query, [ '%'+ query +'%', limit ], function( err, rows, fields ){
		if( err ) return res.json( 500, [] );
		res.json( rows );
	});
});