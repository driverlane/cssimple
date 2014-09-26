/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').controller('LoginController', function($scope, $modalInstance, $timeout) {

	$scope.status = ' ';
	$scope.userError = false;

	/* sso functionality */
	
	$scope.ssoPath = '';
	// todo - get this from the service
	$scope.ssoStatus = false;

	// lets the timer know the sso iframe has loaded
	window.ssoLoaded = function() {
		$scope.ssoStatus = false;
	};

	// load the sso iframe if sso is enabled
	if ($scope.ssoStatus) {
		$scope.status = 'Attempting single sign on';
		// todo - get this from the service
		$scope.ssoPath = "/otcs/cs.exe";
	}
	else {
		$scope.status = 'Please enter your user name and password to continue';
	}
	
	/* login functionality */
	
	$scope.user = {};
	$scope.login = function () {
	
		// validate
		if (typeof $scope.user.name === 'undefined' || typeof $scope.user.password === 'undefined') {
			$scope.userError = true;
			return;
		}
		else {
			$scope.userError = false;
		}
		
		// attempt a login
		$scope.status = 'Logging in...';
		// todo - perform a username password login

		// pretend it's logging in
		$timeout(function() {}, 2000);
		
		// authenticated, so update the status and close
		$scope.status = 'Logging in';
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});
