/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'csRepository',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	// remove the tester
	'tester',
	'browse'
]);

angular.module('csDumb').config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
		//when('/', { templateUrl: 'views/app.html', controller: 'AppController' }).
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/tester', { templateUrl: 'views/tester/tester.html', controller: 'TesterController' }).
		otherwise({ redirectTo: '/browse' });
}]);
