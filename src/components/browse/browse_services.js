/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('browse').factory('browseConfig', function() {

	var config = {
		startNode: 2000,
		viewableTypes: [144],
		viewableMimeTypes: ['application/pdf']
	};

	var configure = function (custom) {
		if (!custom)
			return;
			
		if (custom.startNode)
			config.startNode = custom.startNode;

		if (custom.viewableTypes)
			config.viewableTypes = custom.viewableTypes;

		if (custom.viewableMimeTypes)
			config.viewableMimeTypes = custom.viewableMimeTypes;
	};
	
	return {
		config: config,
		configure: configure
	};

});

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
