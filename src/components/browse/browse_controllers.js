/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, csRepository) {

	// get the nodes for the starting folder
	$scope.nodes = csRepository.getChildren(2000);

});
