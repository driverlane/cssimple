/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $rootScope, $location, csRepository) {

	// see if we've got an authenticated connection
	if (!csRepository.initialised) {
		// todo authenticate
		
	}
	
	

	// get the container id
	$scope.containerId = $routeParams.id;
	if (!$scope.containerId) {
		$scope.containerId = $rootScope.startNode;
	}

	// get the details for the current container
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
	});
	
	// get the nodes for the current container
	//$scope.nodes = csRepository.getChildren($scope.containerId).data;
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

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
