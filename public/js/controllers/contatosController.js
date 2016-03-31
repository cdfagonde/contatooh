// public/js/controllers/contatosController.js

angular.module( 'contatooh' ).controller(
	 'contatosController',
	 function( Contato, $scope ) {
	 	$scope.mensagem = { texto: '' };
		$scope.contatos = [];
		$scope.filtro = '' ;
		// var Contato = $resource( '/contatos/:id' );

		function buscaContatos () {
			Contato.query(
				function( contatos ) {
					$scope.contatos = contatos;
					$scope.mensagem = {};
				},
				function( erro ) {
					console.log( erro );
					$scope.mensagem = { texto: 'Não foi possível obter a lista' };
				}
			);
		}
		buscaContatos();

		$scope.remove = function( contato ) {
			console.log( contato );

			// v2
			Contato.delete({ id : contato._id },
				buscaContatos,
				function( erro ) {
					$scope.mensagem = { texto: 'Não foi possível remover o contato' };
					console.log( erro );
				}
			);
		};
	});