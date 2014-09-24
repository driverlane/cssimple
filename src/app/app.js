/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'ipCookie',
	'csRest',
	'browse',
	'login'
]);

angular.module('csDumb').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', { templateUrl: 'views/app.html', controller: 'AppCtl' }).
      when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseCtl' }).
      when('/login', { templateUrl: 'views/login/login.html', controller: 'LoginCtl' }).
      otherwise({ redirectTo: '/login' });
  }]);