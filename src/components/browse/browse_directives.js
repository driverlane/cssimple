/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('objectIcon', function() {

	return {
		restrict: 'A',
		replace: 'false',
		link: function(scope, el, atts) {
			scope.$watch('container', function() {

				var args = atts.objectIcon.split(',');

				// append the object icon class
				var classes = '';
				switch(args[0]) {
					case '141':
						classes = 'fa-home';
						break;
					case '0':
						classes = 'fa-folder-open';
						break;
					case '144':
						classes = 'fa-file-pdf-o';
						break;
					default:
						classes = 'fa-bars';
						break;
				}
				
				// combine the classes
				if (args[1] == 'browse') {
					classes = 'browse-icon fa ' + classes  + ' fa-2x';
				}
				else {
					classes = 'browse-container-name-icon fa ' + classes  + ' fa-3x';
				}
				
				// update the attributes
				el.attr('class', classes);
				el.removeAttr('browse-icon');

			});
		}
	};

});

/* glyphicons version

			var classes = 'browse-icon glyphicon ';
			switch(atts.objectIcon.toString()) {
				case '141':
					classes += 'glyphicon-home';
					break;
				case '0':
					classes += 'glyphicon-folder-close';
					break;
				case '144':
					classes += 'glyphicon-list-alt';
					break;
				default:
					classes += 'glyphicon-cog';
					break;
			}

*/