/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').factory('csRepository', function($rootScope, $q, Restangular) {

	/* --- variables --- */
	var apiPath = '/otcs/cs.exe/api/v1/';
	if (typeof $rootScope.apiPath !== 'undefined') { apiPath = $rootScope.apiPath; }
	var ssoPath = '/otcs/cs.exe';
	if (typeof $rootScope.ssoPath !== 'undefined') { ssoPath = $rootScope.ssoPath; }
	var ssoEnabled = true;
	if (typeof $rootScope.ssoEnabled !== 'undefined') { ssoEnabled = $rootScope.ssoEnabled; }
	var username = '';
	if (typeof $rootScope.username !== 'undefined') { username = $rootScope.username; }
	var password = '';
	if (typeof $rootScope.password !== 'undefined') { password = $rootScope.password; }

	// internal variables
	var restangular = configureConnection(apiPath);
	var ticket = '';
	var ticketExpiry;

	/* --- functions --- */
	
	// initialise the connection details
	var init = function() {
		username = 'mark.farrall';
		password = 'p@ssw0rd';
	};
	
	// configure restangular
	function configureConnection(baseUrl, ticket) {
		return Restangular.withConfig(function(Configurer) {
			Configurer.setBaseUrl('/otcs/cs.exe/api/v1');
			if (ticket !== '') {
				Configurer.setDefaultHeaders({otcsticket: ticket});
			}
		});
	}
	
	// get a ticket for a specific username/password
	function checkTicket() {
		var deferred = $q.defer();

		// todo incorporate sso
		
		// todo cache the ticket/check expiry
		restangular.one('auth').customPOST(
			{},
			'',
			{username: username, password: password},
			{ContentType: 'application/x-www-form-urlencoded'}
		)
		.then(function(auth) {
			// todo test if we've got a ticket
			restangular = configureConnection(apiPath, auth.ticket);
			deferred.resolve(auth.ticket);
		});

		return deferred.promise;
	}
		
	// get the definition for a node
	var getNode = function(nodeId) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', nodeId).get()
			.then(function(node) {
				deferred.resolve(node);
			});
		});
		// todo handle a ticket error
		
		return deferred.promise;
	};
	
	// get the children for a node
	var getChildren = function (parentId) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', parentId).one('nodes').get()
			.then(function(nodes) {
				deferred.resolve(nodes);
			});
		});
		// todo handle a ticket error
		
		return deferred.promise;
    };
	
	// get the ancestors for a node
	var getAncestors = function(start) {
		var deferred = $q.defer();
		var crumbs = [];
		crumbs.push({id: start.data.id, name: start.data.name});
		
		if (start.data.parent_id != '-1'){
			checkTicket()
			.then(function() {
				
				getNode(start.data.parent_id)
				.then(function(node) {

					//if (node.data.parent_id == '-1') {
						crumbs.push({id: node.data.id, name: node.data.name});
						deferred.resolve(crumbs.reverse());

				});
				
			});
			// todo handle a ticket error
		}
		else {
			deferred.resolve(crumbs.reverse());
		}
		
		return deferred.promise;
	};
	
	// return the public functions
	return {
		init: init,
		getNode: getNode,
		getChildren: getChildren,
		getAncestors: getAncestors
	};
	
});

angular.module('csRepository').service('csLogin', function($modal) {

	var loginDialog = function() {
		return $modal.open({
			templateUrl: './views/csRepository/login.html',
			controller: 'LoginController',
			size: 'sm'
		});
	};
	
	return {
		showLogin: loginDialog
	};
	
	
});

