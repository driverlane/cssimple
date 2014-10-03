/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csApi').controller('LoginController', function($scope, $modalInstance, $timeout, csApi, ssoConfig) {

	/* --- variables --- */
	$scope.message = {};
	$scope.message.text = 'Please enter your user name and password to continue';
	$scope.user = {};

	/* --- functions --- */
	
	// lets the timer know the sso iframe has loaded
	window.ssoLoaded = function() {
		$scope.ssoStatus = false;
	};

	$scope.login = function () {
	
		// validate
		if (typeof $scope.user.name === 'undefined' || typeof $scope.user.password === 'undefined') {
			$scope.message.status = 'warn';
			return;
		}
		else {
			$scope.message.status = 'none';
		}
		
		// attempt a login
		$scope.message.text = 'Logging in...';
		var details = {
			username: $scope.user.name,
			password: $scope.user.password,
			apiPath: $scope.ssoConfig.apiPath,
			expiry: $scope.ssoConfig.expiry
		};		
		csApi.init(details).
		then(function() {
			$modalInstance.close('authenticated');
		},
		function(mesage){
			$scope.message.status = 'error';
			$scope.message.text = 'Login failed, please try again';
			return;
		});

	};

});
