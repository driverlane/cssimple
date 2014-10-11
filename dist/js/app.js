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
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $location, browseConfig, csApi, viewer) {

	/* --- variables --- */
	$scope.status = {};

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
	
		// open any container objects
		if (node.type === 0) {
		
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
			if ($scope.status.itemsLoaded && $scope.status.crumbsLoaded)
				$scope.status.allLoaded = true;
				
			// get the breadcrumbs for the current id
			csApi.getAncestors(data)
			.then(function(crumbs) {
				$scope.crumbs = crumbs;
				$scope.status.crumbsLoaded = true;
			if ($scope.status.parentLoaded && $scope.status.itemsLoaded)
				$scope.status.allLoaded = true;
			});
			
		});
		
		// get the children for the current id
		csApi.getChildren($scope.containerId)
		.then(function(data) {
			$scope.nodes = data.data;
			$scope.status.itemsLoaded = true;
			if ($scope.status.parentLoaded && $scope.status.crumbsLoaded)
				$scope.status.allLoaded = true;
		});
		
	};
	
	/* --- controller initialisation --- */
	
	// get the current id, if none use default
	$scope.containerId = $routeParams.id;
	if (!$scope.containerId) {
		$scope.containerId = browseConfig.config.startNode;
	}

	// load the page
	loadPage();

});

angular.module('browse').controller('ViewerController', function($scope, $modalInstance, browseConfig, csApi, node) {

	/* --- variables ---*/
	$scope.viewer = {};
	
	// determines whether or not the viewer is supported for this object
	var initViewer = function() {
	
		// is it a supported object type
		if (browseConfig.config.viewableTypes.indexOf(node.type) >= 0) {
			
			// turn on the viewer
			$scope.viewer.enabled = true;
			
			// is it a viewable mimeTypes
			var versions = csApi.getVersions(node.id)
			.then(function(versions) {
				if(browseConfig.config.viewableMimeTypes.indexOf(versions.data[versions.data.length - 1].mime_type) >= 0) {
				
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
	
angular.module('browse').directive('browseIcon', function ($q, $log, csApi) {

	var icons = [
		{ id: '/img/webdoc/folder.gif', icon: 'fa-folder-open'},
		{ id: '/img/webdoc/icon_library.gif', icon: 'fa-home' },
		{ id: '/img/webdoc/appexel.gif', icon: 'fa-file-excel-o' },
		{ id: '/img/webdoc/appgif.gif', icon: 'fa-file-image-o' },
		{ id: '/img/webdoc/appiexpl.gif', icon: 'fa-file-code-o' },
		{ id: '/img/webdoc/appjpeg.gif', icon: 'fa-file-image-o' },
		{ id: '/img/webdoc/apppdf.gif', icon: 'fa-file-pdf-o'},
		{ id: '/img/webdoc/apppoin.gif', icon: 'fa-file-powerpoint-o' },
		{ id: '/img/webdoc/appproj.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/apptaro.gif', icon: 'fa-file-archive-o' },
		{ id: '/img/webdoc/apptext.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/appvisio.gif', icon: 'fa-file-text-o' },
		{ id: '/img/webdoc/appword.gif', icon: 'fa-file-word-o'},
		{ id: '/img/webdoc/appxml.gif', icon: 'fa-file-text-o'},
		{ id: '/img/webdoc/appzip.gif', icon: 'fa-file-archive-o'},
		{ id: '/img/project/16project.gif', icon: 'fa-folder-open-o'},
		{ id: '/img/folder_icons/folder1.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder2.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder3.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder4.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder5.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder6.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder7.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder8.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder9.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder10.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder11.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder12.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder13.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder14.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder15.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder16.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder17.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder18.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder19.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder20.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder21.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder22.gif', icon: 'fa-folder-open'},
		{ id: '/img/folder_icons/folder23.gif', icon: 'fa-folder-open'}
	];
	
	// return the icon for the id
	function getIcon(id) {
		
		// set the default icon
		var icon = 'fa-bars';

		// get the icon
		for (var i = 0;i < icons.length; i++) {
			if (icons[i].id === id)
				return icons[i].icon;
		}

		$log.warn('Unknown icon: ' + id);
		return icon;
	}
	
	return {
		restrict: 'A',
		link: function(scope, element, atts){
		
			// update the classes
			scope.$watch('container', function() {
				var id = atts.browseIcon;
				if (id) {
					classes = element.attr('class') + getIcon(id);
					element.attr('class', classes);
				}
			});
		}
	};

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('browse').factory('browseConfig', function() {

	var config = {
		startNode: 2000,
		viewableTypes: [144],
		viewableMimeTypes: ['application/pdf']
	};

	var configure = function (custom) {
		if (!custom)
			return;
			
		if (custom.startNode)
			config.startNode = custom.startNode;

		if (custom.viewableTypes)
			config.viewableTypes = custom.viewableTypes;

		if (custom.viewableMimeTypes)
			config.viewableMimeTypes = custom.viewableMimeTypes;
	};
	
	return {
		config: config,
		configure: configure
	};

});

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

angular.module('csApi').factory('csApiConfig', function() {

	var config = {
		apiPath: '/otcs/cs.exe/api/v1/',
		ssoEnabled: true,
		expiry: 30,
		username: 'a',
		password: 'a'
	};

	var configure = function (custom) {
		if (!custom)
			return;
			
		if (custom.apiPath)
			config.apiPath = custom.apiPath;

		if (custom.ssoEnabled)
			config.ssoEnabled = custom.ssoEnabled;

		if (custom.expiry)
			config.expiry = custom.expiry;

		if (custom.username)
			config.username = customusernameexpiry;

		if (custom.password)
			config.password = custom.password;
	};
	
	return {
		config: config,
		configure: configure
	};

});

angular.module('csApi').factory('csApi', function($rootScope, $q, csApiConfig, Restangular, csLogin) {

	/* --- variables --- */
	
	/* --- functions --- */
	
	// configures restangular
	var configureConnection = function (baseUrl, ticket) {
		return Restangular.withConfig(function(Configurer) {
			Configurer.setBaseUrl(baseUrl);
			if (ticket !== '') {
				Configurer.setDefaultHeaders({otcsticket: ticket});
			}
		});
	};
	
	// initialise the connection details
	var init = function (username, password) {
		var deferred = $q.defer();

		// get any non-default config
		// todo get config from where?

		if (username)
			csApiConfig.config.username = username;
		if (password)
			csApiConfig.config.password = password;
		
		// try to login
		userLogin(csApiConfig.config.username, csApiConfig.config.password)
		.then(function() {
			deferred.resolve();
		});

		return deferred.promise;
	};
		
	// tries to get a ticket from the API
	var userLogin = function (username, password) {
		var deferred = $q.defer();
		
		restangular.one('auth').customPOST(
			{},
			'',
			{username: username, password: password},
			{ContentType: 'application/x-www-form-urlencoded'}
		)
		.then(function(auth) {
			// todo test if we've got a ticket
			restangular = configureConnection(csApiConfig.config.apiPath, auth.ticket);
			connected = true;
			csApiConfig.config.expires = new Date();
			csApiConfig.config.expires.setMinutes(csApiConfig.config.expires.getMinutes() + (csApiConfig.config.expiry - 5));
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
		if (!csApiConfig.config.expires || csApiConfig.config.expires < now) {
			userLogin(csApiConfig.config.username, csApiConfig.config.password)
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
	var restangular = configureConnection(csApiConfig.config.apiPath);

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

angular.module('csDumb').run(function(appConfig, browseConfig, csApiConfig) {

	// set the title
	/*var appCustom = {
		title: 'A new title'
	};
	appConfig.configure(appCustom);*/

	// configure the browse module
	/*var browseCustom = {
		startNode: 53912
	};
	browseConfig.configure(browseCustom);*/
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csDumb').controller('AppController', function($scope, appConfig) {

	/* --- variables --- */
	$scope.title = appConfig.config.title;

	/* --- functions --- */


	/* --- controller initialisation --- */
	

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb').factory('appConfig', function() {

	var config = {
		title: 'CS Simple'
	};

	var configure = function (custom) {
		if (!custom)
			return;
			
		if (custom.title)
			config.title = custom.title;
	};
	
	return {
		config: config,
		configure: configure
	};

});
