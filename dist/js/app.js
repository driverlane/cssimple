/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, csRepository) {

	// get the nodes for the starting folder
	$scope.nodes = csRepository.getChildren(2000);

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').controller('LoginController', function($scope) {

	
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').factory('csRepository', function() {

	var initialised = false;
	var apiPath = '';
	var authenticated = false;
	var ssoSupported = true;
	var token = '';

	var getChildren = function (parentId) {
		return  [
			{'name': 'Sandpit 2', 'sub_type': 'Folder'},
			{'name': 'System Configuration 2', 'sub_type': 'Folder'},
			{'name': 'First document', 'sub_type': 'Document'},
			{'name': 'README.txt', 'sub_type': 'Document'}
		];
    };
	
	var getNode = function (nodeId) {
		return {'name': 'Parent', 'sub_type': 'Folder'};
	};

	// return the public functions
	return {
		initialised: initialised,
		apiPath: apiPath,
		authenticated: authenticated,
		ssoSupported: ssoSupported,
		token: token,
		getChildren: getChildren
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('tester', []);

/* --------------------------------------------------------------------------------
 Version history
 --------------------------------------------------------------------------------
 0.1 - initial version September 2014 Mark Farrall
 -------------------------------------------------------------------------------- */
	
angular.module('tester').controller('TesterController', function($scope, $modal) {

	$scope.message = 'Budgie';
	
	var dialog = $modal.open({'templateUrl':'./views/csRepository/login.html'});
	
	$scope.closeDialog	= function(result) {
		dialog.close('ok');
	}
	
});

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

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csDumb').controller('AppController', function($rootScope) {

	// globals - should these be in a config module
	$rootScope.singleSignonPath = '/otcs/cs.exe';
	$rootScope.apiPath = '/otcs/cs.exe/api/v1';
	$rootScope.startingParent = 2000;

});
