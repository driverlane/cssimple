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
