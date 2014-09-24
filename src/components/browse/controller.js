/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseCtl', function($scope, csFactory) {

	// test harness until I can get the REST API connected
	$scope.nodes = csFactory.getChildren(2000);

});
