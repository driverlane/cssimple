/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('browseIcon', function ($q, $log, csApi) {

	var icons = [
		{ id: '/img/webdoc/folder.gif', icon: 'fa-folder-open'},
		{ id: '/img/webdoc/icon_library.gif', icon: 'fa-home' },
		{ id: '/img/webdoc/appexel.gif', icon: 'fa-file-excel-o' },
		{ id: '/img/webdoc/appgif.gif', icon: 'fa-file-image-o' },
		{ id: '/img/webdoc/appiexpl.gif', icon: 'fa-file-code-o' },
		{ id: '/img/webdoc/appjpeg.gif', icon: 'fa-file-image-o' },
		{ id: '/img/webdoc/apppdf.gif', icon: 'fa-file-pdf-o'},
		{ id: '/img/webdoc/apppoin.gif', icon: 'fa-file-powerpoint-o' },
		{ id: '/img/webdoc/appproj.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/apptaro.gif', icon: 'fa-file-archive-o' },
		{ id: '/img/webdoc/apptext.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/appvisio.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/appword.gif', icon: 'fa-file-word-o'},
		{ id: '/img/webdoc/appxml.gif', icon: 'fa-file-text-o'},
		{ id: '/img/webdoc/appzip.gif', icon: 'fa-file-archive-o'},
		{ id: '/img/project/16project.gif', icon: 'fa-folder-open-o'},
		{ id: '/img/folder_icons/folder1.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder2.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder3.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder4.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder5.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder6.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder7.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder8.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder9.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder10.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder11.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder12.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder13.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder14.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder15.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder16.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder17.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder18.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder19.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder20.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder21.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder22.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder23.gif', icon: 'fa-folder-open'}
	];
	
	// return the icon for the id
	function getIcon(id) {
		
		// set the default icon
		var icon = 'fa-bars';

		// get the icon
		for (var i = 0;i < icons.length; i++) {
			if (icons[i].id === id)
				return icons[i].icon;
		}

		$log.warn('Unknown icon: ' + id);
		return icon;
	}
	
	return {
		restrict: 'A',
		link: function(scope, element, atts){
		
			// update the classes
			scope.$watch('container', function() {
				var id = atts.browseIcon;
				if (id) {
					classes = element.attr('class') + getIcon(id);
					element.attr('class', classes);
				}
			});
		}
	};

});
