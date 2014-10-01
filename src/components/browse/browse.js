/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The browse module relies on the following Angular modules:
	
		* ngRoute module, from the core angular library
			bower install angular-route or https://github.com/angular/angular.js
		* csRepository module, from the csDumb client
			https://github.com/markfarrall/csdumb
			
	The browse module relies on the following other components:
	
		* Bootstrap - css only version for display
			bower install bootstrap-css-only or https://github.com/fyockm/bootstrap-css-only
		* Font Awesome - for display of icons
			bower install font-awesome or http://fortawesome.github.io/Font-Awesome/
	
*/

/* Configuration

	The module will check the $rootScope when loaded for configuration options. If they are present
	it will use them. If not it will use the default, if there is one, or request the values from
	the user. Configuration options are:
	
	* startNode - the ID of the fist folder to display - defaults to 2000, i.e. Enterprise workspace
	
*/

angular.module('browse', []);
