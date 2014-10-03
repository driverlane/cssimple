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

* csApi.login - don't use this, it's for the csLogin form. If you don't want the end user to specify connection details, supply it in config.
* csApi.getNode(id, versions) - returns details for the supplied id, set versions to true if you want the object to contain version definitions
* csApi.getChildre(id, versions) - returns children of the supplied id, set versions to true if you want the child objects to contain version definitions
* csApi.getNode(node) - returns parents for the supplied node object
* csApi.getVersion(node) - returns versions for the supplied node object
* csForm.showForm() - don't use it, it's there to handle login failures


