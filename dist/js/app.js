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
	
angular.module('browse').controller('BrowseCtl', function($scope, csFactory) {

	// test harness until I can get the REST API connected
	$scope.nodes = csFactory.getChildren(2000);

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRest', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRest').factory('csFactory', function() {

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
		getChildren: getChildren
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('login', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('login').controller('LoginCtl', function($scope, $location) {

	var login = {};
	
	// try single signon if it hasn't failed previously
	if ($scope.ssoSupported) {
		login.status = 'Attempting single sign on';
	}
	else {
		login.status = 'Please enter your user details';
	}

	// sso loaded so cancel
	window.ssoLoaded = function() {
		alert('sso finished');
	};
	
});

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
/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csDumb').controller('AppCtl', function($scope, $location, csFactory) {

	// config - move to separate file/module?
	$scope.singleSignonPath = '/otcs/cs.exe';
	$scope.apiPath = '/otcs/cs.exe/api/v1';
	$scope.startingParent = 2000;

	// set up the initial scope variables
	$scope.ssoSupported = true;
	
	if ($scope.authenticated) {
		$location.path('browse');
	}
	else {
		$location.path('login');
	}

});