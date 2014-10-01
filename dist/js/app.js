/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The browse module relies on the following Angular modules:
	
		* ngRoute module, from the core angular library
			bower install angular-route or https://github.com/angular/angular.js
		* csRepository module, from the csDumb client
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

angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($rootScope, $scope, $routeParams, $location, csRepository, $modal) {

	/* --- variables --- */
	var startNode = 2000;
	if (typeof $rootScope.startNode !== 'undefined') { startNode = $rootScope.startNode; }
	$scope.containerId = $routeParams.id;
	$scope.docSource = '/kiosk/';

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
		switch(node.type.toString()) {
			case '0':
				$location.path('browse/' + node.id);
				break;
			case '144':
			
				// todo open this in the viewer
				//$scope.docSource = "/otcs/cs.exe/46099/Resonate_KT_%2D_WebReports_Workflow_Extensions_10%2E0%2E1_Release_Notes.pdf?func=doc.Fetch&nodeid=46099";
				$scope.docSource = '/otcs/cs.exe/fetch/2000/Resonate_KT_-_WebReports_Workflow_Extensions_10.0.1_Release_Notes.pdf?nodeid=46099&vernum=-2';
				$scope.$watch('docSource', function() {
					$modal.open({
						templateUrl: './views/browse/docViewer.html',
						controller: 'BrowseController',
						size: 'lg'
					});
				});
				
				break;
			default:
				console.log('open not supported yet');
				break;
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
	
	// closes the docViewer dialog
	$scope.docViewerClose = function () {
		$modal.close('closed');
	};

	/* --- controller logic --- */
	
	// check the id, if none use default
	if (!$scope.containerId) {
		$scope.containerId = startNode;
	}

	// get the details for the current id
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
		
		// get the breadcrumbs for the current id
		csRepository.getAncestors(data)
		.then(function(crumbs) {
			$scope.crumbs = crumbs;
		});
		
	});
	
	// get the children for the current id
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

});

angular.module('browse').controller('DocViewerController', function($scope, $modalInstance) {

	$scope.login = function () {
	
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($rootScope, $scope, $routeParams, $location, csRepository, $modal) {

	/* --- variables --- */
	var startNode = 2000;
	if (typeof $rootScope.startNode !== 'undefined') { startNode = $rootScope.startNode; }
	$scope.containerId = $routeParams.id;
	$scope.docSource = '/kiosk/';

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(node) {
		switch(node.type.toString()) {
			case '0':
				$location.path('browse/' + node.id);
				break;
			case '144':
			
				// todo open this in the viewer
				//$scope.docSource = "/otcs/cs.exe/46099/Resonate_KT_%2D_WebReports_Workflow_Extensions_10%2E0%2E1_Release_Notes.pdf?func=doc.Fetch&nodeid=46099";
				$scope.docSource = '/otcs/cs.exe/fetch/2000/Resonate_KT_-_WebReports_Workflow_Extensions_10.0.1_Release_Notes.pdf?nodeid=46099&vernum=-2';
				$scope.$watch('docSource', function() {
					$modal.open({
						templateUrl: './views/browse/docViewer.html',
						controller: 'BrowseController',
						size: 'lg'
					});
				});
				
				break;
			default:
				console.log('open not supported yet');
				break;
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
	
	// closes the docViewer dialog
	$scope.docViewerClose = function () {
		$modal.close('closed');
	};

	/* --- controller logic --- */
	
	// check the id, if none use default
	if (!$scope.containerId) {
		$scope.containerId = startNode;
	}

	// get the details for the current id
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
		
		// get the breadcrumbs for the current id
		csRepository.getAncestors(data)
		.then(function(crumbs) {
			$scope.crumbs = crumbs;
		});
		
	});
	
	// get the children for the current id
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

});

angular.module('browse').controller('DocViewerController', function($scope, $modalInstance) {

	$scope.login = function () {
	
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The csRepository module relies on the following: 
	
		* ui.bootstrap.modal module, from the angular-bootstrap library
			bower install angular-bootstrap or https://github.com/angular-ui/bootstrap
		* restangular
			bower install restangular or https://github.com/mgonto/restangular
		
	The csRepository module relies on the following other components:
	
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
	
angular.module('csRepository', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').controller('LoginController', function($scope, $modalInstance, $timeout) {

	$scope.status = ' ';
	$scope.userError = false;

	/* sso functionality */
	
	$scope.ssoPath = '';
	// todo - get this from the service
	$scope.ssoStatus = false;

	// lets the timer know the sso iframe has loaded
	window.ssoLoaded = function() {
		$scope.ssoStatus = false;
	};

	// load the sso iframe if sso is enabled
	if ($scope.ssoStatus) {
		$scope.status = 'Attempting single sign on';
		// todo - get this from the service
		$scope.ssoPath = "/otcs/cs.exe";
	}
	else {
		$scope.status = 'Please enter your user name and password to continue';
	}
	
	/* login functionality */
	
	$scope.user = {};
	$scope.login = function () {
	
		// validate
		if (typeof $scope.user.name === 'undefined' || typeof $scope.user.password === 'undefined') {
			$scope.userError = true;
			return;
		}
		else {
			$scope.userError = false;
		}
		
		// attempt a login
		$scope.status = 'Logging in...';
		// todo - perform a username password login

		// pretend it's logging in
		$timeout(function() {}, 2000);
		
		// authenticated, so update the status and close
		$scope.status = 'Logging in';
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});

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


angular.module('sandpit', []);


angular.module('sandpit').controller('SandpitController', function($scope, $modal) {

	$scope.message = 'Budgie';
	
	
	
	/*var login = csLogin.showLogin();
	
	login.result.then(function(result) {
		$scope.message = result;
	},
	function() {
		$scope.message = 'dismissed';	
	});*/
	
});




angular.module('sandpit').service('docViewer', function($modal) {

	var showDocViewer = function() {
		return $modal.open({
			templateUrl: './views/browse/docViewer.html',
			controller: 'BrowseController',
			size: 'lg'
		});
	};
	
	return {
		showLogin: loginDialog
	};
	
});


/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1.0 - initial version October 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

/* Dependencies

	This module is just a wrapper for the other modules. Dependencies can be seen below.	
	
*/

/* Configuration

	There is no configuration for this wrapper, some configuration items for other modules is set below.
	
*/

angular.module('csDumb', [
	'ngRoute',
	'csRepository',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'restangular',
	// remove the sandpit
	'sandpit',
	'browse'
]);

// config
angular.module('csDumb').run(function($rootScope) {

	// config for the browse module
	$rootScope.startNode = 2000;
	
	// config for the csRepository module
	$rootScope.ssoEnabled = false;
	$rootScope.username = 'mark.farrall';
	$rootScope.password = 'p@ssw0rd';
});

angular.module('csDumb').config(['$routeProvider', function($routeProvider, $rootScope) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		// todo remove the sandpit
		when('/sandpit', { templateUrl: 'views/sandpit/sandpit.html', controller: 'SandpitController' }).
		otherwise({ redirectTo: '/browse' });
}]);
