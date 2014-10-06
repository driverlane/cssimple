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
			// todo setup JSONP access
		});
	};
	
	// initialise the connection details
	var init = function (username, password) {
		var deferred = $q.defer();

		// get any non-default config
		// todo get config from where?

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
		
	// tries to get a ticket from the API
	var userLogin = function (username, password) {
		var deferred = $q.defer();
		
		//restangular = configureConnection(apiConfig.apiPath);
		restangular.one('auth').customPOST(
			{},
			'',
			{username: username, password: password},
			{ContentType: 'application/x-www-form-urlencoded'}
		)
		.then(function(auth) {
			// todo test if we've got a ticket
			restangular = configureConnection(apiConfig.apiPath, auth.ticket);
			connected = true;
			apiConfig.expires = new Date();
			apiConfig.expires.setMinutes(apiConfig.expires.getMinutes() + (apiConfig.expiry - 5));
			deferred.resolve(auth.ticket);
			
			// todo display login if it fails
		});

		return deferred.promise;
	};
	
	// checks if it's time to refresh the ticket
	var checkTicket = function () {
		var deferred = $q.defer();

		// todo skip this if the ticket isn't expired
		var now = new Date();
		if (!apiConfig.expires || apiConfig.expires < now) {
			userLogin(apiConfig.username, apiConfig.password)
			.then(function() {
				deferred.resolve();
			});
		}
		else {
			deferred.resolve();
		}
		
		return deferred.promise;
	};

	// get the definition for a node
	var getNode = function(id) {
		var deferred = $q.defer();
		
		checkTicket()
		.then(function() {
			restangular.one('nodes', id).get()
			.then(function(node) {
				deferred.resolve(node);
			});
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
	
	// iterative function to crawl up an ancestor tree
	var crawlAncestors = function(ancestors, parent, promise){
		var deferred;
		if (!promise)
			deferred = $q.defer();
		else
			deferred = promise;
		
		getNode(parent)
		.then(function(parent){
			ancestors.push({id: parent.data.id, name: parent.data.name});
			if (parent.data.parent_id == '-1')
				deferred.resolve(ancestors);
			else
				crawlAncestors(ancestors, parent.data.parent_id, deferred);
		});
		
		return deferred.promise;
	};
	
	/* --- service initialisation ---*/

	// set up the API connection
	var restangular = configureConnection(apiConfig.apiPath);

	// get any config and login
	init();
	
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
