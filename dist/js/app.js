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
	
angular.module('browse').controller('BrowseCtl', function($scope) {

	// test harness until I can get the REST API connected
	$scope.nodes = [
		{'name': 'Sandpit', 'sub_type': 'Folder'},
		{'name': 'System Configuration', 'sub_type': 'Folder'},
		{'name': 'First document', 'sub_type': 'Document'},
		{'name': 'README.txt', 'sub_type': 'Document'}
	];

});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('contDocsSearch', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('ContDocsSearchCtl', function($scope) {

	// ???
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'browse',
	'contDocsSearch'
]);

angular.module('csDumb').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/partials/app.html',
        controller: 'AppCtl'
      }).
      when('/browse', {
        templateUrl: 'views/browse/partials/browse.html',
        controller: 'BrowseCtl'
      }).
      when('/contdocs', {
        templateUrl: 'views/contDocsSearch/partials/search.html',
        controller: 'ContDocsSearchCtl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('AppCtl', function($scope) {

	// get a token for the REST API

});
