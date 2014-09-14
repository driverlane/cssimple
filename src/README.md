The thinking here is:

* app - items that are unlikely to be used outside this project, e.g. the app definition, top level controller, routing
* img - project level images
* bower_components - strangely components installed by bower
* component - modules used in this solution. If there's any use of third party angular modules might create a separate folder at this level
* css - project level css and fonts. Will look at trying less if I get time
* index.html - the starting point with the common HTML