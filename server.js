// contatooh/server.js

var config = require('./config/config')();
var http = require( 'http' );
var express = require ( 'express' );
var app = require( './config/express' )();
require( './config/passport' )();
// require( './config/database.js')( 'mongodb://localhost/contatooh' );
require('./config/database')(config.db);

http.createServer( app ).listen( config.port, config.address, function (){
	// console.log( 'Express Server escutando na porta ' + app.get( 'port' ));
	console.log( 'Express Https Server '
		+ config.address + ' (' + config.env + ') escutando na porta ' + config.port );
});