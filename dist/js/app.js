/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $rootScope, $location, csRepository) {

	/* --- variables --- */
	$scope.containerId = $routeParams.id;

	/* --- functions --- */

	// handles the click event for nodes
	$scope.openNode = function(type, id) {
		switch(type) {
			case 'Folder':
				$location.path('browse/' + id);
				break;
			default:
				// todo open this in the viewer
				console.log('open document ' + id);
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
	
	/* --- controller logic --- */
	
	// check the id, if none use default
	if (!$scope.containerId) {
		$scope.containerId = $rootScope.startNode;
	}

	// get the details for the current id
	csRepository.getNode($scope.containerId)
	.then(function(data) {
		$scope.container = data;
	});
	
	// get the children for the current id
	csRepository.getBreadcrumbs($scope.containerId)
	.then(function(data) {
		$scope.crumbs = data;
	});

	// get the children for the current id
	csRepository.getChildren($scope.containerId)
	.then(function(data) {
		$scope.nodes = data.data;
	});

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The csLogin service relies on ui.bootstrap.modal module (from the angular-bootstrap library)

*/
	
angular.module('csRepository', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
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


/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('sandpit', []);

/* --------------------------------------------------------------------------------
 Version history
 --------------------------------------------------------------------------------
 0.1 - initial version September 2014 Mark Farrall
 -------------------------------------------------------------------------------- */
	
angular.module('sandpit').controller('SandpitController', function($scope, csLogin) {

	$scope.message = 'Budgie';
	
	var login = csLogin.showLogin();
	
	login.result.then(function(result) {
		$scope.message = result;
	},
	function() {
		$scope.message = 'dismissed';	
	});
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

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

// globals
// todo - work out whether these should be moved
angular.module('csDumb').run(function($rootScope) {
	$rootScope.singleSignonPath = '/otcs/cs.exe';
	$rootScope.apiPath = '/otcs/cs.exe/api/v1';
	$rootScope.startNode = 2000;
});

angular.module('csDumb').config(['$routeProvider', function($routeProvider, $rootScope) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		// todo remove the sandpit
		when('/sandpit', { templateUrl: 'views/sandpit/sandpit.html', controller: 'SandpitController' }).
		otherwise({ redirectTo: '/browse' });
}]);
