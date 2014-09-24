/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csDumb').controller('AppController', function($rootScope) {

	// globals - should these be in a config module
	$rootScope.singleSignonPath = '/otcs/cs.exe';
	$rootScope.apiPath = '/otcs/cs.exe/api/v1';
	$rootScope.startingParent = 2000;

});
