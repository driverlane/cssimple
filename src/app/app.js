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
	// remove the sandpit
	'sandpit',
	'browse'
]);

// globals
// todo - work out whether these should be moved
angular.module('csDumb').run(function($rootScope) {
	$rootScope.singleSignonPath = '/otcs/cs.exe';
	$rootScope.apiPath = '/otcs/cs.exe/api/v1';
	$rootScope.startNode = 2000;
});

angular.module('csDumb').config(['$routeProvider', function($routeProvider, $rootScope) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		// todo remove the sandpit
		when('/sandpit', { templateUrl: 'views/sandpit/sandpit.html', controller: 'SandpitController' }).
		otherwise({ redirectTo: '/browse' });
}]);
