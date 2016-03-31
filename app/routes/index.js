// app/routes/index.js

module.exports = function( app ) {
	app.get( '/', function( req, res ) {
		var userLogin = '';
		if ( req.user ) {
			userLogin = req.user.login;
		}
		res.render( 'index', { "usuarioLogado" : userLogin });
	});
};