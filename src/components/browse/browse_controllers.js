/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $location, csApi, viewer) {

	/* --- variables --- */
	var browseConfig = {
		startNode: 2000,
		viewableTypes: [144],
		browseableMimeTypes: ['application/pdf']
	};


	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
	
		// open any container objects
		if (node.container) {
			$location.path('browse/' + node.id);
			return;
		}
		else {
		
			// send it to the viewer if it's a supported type
			if (browseConfig.viewableTypes.indexOf(node.type) >= 0) {
				// todo get the source from the node object
				
				// get the object actions
				var actions = csApi.getActions(node.id)
				.then(function(actions) {
					var open = actions.actions.filter(function(command) {
						return command.name === 'Open';
					});
					viewer.showViewer(open[0].url);
					return;
				});
			}
			// otherwise show the properties
			else {
				console.log('open not supported yet');
			}
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
	
	// loads the page once there's a connection
	var loadPage = function() {
	
		// get the details for the current id
		csApi.getNode($scope.containerId)
		.then(function(data) {
			$scope.container = data;
			
			// get the breadcrumbs for the current id
			csApi.getAncestors(data)
			.then(function(crumbs) {
				$scope.crumbs = crumbs;
			});
			
		});
		
		// get the children for the current id
		csApi.getChildren($scope.containerId)
		.then(function(data) {
			$scope.nodes = data.data;
		});
		
	};
	
	/* --- controller initialisation --- */
	
	// get the current id, if none use default
	$scope.containerId = $routeParams.id;
	if (!$scope.containerId) {
		$scope.containerId = browseConfig.startNode;
	}

	// load the page
	loadPage();

});

angular.module('browse').controller('ViewerController', function($scope, $modalInstance, source) {

	$scope.source = (angular.isDefined(source)) ? source : './views/404.html';

	$scope.close = function () {
		$modalInstance.close();
	};
	
});
