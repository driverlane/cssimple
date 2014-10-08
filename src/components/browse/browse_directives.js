/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('browseIcon', function ($q, csApi) {

	var objectIcons = [
		{ id: '0', icon: 'fa-folder-open'},
		{ id: '141', icon: 'fa-home'}
	];
	
	var docIcons = [
		{ type: 'application/pdf', icon: 'fa-file-pdf-o'},
		{ type: 'application/msword', icon: 'fa-file-word-o'}
	];

	// return the icon for the object type
	function getClasses(type, id, size) {
		var deferred = $q.defer();
		
		// set the default icon
		var icon = 'fa-bars';

		// set the base font classes
		var classes = size + 'fa fa-2x ';
		if (size === 'browse-container-name-icon ')
			classes = size + 'fa fa-3x ';
		
		// get the icon
		if (type === '144') {
			getDocIcon(id)
			.then(function(docIcon) {
				icon = docIcon;
				classes = classes + icon;
				deferred.resolve(classes);
			});
		}
		else {
			for (var i = 0;i < objectIcons.length; i++) {
				if (objectIcons[i].id === type)
					icon = objectIcons[i].icon;
			}
			classes = classes + icon;
			deferred.resolve(classes);
			
		}
		
		return deferred.promise;
	}
	
	// returns the icon for the mime type
	function getDocIcon(id) {
		var deferred  = $q.defer();
	
		// set the default icon
		var icon = 'fa-file';
		
		var versions = csApi.getVersions(id)
		.then(function(versions) {

			var type = versions.data[versions.data.length - 1].mime_type;
			for (var i = 0;i < docIcons.length; i++) {
				if (docIcons[i].type === type)
					icon = docIcons[i].icon;
			}
			deferred.resolve(icon);
		
		});
		
		return deferred.promise;
	}
	
	return {
		restrict: 'A',
		link: function(scope, element, atts){
		
			// get the arguments
			var args = atts.browseIcon.split(',');
			if (args[0]) {

				// build the new classes
				classes = element.attr('class');
				getClasses(args[0], args[1], classes)
				.then(function(classes) {
				
					// update the classes
					element.attr('class', classes);

				});

			}
		
		}
	};

});
