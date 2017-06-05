angular.module('fipe').controller('BuscaController', BuscaController);

function BuscaController($scope, $http){
    $scope.entradaMarca = '';
    $scope.marcas = null;
    $scope.modelos = null;
    $scope.codigoMarca = null;
    $scope.codigoAno = null;
    $scope.modeloAno;
    $scope.filtro;
    $scope.teste1;
    $scope.teste;
    $scope.resultado;

    $scope.inicializar = inicializar;
    $scope.buscar = buscar;
    $scope.buscarAno = buscarAno;
    $scope.buscarResultado = buscarResultado;

    function buscar(){
        for(var i in $scope.marcas){
            var marca = $scope.marcas[i];

            if(marca.nome.toLowerCase() == $scope.entradaMarca.toLowerCase()){
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
            url: 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas'
        }

        $http(parametros).then(respostaSucesso, respostaErro);
    }

    function respostaSucesso(resposta){
        $scope.marcas = resposta.data;
        // console.log($scope.marcas);
    }

    function respostaErro(){

    }

    inicializar();

    function buscarAno(v){
        var parametros = {
            method: 'GET',
            url: 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas' + '/' + $scope.codigoMarca + '/modelos' + '/' + $scope.teste + '/anos'
        }

        $http(parametros).then(codigoModeloSucesso, codigoModeloErro);
    }

    function codigoModeloSucesso(resposta){
        $scope.codigoAno = resposta.data;
        $scope.listaCodigoAno = [];
        for(i in $scope.codigoAno){
            var obj = {
                nome: $scope.codigoAno[i].nome,
                codigo: $scope.codigoAno[i].codigo
            }
            $scope.listaCodigoAno.push(obj);
        }
        // console.log($scope.listaCodigoAno.nome);
    }

    function codigoModeloErro(){
        console.log('Erro');
    }

    function buscarResultado(){
        var parametros = {
            method: 'GET',
            url: 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas' + '/' + $scope.codigoMarca + '/modelos/' + $scope.teste + '/anos/' + $scope.teste1
        }

        $http(parametros).then(resultadoSucesso, resultadoErro);
    }

    function resultadoSucesso(resposta){
        $scope.resultado = resposta.data;
    }

    function resultadoErro(){
        console.log('Erro');
    }
}
