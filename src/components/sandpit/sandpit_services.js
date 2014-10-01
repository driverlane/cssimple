


angular.module('sandpit').service('docViewer', function($modal) {

	var showDocViewer = function() {
		return $modal.open({
			templateUrl: './views/browse/docViewer.html',
			controller: 'BrowseController',
			size: 'lg'
		});
	};
	
	return {
		showLogin: loginDialog
	};
	
});

