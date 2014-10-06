/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $location, csApi, viewer) {

	/* --- variables --- */
	var browseConfig = {
		startNode: 2000
	};
	$scope.status = {};

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
	
		// open any container objects
		if (node.type === 0) {
		
			// browse to the container
			$location.path('browse/' + node.id);
			return;
		}
		else {
	
			// open the viewer
			viewer.showViewer(node);
			return;
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
			$scope.status.parentLoaded = true;
			
			// get the breadcrumbs for the current id
			csApi.getAncestors(data)
			.then(function(crumbs) {
				$scope.crumbs = crumbs;
				$scope.status.crumbsLoaded = true;
			});
			
		});
		
		// get the children for the current id
		csApi.getChildren($scope.containerId)
		.then(function(data) {
			$scope.nodes = data.data;
			$scope.status.itemsLoaded = true;
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

angular.module('browse').controller('ViewerController', function($scope, $modalInstance, csApi, node) {

	/* --- variables ---*/
	var browseConfig = {
		viewableTypes: [144],
		viewableMimeTypes: ['application/pdf']
	};
	$scope.viewer = {};
	
	// determines whether or not the viewer is supported for this object
	var initViewer = function() {
	
		// is it a supported object type
		if (browseConfig.viewableTypes.indexOf(node.type) >= 0) {
			
			// turn on the viewer
			$scope.viewer.enabled = true;
			
			// is it a viewable mimeTypes
			var versions = csApi.getVersions(node.id)
			.then(function(versions) {
				if(browseConfig.viewableMimeTypes.indexOf(versions.data[versions.data.length - 1].mime_type) >= 0) {
				
					// set the dimensions and turn on the panel
					console.log(window.height);
					$scope.viewer.supportedType = true;
				
					// get the actions for the iframe url
					var actions = csApi.getActions(node.id)
					.then(function(actions) {
						var open = actions.actions.filter(function(command) {
							return command.name === 'Open';
						});
						$scope.source = open[0].url;
						return;
					});

				}
				else {
					$scope.viewer.supportedType = false;
				}
				
			});
			
		}

	};

	$scope.close = function () {
		$modalInstance.close();
	};
	
	/* --- controller logic --- */
	
	// get the node from the service
	$scope.node = (angular.isDefined(node));
	if (!$scope.node)
		$scope.viewer.error = true;
	else
		initViewer();
	
});
