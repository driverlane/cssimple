/* --------------------------------------------------------------------------------
 Version history
 --------------------------------------------------------------------------------
 0.1 - initial version September 2014 Mark Farrall
 -------------------------------------------------------------------------------- */
	
angular.module('sandpit').controller('SandpitController', function($scope, csLogin) {

	$scope.message = 'Budgie';
	
	var login = csLogin.showLogin();
	
	login.result.then(function(result) {
		$scope.message = result;
	},
	function() {
		$scope.message = 'dismissed';	
	});
	
});
