/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

/* Dependencies

	This module is just a wrapper for the other modules. Dependencies can be seen below.	
	
*/

/* Configuration

	There is no configuration for this wrapper, some configuration items for other modules is set below.
	
*/

angular.module('csDumb', [
	'ngRoute',
	'csRepository',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'restangular',
	// remove the sandpit
	'sandpit',
	'browse'
]);

// config
angular.module('csDumb').run(function($rootScope) {

	// config for the browse module
	$rootScope.startNode = 2000;
	
	// config for the csRepository module
	$rootScope.ssoEnabled = false;
	$rootScope.username = 'mark.farrall';
	$rootScope.password = 'p@ssw0rd';
});

angular.module('csDumb').config(['$routeProvider', function($routeProvider, $rootScope) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		// todo remove the sandpit
		when('/sandpit', { templateUrl: 'views/sandpit/sandpit.html', controller: 'SandpitController' }).
		otherwise({ redirectTo: '/browse' });
}]);
