/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('browseIcon', function() {

	return {
		restrict: 'A',
		replace: 'false',
		link: function(scope, el, atts) {
			var classes = 'browse-icon fa ';
			switch(atts.browseIcon.toString()) {
				case '141':
					classes += 'fa-home fa-3x';
					break;
				case '0':
					classes += 'fa-folder-open fa-3x';
					break;
				case '144':
					classes += 'fa-file-pdf-o fa-3x';
					break;
				default:
					classes += 'fa-bars fa-3x';
					break;
			}
			el.attr('class', classes);
			el.removeAttr('browse-icon');
		}
	};

});

/* glyphicons version

			var classes = 'browse-icon glyphicon ';
			switch(atts.browseIcon.toString()) {
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