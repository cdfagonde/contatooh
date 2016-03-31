// public/js/controllers/contatosController.js

angular.module( 'contatooh' ).controller( 'contatosController',
	function ($scope) {
		$scope.total = 0;
		$scope.filtro = '';
		$scope.contatos = 
		[{ "_id": 1, "nome": "Contato Angular 1", "email": "cont1@empresa.com.br" },
		 { "_id": 2, "nome": "Contato Angular 2", "email": "cont2@empresa.com.br" },
		 { "_id": 3, "nome": "Contato Angular 3", "email": "cont3@empresa.com.br" },
		 { "_id": 4, "nome": "Contato Angular 4", "email": "cont4@empresa.com.br" },
		 { "_id": 5, "nome": "Contato Angular 5", "email": "cont5@empresa.com.br" },
		 { "_id": 6, "nome": "Contato Angular 6", "email": "cont6@empresa.com.br" }];


		$scope.incrementa = function () {
			$scope.total++;
		}
		$scope.incrementaa = function () {
			$scope.total+=10;
		}

		$scope.zero = function () {
			$scope.total = 0;
		}

		$scope.decrementa = function () {
			if ($scope.total > 0)
				$scope.total--;
		}
		$scope.decrementaa = function () {
			if ($scope.total > 10) {
				$scope.total-=10;
			} else {
				$scope.total = 0;
			}
		}
	});