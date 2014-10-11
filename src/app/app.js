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

angular.module('csDumb').run(function(appConfig, browseConfig, csApiConfig) {

	// set the title
	/*var appCustom = {
		title: 'A new title'
	};
	appConfig.configure(appCustom);*/

	// configure the browse module
	/*var browseCustom = {
		startNode: 53912
	};
	browseConfig.configure(browseCustom);*/
	
});
