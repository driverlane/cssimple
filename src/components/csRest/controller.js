/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRest').factory('csFactory', function() {

	var getChildren = function (parentId) {
		return  [
			{'name': 'Sandpit 2', 'sub_type': 'Folder'},
			{'name': 'System Configuration 2', 'sub_type': 'Folder'},
			{'name': 'First document', 'sub_type': 'Document'},
			{'name': 'README.txt', 'sub_type': 'Document'}
		];
    };
	
	var getNode = function (nodeId) {
		return {'name': 'Parent', 'sub_type': 'Folder'};
	};

	// return the public functions
	return {
		getChildren: getChildren
	};
	
});
