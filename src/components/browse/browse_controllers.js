/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $rootScope, $location, csRepository) {

	// see if we've got an authenticated connection
	if (!csRepository.authenticated) {
		// todo authenticate
		
	}

	// get the container node
	var thisnode = $routeParams.id;
	if (!thisnode) {
		thisnode = $rootScope.startNode;
	}

	// get the details for the current container
	$scope.container = csRepository.getNode(thisnode);
	
	// get the nodes for the current container
	$scope.nodes = csRepository.getChildren(thisnode).data;

	// handles the click event for nodes
	$scope.openNode = function(type, id) {
		switch(type) {
			case 'Folder':
				$location.path('browse/' + id);
				break;
			default:
				// todo open this in the viewer
				console.log('open document ' + id);
				break;
		}
	};
});
