# csdumb

Simple read only UI for Content Server

## Development/Build

The project uses [gulp.js](http://gulpjs.com/) as the testing and build task runner. To set up for development:

1. install node - [http://nodejs.org/](http://nodejs.org/)
2. install gulp globally: `npm install gulp -g`
3. install the modules to support gulp: `npm install`
4. install bower globally to manage third party components: `npm install bower -g`
5. install the modules for the front end: `bower install`

### Structure

* dist - the version for deployment to the target environment.
* node_modules - won't be in the repo, but will be created when you run `npm install`. Stores the modules used by gulp.
* src - the source code, gulp copies/massages the files here to the dist folder
* test - stores the unit and system testing scripts and configuration

### Key tasks

The key gulp tasks are:

* gulp - sets the project up for development. Cleans the dist folder. Runs linting then unit testing. Does any transpiling and combining then populates the dist folder with unminified files. Then uploads the files from dist to the default Content Server environment and starts a watch task.
* gulp build - cleans the dist folder. Runs linting and unit testing. Then does any transpiling, combining, minification and populates the dist folder. Finishes with the system testing (and cleans the dist folder if it fails).
* gulp upload - copies the dist folder to the specified Content Server environment or server. If no environment or server is specified it copies to the default development environment. To specify an environment: `gulp upload --env test`. To specify a server: `gulp upload --server content.cgi.demo`. Add new environments and the deployment path in the getEnv funciton in gulpfile.js.