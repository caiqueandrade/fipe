angular.module('fipe').controller('BuscaController', BuscaController);

function BuscaController($scope, $http){
    $scope.entradaMarca = '';
    $scope.marcas = null;
    $scope.modelos = null;
    $scope.codigoMarca = null;
    $scope.filtro;
    $scope.teste;

    $scope.inicializar = inicializar;
    $scope.buscar = buscar;

    function buscar(){
        for(var i in $scope.marcas){
            var marca = $scope.marcas[i];

            if(marca.nome == $scope.entradaMarca){
                $scope.codigoMarca = marca.codigo;
            }
        }

        var parametros = {
            method: 'GET',
            url: 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas' + '/' + $scope.codigoMarca + '/modelos'
        }

        $http(parametros).then(modeloSucesso, modeloErro);
    }

    function modeloSucesso(respostaModelo){
        $scope.modelos = respostaModelo.data.modelos;
        $scope.listaModelo = [];
        for(var i in $scope.modelos){
            var obj = {
                nome: $scope.modelos[i].nome,
                codigo: $scope.modelos[i].codigo
            }

            $scope.listaModelo.push(obj);
            // console.log(obj.codigo);
        }

        $scope.anos = respostaModelo.data.anos;
        $scope.listaAnos = [];
        for(var i in $scope.anos){
            var obj = {
                nome: $scope.anos[i].nome,
                codigo: $scope.anos[i].codigo
            }

            $scope.listaAnos.push(obj);
            // console.log(obj.codigo);
        }


    }

    function modeloErro(){
        console.log('Erro');
    }

    function inicializar(){
        var parametros = {
            method: 'GET',
            url: 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas'// + '/' + $scope.codigoMarca + '/modelos'
        }

        $http(parametros).then(respostaSucesso, respostaErro);
    }

    function respostaSucesso(resposta){
        $scope.marcas = resposta.data;
        console.log($scope.marcas);
    }

    function respostaErro(){

    }

    inicializar();

    $scope.buscarAno = function(v){

        console.log($scope.teste)
    }
}
