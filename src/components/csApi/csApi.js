/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The csApi module relies on the following: 
	
		* ui.bootstrap.modal module, from the angular-bootstrap library
			bower install angular-bootstrap or https://github.com/angular-ui/bootstrap
		* restangular
			bower install restangular or https://github.com/mgonto/restangular
		
	The csApi module relies on the following other components:
	
		* Bootstrap - css only version for display
			bower install bootstrap-css-only or https://github.com/fyockm/bootstrap-css-only
	
*/

/* Configuration

	The module will check the $rootScope when loaded for configuration options. If they are present
	it will use them. If not it will use the default, if there is one, or request the values from
	the user. Configuration options are:
	
	* apiPath - the path to the REST API - defaults to '/otcs/cs.exe/api/v1/'
	* ssoPath - the path to a single sign on URL for Content Server - defaults to '/otcs/cs.exe'
	* ssoEnabled - whether to try and retrieve the LLCookie ticket from the ssoPath - defaults to true
	* username - the username for system login - no default
	* password - the password for system login - no default
	
*/
	
angular.module('csApi', []);
