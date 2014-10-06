/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').service('viewer', function($modal) {

	var showViewer = function(node) {
		return $modal.open({
                templateUrl: './views/browse/viewer.html',
                controller: 'ViewerController',
                resolve: {
                    node: function () {
                        return angular.copy(node);
                    }
                }
            });
	};
	
	return {
		showViewer: showViewer
	};
	
});
