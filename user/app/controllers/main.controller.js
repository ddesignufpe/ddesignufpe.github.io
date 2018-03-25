angular
    .module('dDesign')
    .controller('mainController', ['$scope', '$http', function($scope, $http){
        $scope.works = 'Main Works!';
        // const rota = 'http://192.168.25.81:3030';
        // function loadCadeiras() {
        //     $http.get(rota+'/cadeiras')
        //     .then(response => {
        //             console.log(response);
        //             console.log(response.data)
        //     })
        // }
        // loadCadeiras();
    }]);