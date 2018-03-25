angular
    .module('dDesign')
    .controller('docentesController', ['$scope', function ($scope) {
        $scope.works = 'Docentes Works!';
        $scope.docentes = [
            {nome: "Hans Waechter", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "André Neves", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "Guilherme Ranoya", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "Guilherme Ranoya", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "Guilherme Ranoya", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "Guilherme Ranoya", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"},
            {nome: "Guilherme Ranoya", area: "Design de Informação", bio: "Some quick example text to build on the card title and make up the bulk of the card's content.", email: "hans.waechter@ufpe.br", lattes: "http://lattes.cnpq.br"}
        ];
    }]);