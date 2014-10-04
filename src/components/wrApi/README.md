# wrApi

Module to communicate with Content Server via a WebReports polyfill for users without the REST API

This is a polyfill as WebReports not considered the primary API for this project. While they can be more functional than the REST API not all users will have access to WebReports funcitonality. 

## Dependencies 

The module relies on the following:

* restangular - `bower install restangular` or [download it](https://github.com/mgonto/restangular)
	
## Configuration

First import the WebReports.xml file into Content Server using the standard XML import functionality, e.g. 
```
http://<path to >/cs.exe?func=admin.xmlimport&filename=<file path to WebReports.xml>&objid=<folder ID>
``` 

Once imported update the configuration items below (how?): 

* baseUrl - the path to the Content Server executable - defaults to '/otcs/cs.exe',
* getNodeId - the id number of the getNode WebReport - no default
* getActionsId - the id number of the getActions WebReport - no default
* getVersionsId - the id number of the getVersions WebReport - no default
* getChildrenId - the id number of the getChildren WebReport - no default
* getAncestorsId - the id number of the getAncestors WebReport - no default

## Commands

* csApi.getNode(id) - returns details for the supplied id
* csApi.getActions(id) - retuns collection of actions for the supplied id
* csApi.getVersions(id) - returns versions for the id
* csApi.getChildren(id) - returns collection of children nodes for the supplied id
* csApi.getAncestors(id) - returns parents for the supplied node object