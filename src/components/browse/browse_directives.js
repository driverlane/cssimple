/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('viewerSize', function ($window) {

	return function (scope, element) {
	
		scope.height = $window.innerHeight * 0.8;
	
});
