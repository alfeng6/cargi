var cs142App = angular.module('cs142App', ['ngRoute']);

cs142App.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/dashboard', {
          templateUrl: 'dashboard.html',
        }).
        when('/assistant', {
          templateUrl: 'comingsoon.html',
        }).
        otherwise({
          redirectTo: '/'
        });
}]);