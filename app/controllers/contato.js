// app/controllers/contato.js

module.exports = function( app ) {
	var Contato = app.models.contato;
	var controller = {};

	controller.listaContatos = function( req,res ) {
		// var promise = Contato.find().exec();
		Contato.find().populate( 'emergencia').exec()
			.then(
				function( contatos ) {
					res.json( contatos );
				},
				function( erro ) {
					console.error( erro );
					res.status( 500 ).json( erro );
				}
			);
	};

	controller.obtemContato = function( req,res ) {
		var _id= req.params.id;
		console.log("Consultando ID " + _id);
		Contato.findById( _id ).exec()
			.then(
				function( contato ) {
					if ( !contato ) throw new Error( "Contato não encontrado" );
					res.json( contato );
				},
				function( erro ) {
					console.log( erro );
					res.status( 404 ).json( erro );
				}
			);
	};

	controller.removeContato = function( req,res ) {
		var _id = req.params.id;
		console.log("Excluindo ID " + _id);
		Contato.remove({ "_id" : _id }).exec()
			.then(
				function() {
					res.status( 204 ).end();
				},
				function( erro ) {
					return console.error( erro );
				}
			);
	};

	controller.salvaContato = function( req,res ) {
		var _id = req.body._id;
		if ( _id ) {
			Contato.findByIdAndUpdate( _id, req.body ).exec()
			.then(
				function( contato ) {
					res.json( contato );
				},
				function( erro ) {
					console.error( erro );
					res.status( 500 ).json( erro );
				}
			);
		} else {
			Contato.create( req.body )
			.then(
				function( contato ) {
					res.status( 201 ).json( contato );
				},
				function( erro ) {
					console.log( erro );
					res.status( 500 ).json( erro );
				}
			);
		}
	};

	return controller ;
};