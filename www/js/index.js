  var db = openDatabase('listaApp','1.0','meu banco',5 *1024*1024);
                var sql = "CREATE TABLE IF NOT EXISTS 'itens' ('iditem' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'nome' TEXT, 'valor' REAL, 'qtd' INTEGER, 'total' REAL, 'status' INTEGER )";
                db.transaction(function(tx) {
                      tx.executeSql(sql,[],onSuccess,onError);
                      function onSuccess(tx,rs){
                            console.log(rs)
                            }

                            function onError(tx,msg){
                            console.log(msg)
                            }

                });
                $app = angular.module('app', ['ngRoute', 'ngAnimate','ngSanitize']);
                $app.run(function($rootScope,$sce) {
                });
    //----- Configuração de roteamento
        $app.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
            
            $routeProvider
                // .when('/:gid' ,{controller:'ListaController', templateUrl:'index.html'})
                // .when('/:acao/:id',{templateUrl:'index.html'})
                
                 .when('<xxx></xxx>/:xxx', {
                    controller: "ListaController",
                    templateUrl: "index.html"
                })
                 .otherwise({ redirectTo: '/' })
              
            }]);

                
                $app.controller('ListaController', function($scope, $routeParams,$rootScope){
                    var id = $routeParams.xxx;
                    console.log(id);

                    $scope.lista = {};
                    $scope.Vtotal = function(){
                        $scope.lista.total = $scope.lista.valor * $scope.lista.qtd;
                
                            
                        if($scope.lista.total > 0){
                            return($scope.lista.total);
                        }else{
                            
                        return(0);
                        }

                    }
                    $scope.salvaItem = function(){
                    var Inome =  $scope.lista.nome; 
                    var Ivalor = $scope.lista.valor;
                    var Iqtd = $scope.lista.qtd;
                    var Istatus = 'a';
                    var Itotal = Ivalor * Iqtd;
                    
                       

                        var sql = "INSERT INTO itens ('iditem', 'nome', 'valor', 'qtd', 'total','status') VALUES (NULL,'"+Inome+"','"+Ivalor+"','"+Iqtd+"','"+Itotal+"','"+Istatus+"')";

                        db.transaction(function(tx) {
                        tx.executeSql(sql,[],onSuccess,onError);

                        function onSuccess(tx,rs){
                        console.log(rs)
                        $scope.atulizaLista();
                         
                        }

                        function onError(tx,msg){
                        console.log(msg)
                        }
                        });
                         $scope.reset();

                    }
                     $scope.reset = function() {
                            $scope.lista.nome = angular.copy($scope.master);
                            $scope.lista.valor = angular.copy($scope.master);
                            $scope.lista.qtd = angular.copy($scope.master);
                            $scope.lista.total = angular.copy($scope.master);
                    };

                    $scope.atulizaLista = function(){


                    var sql = "SELECT * FROM itens";

                        db.transaction(function(tx) {
                        tx.executeSql(sql,[],onSuccess,onError);

                        function onSuccess(tx,rs){
                        console.log(rs.rows)
                        var result = arrayDb(rs.rows);
                        $scope.$apply(function(){
                                $scope.lista.item = result;
                                console.log($scope.lista.item) //-result é um array igual ao da consulta, mas pode ser alterado.
                            
                        })
                        }
                        $scope.somaTotal = function(){
                                var s = 0;
                                for (a in $scope.lista.item){
                                    s += $scope.lista.item[a].total;

                                }
                                return(s);
                        }

                        function onError(tx,msg){
                        console.log(msg)
                        }
                    });


                    arrayDb = function(a){
                        var len = a.length
                        var b = new Array();
                        var retorno = new Array();

                        for(var i = 0; i < len; i++){
                        b[i] = a.item(i);
                        }

                        len = b.length;
                        for(var i = 0; i < len; i++){
                        retorno[i] = {};

                        for(indice in b[i]){
                        retorno[i][indice] = b[i][indice];
                        }
                        }
                        return retorno;
                        }

                
                
                    }
                        $scope.atulizaLista();
            })