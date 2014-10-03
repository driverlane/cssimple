/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').service('viewer', function($modal) {

	var showViewer = function(source) {
		return $modal.open({
                templateUrl: './views/browse/viewer.html',
                controller: 'ViewerController',
				size: 'lg',
                resolve: {
                    source: function () {
                        return angular.copy(source);
                    }
                }
            });
	};
	
	return {
		showViewer: showViewer
	};
	
});
