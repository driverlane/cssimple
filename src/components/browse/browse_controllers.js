/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($rootScope, $scope, $routeParams, $location, csRepository, $modal) {

	/* --- variables --- */
	var startNode = 2000;
	if (typeof $rootScope.startNode !== 'undefined') { startNode = $rootScope.startNode; }
	$scope.containerId = $routeParams.id;
	$scope.docSource = '/kiosk/';

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
		switch(node.type.toString()) {
			case '0':
				$location.path('browse/' + node.id);
				break;
			case '144':
			
				// todo open this in the viewer
				//$scope.docSource = "/otcs/cs.exe/46099/Resonate_KT_%2D_WebReports_Workflow_Extensions_10%2E0%2E1_Release_Notes.pdf?func=doc.Fetch&nodeid=46099";
				$scope.docSource = '/otcs/cs.exe/fetch/2000/Resonate_KT_-_WebReports_Workflow_Extensions_10.0.1_Release_Notes.pdf?nodeid=46099&vernum=-2';
				$scope.$watch('docSource', function() {
					$modal.open({
						templateUrl: './views/browse/docViewer.html',
						controller: 'BrowseController',
						size: 'lg'
					});
				});
				
				break;
			default:
				console.log('open not supported yet');
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
	
	// closes the docViewer dialog
	$scope.docViewerClose = function () {
		$modal.close('closed');
	};

	/* --- controller logic --- */
	
	// check the id, if none use default
	if (!$scope.containerId) {
		$scope.containerId = startNode;
	}

	// get the details for the current id
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
		
		// get the breadcrumbs for the current id
		csRepository.getAncestors(data)
		.then(function(crumbs) {
			$scope.crumbs = crumbs;
		});
		
	});
	
	// get the children for the current id
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

});

angular.module('browse').controller('DocViewerController', function($scope, $modalInstance) {

	$scope.login = function () {
	
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});
