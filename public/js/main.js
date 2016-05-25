// public/js/main.js

angular.module( 'contatooh', [ 'ngRoute','ngResource','meusComponentes' ])
.config( function( $routeProvider, $httpProvider ) {

	$httpProvider.interceptors.push( 'meuInterceptor' );

	$routeProvider.when( '/auth', {
		templateUrl : 'partials/auth.html'
	});

	$routeProvider.when( '/contatos', {
		templateUrl : 'partials/contatos.html',
		controller : 'contatosController'
	});

	$routeProvider.when( '/contato/:contatoId', {
		templateUrl : 'partials/contato.html',
		controller : 'contatoController'
	});

	$routeProvider.when( '/contato', {
		templateUrl : 'partials/contato.html',
		controller : 'contatoController'
	});

	$routeProvider.otherwise({ redirectTo : '/contatos' });
});