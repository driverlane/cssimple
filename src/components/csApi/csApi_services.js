/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csApi').factory('csApi', function($rootScope, $q, Restangular, csLogin) {

	/* --- variables --- */
	var apiConfig = {
		apiPath: '/otcs/cs.exe/api/v1/',
		ssoEnabled: true,
		expiry: 30,
		username: 'a',
		password: 'a'
	};
	
	/* --- functions --- */
	
	// configures restangular
	var configureConnection = function (baseUrl, ticket) {
		return Restangular.withConfig(function(Configurer) {
			Configurer.setBaseUrl(baseUrl);
			if (ticket !== '') {
				Configurer.setDefaultHeaders({otcsticket: ticket});
			}
			// todo 6 setup JSONP access
		});
	};
	
	// tries to get a ticket from the API
	var userLogin = function (username, password) {
		var deferred = $q.defer();
		
		restangular = configureConnection(apiConfig.apiPath);
		restangular.one('auth').customPOST(
			{},
			'',
			{username: username, password: password},
			{ContentType: 'application/x-www-form-urlencoded'}
		)
		.then(function(auth) {
			// todo 4 test if we've got a ticket
			restangular = configureConnection(apiConfig.apiPath, auth.ticket);
			connected = true;
			deferred.resolve(auth.ticket);
			
			// todo 5 display login if it fails
		});

		return deferred.promise;
	};
	
	// initialise the connection details
	var init = function (username, password) {
		var deferred = $q.defer();

		// get any non-default config
		// todo 3 get config from where?

		if (username)
			apiConfig.username = username;
		if (password)
			apiConfig.password = password;
		
		// try to login
		userLogin(apiConfig.username, apiConfig.password)
		.then(function() {
			deferred.resolve();
		});

		return deferred.promise;
	};
		
	// checks if it's time to refresh the ticket
	var checkTicket = function () {
		var deferred = $q.defer();

		// todo 2 skip this if the ticket isn't expired
		userLogin(apiConfig.username, apiConfig.password)
		.then(function() {
			deferred.resolve();
		});

		return deferred.promise;
	};

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
				
				
				// todo 1 get this working
				getNode(start.data.parent_id)
				.then(function(node) {

					//if (node.data.parent_id == '-1') {
						crumbs.push({id: node.data.id, name: node.data.name});
						deferred.resolve(crumbs.reverse());

				});
			});
		}
		else {
			deferred.resolve(crumbs.reverse());
		}
		
		return deferred.promise;
	};
	
	/* --- service initialisation ---*/

	// set up the API connection
	var restangular = configureConnection(apiConfig.apiPath);

	// see if there's any config, then login
	init();
	
	/* -- module public items ---*/
	return {
		login: init,
		getNode: getNode,
		getChildren: getChildren,
		getAncestors: getAncestors
	};
	
});

angular.module('csApi').service('csLogin', function($modal) {

	var showLogin = function() {
	
		return $modal.open({
			templateUrl: './views/csApi/login.html',
			controller: 'LoginController',
			size: 'sm'
		});
	};
	
	return {
		showLogin: showLogin
	};
	
});
