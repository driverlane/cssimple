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
