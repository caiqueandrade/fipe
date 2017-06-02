angular.module('fipe').controller('BuscaController', BuscaController);

function BuscaController($scope, $http){
    $scope.entradaMarca = '';
    $scope.marcas = null;
    $scope.modelos = null;
    $scope.codigoMarca = null;
    $scope.filtro;

    $scope.inicializar = inicializar;
    $scope.buscar = buscar;

    function buscar(){
        for(var i in $scope.marcas){
            var marca = $scope.marcas[i];

            if(marca.nome == $scope.entradaMarca){
                $scope.codigoMarca = marca.codigo;
            }
        }
        // console.log($scope.modelos);



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
            $scope.listaModelo.push($scope.modelos[i].nome);
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
}
