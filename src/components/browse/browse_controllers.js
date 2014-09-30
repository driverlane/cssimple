/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $rootScope, $location, csRepository) {

	/* --- variables --- */
	$scope.containerId = $routeParams.id;

	/* --- functions --- */

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
	
	// returns the icon for an item type
	$scope.getIcon = function(node) {
		if (node) {
			switch(node.type.toString()) {
				case '141':
					return 'fa-home';
				case '0':
					return 'fa-folder-open';
				case '144':
					return 'fa-file-pdf-o';
				default:
					return 'fa-bars';
			}
		}
	};
	
	// returns a basic date
	$scope.setDate = function(date) {
		var newDate = new Date(date);
		return newDate.toDateString();
	};
	
	/* --- controller logic --- */
	
	// check the id, if none use default
	if (!$scope.containerId) {
		$scope.containerId = $rootScope.startNode;
	}

	// get the details for the current id
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
	});
	
	// get the children for the current id
	csRepository.getBreadcrumbs($scope.containerId)
	.then(function(data) {
		$scope.crumbs = data;
	});

	// get the children for the current id
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

});
