/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb').factory('appConfig', function() {

	var config = {
		title: 'CS Simple'
	};

	var configure = function (custom) {
		if (!custom)
			return;
			
		if (custom.title)
			config.title = custom.title;
	};
	
	return {
		config: config,
		configure: configure
	};

});
