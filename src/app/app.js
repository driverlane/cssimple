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