/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseCtl', function($scope) {

	// test harness until I can get the REST API connected
	$scope.nodes = [
		{'name': 'Sandpit', 'sub_type': 'Folder'},
		{'name': 'System Configuration', 'sub_type': 'Folder'},
		{'name': 'First document', 'sub_type': 'Document'},
		{'name': 'README.txt', 'sub_type': 'Document'}
	];

});
