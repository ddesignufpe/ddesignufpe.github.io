angular
    .module('dDesign')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'mainController'
            })
            .state('grade', {
                url: '/grade',
                templateUrl: 'views/grade.html',
                controller: 'gradeController'
            })
            .state('docentes', {
                url: '/docentes',
                templateUrl: 'views/docentes.html',
                controller: 'docentesController'
            })
            .state('listagrupos', {
                url: '/listagrupos',
                templateUrl: 'views/listagrupos.html',
                controller: 'listagruposController'
            })
    });