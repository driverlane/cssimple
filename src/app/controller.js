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