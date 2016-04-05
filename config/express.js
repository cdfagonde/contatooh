// config/express.js
var load = require( 'express-load' );

// no topo do script, abaixo do express-load
var bodyParser = require ( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var passport = require ( 'passport' );
var express = require( 'express' );

helmet = require ( 'helmet' );

module.exports = function() { 
   var app = express();

   // variável de ambiente
   app.set( 'port', 3000 );

   // abaixo do middleware express.static, definições relacionadas com ejs
   app.set( 'view engine', 'ejs' );
   app.set( 'views', './app/views' );

   // novos middlewares
   app.use( bodyParser.urlencoded ({ extended : true }));
   app.use( bodyParser.json ());
   app.use( require( 'method-override' )());

   // middleware
   app.use( express.static( './public' ));

   app.use( cookieParser());
   app.use( session(
     { secret : 'homem avestruz',
       resave : true,
       saveUninitialized : true
     }
   ));
   app.use( passport.initialize());
   app.use( passport.session());
   app.use( helmet());

   // Com express-load, nao precisaremos mais..
   // home( app );
   load( 'models', { cwd : 'app' })
       .then( 'controllers' )
       .then( 'routes' )
       .then( 'routes/auth.js' )
       .into( app );

   // se nenhum rota atender, direciona para página 404
   app.get( '*', function( req,res ) {
      res.status( 404 ).render( '404' );
   });

   return app;
};