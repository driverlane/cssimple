/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $location, csApi, viewer) {

	/* --- variables --- */
	var browseConfig = {
		startNode: 2000
	};
	$scope.status = {};

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
	
		// open any container objects
		if (node.container) {
		
			// browse to the container
			$location.path('browse/' + node.id);
			return;
		}
		else {
	
			// open the viewer
			viewer.showViewer(node);
			return;
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
			$scope.status.parentLoaded = true;
			
			// get the breadcrumbs for the current id
			csApi.getAncestors(data)
			.then(function(crumbs) {
				$scope.crumbs = crumbs;
				$scope.status.crumbsLoaded = true;
			});
			
		});
		
		// get the children for the current id
		csApi.getChildren($scope.containerId)
		.then(function(data) {
			$scope.nodes = data.data;
			$scope.status.itemsLoaded = true;
		});
		
	};
	
	/* --- controller initialisation --- */
	
	// get the current id, if none use default
	$scope.containerId = $routeParams.id;
	if (!$scope.containerId) {
		$scope.containerId = browseConfig.startNode;
	}

	// load the page
	loadPage();

});

angular.module('browse').controller('ViewerController', function($scope, $modalInstance, csApi, node) {

	/* --- variables ---*/
	var browseConfig = {
		viewableTypes: [144],
		viewableMimeTypes: ['application/pdf']
	};
	$scope.viewer = {};
	
	// determines whether or not the viewer is supported for this object
	var initViewer = function() {
	
		// is it a supported object type
		if (browseConfig.viewableTypes.indexOf(node.type) >= 0) {
			
			// turn on the viewer
			$scope.viewer.enabled = true;
			
			// is it a viewable mimeTypes
			var versions = csApi.getVersions(node.id)
			.then(function(versions) {
				if(browseConfig.viewableMimeTypes.indexOf(versions.data[versions.data.length - 1].mime_type) >= 0) {
				
					// set the dimensions and turn on the panel
					console.log(window.height);
					$scope.viewer.supportedType = true;
				
					// get the actions for the iframe url
					var actions = csApi.getActions(node.id)
					.then(function(actions) {
						var open = actions.actions.filter(function(command) {
							return command.name === 'Open';
						});
						$scope.source = open[0].url;
						return;
					});

				}
				else {
					$scope.viewer.supportedType = false;
				}
				
			});
			
		}

	};

	$scope.close = function () {
		$modalInstance.close();
	};
	
	/* --- controller logic --- */
	
	// get the node from the service
	$scope.node = (angular.isDefined(node));
	if (!$scope.node)
		$scope.viewer.error = true;
	else
		initViewer();
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').service('viewer', function($modal) {

	var showViewer = function(node) {
		return $modal.open({
                templateUrl: './views/browse/viewer.html',
                controller: 'ViewerController',
                resolve: {
                    node: function () {
                        return angular.copy(node);
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

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('wrApi', []);

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
