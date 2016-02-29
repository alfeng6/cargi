var cargiApp = angular.module('cargiApp', ['ngRoute']);

cargiApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/dashboard', {
          templateUrl: 'dashboard.html',
          controller: 'RouteController'
        }).
        when('/assistant', {
          templateUrl: 'dashboard.html',
          controller: 'RouteController'
        }).
        otherwise({
          redirectTo: '/'
        });
}]);

module.controller("RouteController", function($scope) {

})