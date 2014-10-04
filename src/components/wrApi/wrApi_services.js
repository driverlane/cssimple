/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('wrApi').factory('wrApi', function($q, $http) {

	/* --- variables --- */
	var apiConfig = {
		baseUrl: '/otcs/cs.exe',
		getNodeId: '53909',
		getActionsId: '123456',
		getVersionsId: '123456',
		getChildrenId: '123456',
		getAncestorsId: '123456'
	};
	
	/* --- functions --- */
	
	// gets the output from a web report
	var getData = function(report, id) {
		var deferred = $q.defer();
		
		var url = apiConfig.baseUrl + '?func=ll&objId=' + report + '&objAction=RunReport&id=' + id + '&nexturl=';
		$http.get(url)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (msg) {
				defer.reject(msg);
			});
			
		return deferred.promise;
	};
	
	// get the definition for a node
	var getNode = function(id) {
		var deferred = $q.defer();
		
		getData(apiConfig.getNodeId, id)
		.then(function(node) {
			deferred.resolve(node);
		});
		
		return deferred.promise;
	};
	
	// get the actions for a node
	var getActions = function(id) {
		var deferred = $q.defer();
		
		getData(apiConfig.getActionsId, id)
		.then(function(actions) {
			deferred.resolve(actions);
		});		
		
		return deferred.promise;
	};
	
	// get the versions for a node
	var getVersions = function(id) {
		var deferred = $q.defer();
		
		getData(apiConfig.getVersionsId, id)
		.then(function(versions) {
			deferred.resolve(versions);
		});		
		
		return deferred.promise;
	};
	
	// get the children for a node
	var getChildren = function (id) {
		var deferred = $q.defer();

		getData(apiConfig.getChildrenId, id)
		.then(function(children) {
			deferred.resolve(children);
		});		

		return deferred.promise;
    };
	
	// get the ancestors for a node
	var getAncestors = function(node) {
		var deferred = $q.defer();

		getData(apiConfig.getAncestorsId, node.id)
		.then(function(ancestors) {
			deferred.resolve(ancestors);
		});		
				
		return deferred.promise;
	};

	/* -- module public items ---*/
	return {
		getNode: getNode,
		getActions: getActions,
		getVersions: getVersions,
		getChildren: getChildren,
		getAncestors: getAncestors
	};
	
});
