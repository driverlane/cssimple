/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
angular.module('csApi').factory('csApi', function($q) {

	/* --- functions --- */
	
	// initialise the connection details
	var init = function (username, password) {
		var deferred = $q.defer();

		deferred.resolve();

		return deferred.promise;
	};
		
	// get the definition for a node
	var getNode = function(id) {
		var deferred = $q.defer();
		
		deferred.resolve({
			
		});
		
		return deferred.promise;
	};
	
	// get the actions for a node
	var getActions = function(id) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', id).one('actions').get()
			.then(function(actions) {
				deferred.resolve(actions);
			});
		});
		
		return deferred.promise;
	};
	
	// get the versions for a node
	var getVersions = function(id) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', id).one('versions').get()
			.then(function(versions) {
				deferred.resolve(versions);
			});
		});
		
		return deferred.promise;
	};
	
	// get the children for a node
	var getChildren = function (id) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', id).one('nodes').get()
			.then(function(nodes) {
				deferred.resolve(nodes);
			});
		});
		
		return deferred.promise;
    };
	
	// get the ancestors for a node
	var getAncestors = function(node) {
		var deferred = $q.defer();
		var crumbs = [];
		//crumbs.push({id: node.data.id, name: node.data.name});
		
		if (node.data.parent_id != '-1'){
			checkTicket()
			.then(function() {								
				crawlAncestors(crumbs, node.data.parent_id)
				.then(function(crumbs) {
					deferred.resolve(crumbs.reverse());
				});
			});
		}
		else {
			deferred.resolve(crumbs.reverse());
		}
		
		return deferred.promise;
	};
	
	/* -- module public items ---*/
	return {
		login: init,
		getNode: getNode,
		getActions: getActions,
		getVersions: getVersions,
		getChildren: getChildren,
		getAncestors: getAncestors
	};
	
});
