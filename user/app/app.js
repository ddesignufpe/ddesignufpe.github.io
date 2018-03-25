angular
    .module('dDesign', [
        'ui.router',
        'angular-page-loader'
    ])
    .run(['$rootScope', function($rootScope){
        $rootScope.apiRoute = 'http://192.168.25.81:3030';
    }])