var gulp = require('gulp'),
annotate = require('gulp-ng-annotate'),
argv = require('yargs').argv,
bowerfiles = require('main-bower-files'),
changed = require('gulp-changed'),
clean = require('gulp-rimraf'),
concat = require('gulp-concat'),
cssminify = require('gulp-minify-css'),
filter = require('gulp-filter'),
flatten = require('gulp-flatten'),
gulpif = require('gulp-if'),
gutil = require('gulp-util'),
imagemin = require('gulp-imagemin'),
jshint = require('gulp-jshint'),
karma = require('karma'),
karmaParseConfig = require('karma/lib/config').parseConfig,
livereload = require('gulp-livereload'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename'),
runsequence = require('run-sequence'),
stripdebug = require('gulp-strip-debug'),
uglify = require('gulp-uglify');

/* testing tasks */

// lint the scripts
gulp.task('lint', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
		.pipe(jshint())
        .pipe(jshint.reporter('default'));
});

function runKarma(configFilePath, options, cb) {
 
	configFilePath = __dirname + '\\' + configFilePath;
 
	var server = karma.server;
	var log=gutil.log, colors=gutil.colors;
	var config = karmaParseConfig(configFilePath, {});
 
    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });
 
	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}

// use karma to run unit tests
gulp.task('unit', function(done) {
	runKarma('karma.conf.js', {
		autoWatch: false,
		singleRun: true
	}, done);
});

// headless version for watch based testing
gulp.task('unitlight', function(done) {
	runKarma('karma.conf.js', {
		autoWatch: false,
		singleRun: true,
		browsers: 'PhantomJS'
	}, done);
});

// use protractor to run system tests
gulp.task('system', function (cb) {
	// todo set up system testing
	return;
});

/* --- dist build tasks --- */

// clean the dist folder
gulp.task('clean', function() {
	return gulp.src('./dist/*', {read: false})
		.pipe(clean());
});

// copy the bower components
gulp.task('bower', function() {

	var jsFilter = filter('*.js');
    var cssFilter = filter('*.css');
    var fontFilter = filter(['*.eot', '*.woff', '*.svg', '*.ttf']);
	
	return gulp.src(bowerfiles())
	
		// copy the javascript
		.pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('vendor.min.js'))
		.pipe(stripdebug())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(jsFilter.restore())

		// copy the css
		.pipe(cssFilter)
        .pipe(concat('vendor.css'))
		.pipe(cssminify())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(cssFilter.restore())

		// copy the fonts
		.pipe(fontFilter)
		.pipe(flatten())
		.pipe(gulp.dest('./dist/fonts'));

});

// combine, minify and copy the css
gulp.task('css', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('app.css'))
		.pipe(cssminify())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulpif(localreload, livereload()));
});

// combine and copy the css
gulp.task('cssnomin', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulpif(localreload, livereload()));
});

// minify and copy images
gulp.task('img', function() {
	return gulp.src('./src/img/*.{ico,gif,png}')
		.pipe(changed('./dist/img/'))
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'))
		.pipe(gulpif(localreload, livereload()));
});

// build concatenated and minified javascript
gulp.task('js', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
		.pipe(stripdebug())
		.pipe(annotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(gulpif(localreload, livereload()));		
});

// build concatenated javascript
gulp.task('jsnomin', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
		.pipe(annotate())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(gulpif(localreload, livereload()));
});

// copy the root
gulp.task('root', function() {
	return gulp.src('./src/*.{html,json}')
		.pipe(gulp.dest('./dist/'))
		.pipe(gulpif(localreload, livereload()));
});

// copy the views
gulp.task('views', function() {
	return gulp.src(['./src/components/**/*.html','./src/app/**/*.html'])
		.pipe(gulp.dest('./dist/views/'))
		.pipe(gulpif(localreload, livereload()));
});

// copies all resources to dist
gulp.task('copy', ['css','img','js','root','views']);

// clean and build dist
gulp.task('build', function(done) {
	// todo add system testing
	runsequence('lint','unit','clean','bower','copy',done);
});

/* upload task */

// copy dist to the server/environment specified (uses yargs)
gulp.task('upload', function() {
	var paths = getPaths();
	for (var i = 0; i < paths.length; i++) {
		gulp.src('./dist/**/*.*')
			.pipe(changed(paths[i]))
			.pipe(gulp.dest(paths[i]))
			.pipe(gulpif(remotereload, livereload()));
	}
	return;
});

// converts the argument to an array of paths
function getPaths() {
	var paths = [];
	var env = getEnv();
	if (argv.server) {
		paths[0] = '\\\\' + argv.server + env.path;
	}
	else {
		for (var i = 0; i < env.servers.length; i++) {
			paths[i] = '\\\\' + env.servers[i] + env.path;
		}
	}
	return paths;
}

// return the environment, defaulting to content
function getEnv(name) {

	var content = {
		servers: ['content.cgi.demo'],
		path: '\\d$\\opentext\\wwwroot\\res\\uichanges\\'
	};
	var azure = {
		servers: ['10.0.0.4'],
		path: '\\e$\\opentext\\wwwroot\\res\\uichanges\\'
	};

	// return a single server
	if (argv.server) {
		if (content.servers.indexOf(argv.server) >= 0) {
			console.log('Using server ' + argv.server);
			return content;
		}
		
		console.log('Using server ' + argv.server);
		return azure;
	}
	// return an environment
	else {
		if (argv.env === 'content') {
			console.log('Using environment content');
			return content;
		}
		
		console.log('Using environment azure');
		return azure;
	}

}

/* development tasks */

var localreload = false;
var remotereload = false;

// watches for changes and updates a local server
gulp.task('watch', function() {
	var connect = require('connect');
	var serveStatic = require('serve-static');

	// create the server
	var server = connect();
	server.use(serveStatic('./dist/'));
	server.listen(process.env.PORT || 8008);

	// start livereload
	livereload.listen();
	localreload = true;

	// start watching
    gulp.watch(['./src/*.{html,json}'], ['root']);
    gulp.watch(['./src/components/**/*.html'], ['views']);
	// todo add headless unit testing
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['jsnomin','lint']);
	gulp.watch('./src/css/*.css', ['cssnomin']);
});

// watches for changes and updates a remote server
gulp.task('watchremote', function() {

	// start livereload
	livereload.listen();
	remotereload = true;

    gulp.watch(['./src/*.{html,json}'], ['remoteroot']);
    gulp.watch(['./src/components/**/*.html'], ['remoteviews']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['remotejs']);
	gulp.watch('./src/css/*.css', ['remotecss']);
});

// remote versions of the tasks so the upload doesn't happen until the file is generated
gulp.task('remoteroot', function(done){
	runsequence('root','upload',done);
});
gulp.task('remoteviews', function(done){
	runsequence('views','upload',done);
});
gulp.task('remotejs', function(done){
	// todo add headless unit testing
	runsequence('jsnomin','lint','upload',done);
});
gulp.task('remotecss', function(done){
	runsequence('cssnomin','upload',done);
});

// copies all unminified resources to dist and starts a local server
gulp.task('copydev', ['cssnomin','img','jsnomin','root']);

// sets up the unminified version of the code and starts the local watch task
gulp.task('default', function(done) {
	runsequence('clean','bower','copydev','watch',done);
});

// sets up the unminified version of the code and starts the remote watch task
gulp.task('remote', function(done) {
	runsequence('clean','bower','copydev','upload','watchremote',done);
});