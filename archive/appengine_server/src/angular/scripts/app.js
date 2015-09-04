angular.module('disco-biscuit', ['ngRoute', 'Services']).
    config(['$routeProvider', function($routeProvider) {
    /*
     * TODO
     */
    $routeProvider.
        when('/', {
            templateUrl: '/angular/views/hello.html',
            controller: 'HelloController'}).
        when('/goodbye', {
            templateUrl: '/angular/views/goodbye.html',
            controller: 'GoodbyeController'}).
        otherwise({redirectTo: '/'});
}]);
