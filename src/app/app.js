/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'csApi',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'restangular',
	'browse'
]);

angular.module('csDumb').config(function($routeProvider) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		otherwise({ redirectTo: '/browse' });

});
