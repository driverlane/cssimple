# csApi

Module to communicate with Content Server via the REST API

## Dependencies 

The module relies on the following:
	
* ui.bootstrap.modal module - part of the angular-bootstrap library `bower install angular-bootstrap` or [download it](https://github.com/angular-ui/bootstrap)
* restangular - `bower install restangular` or [download it](https://github.com/mgonto/restangular)
* Bootstrap - css only version for display `bower install bootstrap-css-only` or [download it](https://github.com/fyockm/bootstrap-css-only)
	
## Configuration

The following configuration options can be supplied (how?): 

* apiPath - the path to the REST API - defaults to '/otcs/cs.exe/api/v1/' 
* ssoEnabled - whether to try an SSO login - defaults to true 
* expiry - how long until a ticket expires - defaults to 30 minutes
* username - if ssoEnabled is false, username for system login - no default 
* password - if ssoEnabled is false, the password for system login - no default 

## Commands

* csApi.getNode(id) - returns details for the supplied id
* csApi.getActions(id) - retuns collection of actions for the supplied id
* csApi.getVersions(id) - returns versions for the id
* csApi.getChildren(id) - returns collection of children nodes for the supplied id
* csApi.getNode(node) - returns parents for the supplied node object

#### Internal use 
These are visible, but they're intended for internal use. Use the configuration approach instead.
* csApi.login() - logs into the API with the supplied username and password, generally captured by the csLogin dialog
* csLogin.showForm() - displays a loginform, intended to only be used if the login can't get a ticket from sso or configuration