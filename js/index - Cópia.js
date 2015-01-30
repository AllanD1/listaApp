    var app = angular.module('app', ['ngRoute', 'ngAnimate','ngSanitize', 'ListaController']);


    // var db = openDatabase('listaApp','1.0','meu banco',5 *1024*1024);
    //                 var sql = "CREATE TABLE IF NOT EXISTS 'itens' ('iditem' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'nome' TEXT, 'valor' REAL, 'qtd' INTEGER, 'total' REAL, 'status' INTEGER )";
    //                 db.transaction(function(tx) {
    //                       tx.executeSql(sql,[],onSuccess,onError);
    //                       function onSuccess(tx,rs){
    //                             console.log(rs)
    //                             }

    //                             function onError(tx,msg){
    //                             console.log(msg)
    //             }

    //         }); 

    
    app.run(['$rootScope', '$sce','Config', function($rootScope,$sce,Config,$route) {
    }]);
    //----- Configuração de roteamento
        app.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider){
            
            $routeProvider
                // .when('/:gid' ,{controller:'ListaController', templateUrl:'index.html'})
                // .when('/:acao/:id',{templateUrl:'index.html'})
                
                 .when('/:gid', {
                    controller: "ListaController",
                    templateUrl: "index.html"
                })
              
            }]);

