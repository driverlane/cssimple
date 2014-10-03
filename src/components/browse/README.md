# csApi

Module to communicate with Content Server via the REST API

## Dependencies 

The module relies on the following:

* ngRoute, from the core angular library `bower install angular-route` or [download it](https://github.com/angular/angular.js)
* csApi module, from the csDumb client [download it](https://github.com/markfarrall/csdumb)
* Bootstrap - css only version for display `bower install bootstrap-css-only` or [download it](https://github.com/fyockm/bootstrap-css-only)
* Font Awesome - `bower install font-awesome` or [download it](http://fortawesome.github.io/Font-Awesome/)

## Configuration

Use ngRoute to hand control over to the module:
```
angular.module('myApp').config(function($routeProvider) {
	$routeProvider.
		when('/browse', { templateUrl: './views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: './views/browse/browse.html', controller: 'BrowseController' }).
		otherwise({ redirectTo: '/browse' });
});
```

The following configuration options can be supplied (how?): 

* startNode - which container object should be the default starting point - defaults to 2000, i.e. Enterprise Workspace
* viewableTypes - which object types are visible via the default viewer - defaults to 144
* browseableMimeTypes - used to restrict the document mime types that are displayed - no default
