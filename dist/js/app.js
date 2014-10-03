/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The browse module relies on the following Angular modules:
	
		* ngRoute module, from the core angular library
			bower install angular-route or https://github.com/angular/angular.js
		* csApi module, from the csDumb client
			https://github.com/markfarrall/csdumb
			
	The browse module relies on the following other components:
	
		* Bootstrap - css only version for display
			bower install bootstrap-css-only or https://github.com/fyockm/bootstrap-css-only
		* Font Awesome - for display of icons
			bower install font-awesome or http://fortawesome.github.io/Font-Awesome/
	
*/

/* Configuration

	The module will check the $rootScope when loaded for configuration options. If they are present
	it will use them. If not it will use the default, if there is one, or request the values from
	the user. Configuration options are:
	
	* startNode - the ID of the fist folder to display - defaults to 2000, i.e. Enterprise workspace
	
*/

// todo move this to README.md

angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($rootScope, $scope, $routeParams, $location, csApi, viewer) {

	/* --- variables --- */
	var browseConfig = {};
	browseConfig.startNode = 2000;
	browseConfig.viewableTypes = [144];

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
	
		// open any container objects
		if (node.container) {
			$location.path('browse/' + node.id);
			return;
		}
		else {
		
			// send it to the viewer if it's a supported type
			if (browseConfig.viewableTypes.indexOf(node.type) >= 0) {
				// todo 1 get the source from the node object
				var scope = '/otcs/cs.exe/46099/Resonate_KT_%2D_WebReports_Workflow_Extensions_10%2E0%2E1_Release_Notes.pdf?func=doc.Fetch&nodeid=46099';
				viewer.showViewer(scope);
				return;
			}
			// otherwise show the properties
			else {
				// todo last create a properties viewer
				console.log('open not supported yet');
			}
		}
	};
	
	// returns the icon for an item type
	$scope.getIcon = function(node) {
		if (node) {
			switch(node.type.toString()) {
				case '141':
					return 'fa-home';
				case '0':
					return 'fa-folder-open';
				case '144':
					// todo last support different mime types
					return 'fa-file-pdf-o';
				default:
					return 'fa-bars';
			}
		}
	};
	
	// returns a basic date
	$scope.setDate = function(date) {
		var newDate = new Date(date);
		return newDate.toDateString();
	};
	
	// loads the page once there's a connection
	var loadPage = function() {
	
		// get the details for the current id
		csApi.getNode($scope.containerId)
		.then(function(data) {
			$scope.container = data;
			
			// get the breadcrumbs for the current id
			csApi.getAncestors(data)
			.then(function(crumbs) {
				$scope.crumbs = crumbs;
			});
			
		});
		
		// get the children for the current id
		csApi.getChildren($scope.containerId)
		.then(function(data) {
			$scope.nodes = data.data;
		});
		
	};
	
	/* --- controller initialisation --- */
	
	// see if there's any config in the rootScope
	if (typeof $rootScope.browseConfig !== 'undefined') {
		if (typeof $rootScope.browseConfig.startNode !== 'undefined')
			browseConfig.startNode = $rootScope.browseConfig.startNode;
		if (typeof $rootScope.browseConfig.viewableTypes !== 'undefined')
			browseConfig.viewableTypes = $rootScope.browseConfig.viewableTypes;
		if (typeof $rootScope.browseConfig.browseableMimeTypes !== 'undefined')
			browseConfig.browseableMimeTypes = $rootScope.browseConfig.browseableMimeTypes;
	}
	
	// get the current id, if none use default
	$scope.containerId = $routeParams.id;
	if (!$scope.containerId) {
		$scope.containerId = browseConfig.startNode;
	}

	// load the page
	loadPage();

});

angular.module('browse').controller('ViewerController', function($scope, $modalInstance, source) {

	$scope.source = (angular.isDefined(source)) ? source : './views/404.html';

	$scope.close = function () {
		$modalInstance.close();
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').service('viewer', function($modal) {

	var showViewer = function(source) {
		return $modal.open({
                templateUrl: './views/browse/viewer.html',
                controller: 'ViewerController',
				size: 'lg',
                resolve: {
                    source: function () {
                        return angular.copy(source);
                    }
                }
            });
	};
	
	return {
		showViewer: showViewer
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The csApi module relies on the following: 
	
		* ui.bootstrap.modal module, from the angular-bootstrap library
			bower install angular-bootstrap or https://github.com/angular-ui/bootstrap
		* restangular
			bower install restangular or https://github.com/mgonto/restangular
		
	The csApi module relies on the following other components:
	
		* Bootstrap - css only version for display
			bower install bootstrap-css-only or https://github.com/fyockm/bootstrap-css-only
	
*/

/* Configuration

	The module will check the $rootScope when loaded for configuration options. If they are present
	it will use them. If not it will use the default, if there is one, or request the values from
	the user. Configuration options are:
	
	* apiPath - the path to the REST API - defaults to '/otcs/cs.exe/api/v1/'
	* ssoPath - the path to a single sign on URL for Content Server - defaults to '/otcs/cs.exe'
	* ssoEnabled - whether to try and retrieve the LLCookie ticket from the ssoPath - defaults to true
	* username - the username for system login - no default
	* password - the password for system login - no default
	
*/
	
angular.module('csApi', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csApi').controller('LoginController', function($scope, $modalInstance, $timeout, csApi, ssoConfig) {

	/* --- variables --- */
	$scope.message = {};
	$scope.message.text = 'Please enter your user name and password to continue';
	$scope.user = {};

	/* --- functions --- */
	
	// lets the timer know the sso iframe has loaded
	window.ssoLoaded = function() {
		$scope.ssoStatus = false;
	};

	$scope.login = function () {
	
		// validate
		if (typeof $scope.user.name === 'undefined' || typeof $scope.user.password === 'undefined') {
			$scope.message.status = 'warn';
			return;
		}
		else {
			$scope.message.status = 'none';
		}
		
		// attempt a login
		$scope.message.text = 'Logging in...';
		var details = {
			username: $scope.user.name,
			password: $scope.user.password,
			apiPath: $scope.ssoConfig.apiPath,
			expiry: $scope.ssoConfig.expiry
		};		
		csApi.init(details).
		then(function() {
			$modalInstance.close('authenticated');
		},
		function(mesage){
			$scope.message.status = 'error';
			$scope.message.text = 'Login failed, please try again';
			return;
		});

	};

});

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

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'csApi',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'restangular',
	'browse'
]);

angular.module('csDumb').config(function($routeProvider) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		otherwise({ redirectTo: '/browse' });
});

angular.module('csDumb').run(function($rootScope) {

	// todo next should this move to config?

	// config for the browse module
	$rootScope.browseConfig = {
		startNode: 2000,
		viewableTypes: [144],
		browseableMimeTypes: ['application/pdf']
	};
	
});
