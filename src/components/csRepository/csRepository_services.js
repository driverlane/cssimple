/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').factory('csRepository', function($q, Restangular) {

	/* --- variables --- */
	var apiPath = 'otcs/cs.exe/api/v1/';
	var restangular = configureConnection('/otcs/cs.exe/api/v1');
	var username = 'mark.farrall';
	var password = 'p@ssw0rd';

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
		
	// the the definition for a node
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
	
	// the the definition for a node
	var getBreadcrumbs = function(nodeId) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			var crumbs = [];
			crumbs.push({id: 2000, name:"Enterprise"});
			crumbs.push({id: nodeId, name:"Other name"});
			
			deferred.resolve(crumbs);
		});
		// todo handle a ticket error
		
		return deferred.promise;
	};
	

	// return the public functions
	return {
		init: init,
		getNode: getNode,
		getChildren: getChildren,
		getBreadcrumbs: getBreadcrumbs
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

