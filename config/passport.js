// config/passport.js
var passport = require( 'passport' );
var GitHubStrategy = require( 'passport-github').Strategy;
var mongoose = require( 'mongoose' );
var config = require('./config')();

module.exports = function() {

	// declarando uma variável para nos ajudar
	var githubCallback = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';
	var Usuario = mongoose.model( 'Usuario' );

	passport.use( new GitHubStrategy({
		// clientID : 'e0292448971dc933c588',
		// clientSecret : '588d0566191d2d8f3b1ac3d74926f2c294422219',
		// callbackURL : 'http://localhost:3000/auth/github/callback'
		clientID : config.clientID,
		clientSecret : config.clientSecret,
		callbackURL : githubCallback
	}, function( accessToken , refreshToken , profile , done ) {

		Usuario.findOrCreate(
			{ "login" : profile.username },
			{ "nome" : profile.username },
			function( erro,usuario ) {
				if ( erro ) {
					console.log( erro );
					return done( erro );
				}
				return done( null,usuario );
			}
		);
	}));

	/*
	Chamado apenas UMA vez e recebe o usuário do nosso
	banco disponibilizado pelo callback da estratégia de
	autenticação. Realizará a serialização apenas do
	ObjectId do usuário na sessão.
	*/
	passport.serializeUser( function( usuario,done ) {
		done( null, usuario._id );
	});

	// Recebe o ObjectId do usuário armazenado na sessão
	// Chamado a CADA requisição
	passport.deserializeUser( function( id,done ) {
		Usuario.findById( id ).exec()
			.then( function ( usuario ) {
				done( null,usuario );
			});
		}
	);
};