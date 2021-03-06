// public/js/controllers/ContatoController.js

angular.module( 'contatooh' ).controller( 'contatoController',
	function ( $scope, $routeParams, Contato ) {
		// var Contato = $resource( '/contatos/:id' );

		if ( $routeParams.contatoId ) {
			Contato.get({ id:$routeParams.contatoId },
				function( contato ) {
					$scope.contato = contato;
				},
				function( erro ) {
					$scope.mensagem = { texto : 'Contato não existe. Novo contato.' };
				}
			);
		} else {
			// $scope.contato = {};
			$scope.contato = new Contato();
		}


		$scope.salva = function () {
			// lógica de salvamento
			$scope.contato.$save()
			.then( function () {
				$scope.mensagem = { texto : 'Salvo com sucesso' };
				// limpa o formulário
				$scope.contato = new Contato();
			})
			.catch( function( erro ) {
				$scope.mensagem = { texto : 'Não foi possível salvar' };
			});

			// Vamos substituir o $watch pelo event bus do AngularJS
			// $scope.btnBackFocus = true;
			$scope.$broadcast( 'contatoSalvo' );
		};

		Contato.query( function( contatos ) {
			$scope.contatos = contatos;
		});
	}
);