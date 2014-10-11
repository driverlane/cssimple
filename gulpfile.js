var gulp = require('gulp'),
clean = require('gulp-rimraf'),
changed = require('gulp-changed'),
concat = require('gulp-concat'),
cssminify = require('gulp-minify-css'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'),
stripdebug = require('gulp-strip-debug'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
filter = require('gulp-filter'),
flatten = require('gulp-flatten'),
bowerfiles = require('main-bower-files'),
annotate = require('gulp-ng-annotate'),
karma = require('karma').server,
argv = require('yargs').argv,
runsequence = require('run-sequence'),
livereload = require('gulp-livereload'),
gulpif = require('gulp-if'),
plumber = require('gulp-plumber'),
protractor = require('protractor'),
exec = require('child_process').exec,
gutil = require('gulp-util');

/* testing tasks */

// lint the scripts
gulp.task('lint', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
		.pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// use karma to run unit tests
gulp.task('unit', function(done) {
	/*karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);*/
	return;
});

// headless version for watch based testing
gulp.task('unitlight', function(done) {
	/*karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		browsers: ['PhantomJS']
	}, done);*/
	return;
});

// use protractor to run system tests
gulp.task('system', function (cb) {
	/*exec('node .\\node_modules\\protractor\\bin\\protractor -configFile protractor.config.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});*/
	return;
});

// download/update the selenium server
gulp.task('updatewebdriver', function (cb) {
	exec('node .\\node_modules\\protractor\\bin\\webdriver-manager update --ie', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

/* dist tasks */

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
	// add unit and system testing
	runsequence('lint','clean','bower','copy',done);
});

/* upload task */

// copy dist to the server/environment specified (uses yargs), cleaning it first
gulp.task('upload', function() {
	var paths = getPaths();
	for (var i = 0; i < paths.length; i++) {
		gulp.src('./dist/**/*.*')
			.pip(changed(paths[i]))
			.pipe(gulp.dest(paths[i]))
			.pipe(gulpif(remotereload, livereload()));
	}
	return;
});

// converts the argument to an array of paths
function getPaths() {

	var paths = [];
	if (argv.server) {
		paths[0] = '\\\\' + argv.server + dev.path;
	}
	else {
		var env = getEnv(argv.env);
		for (var i = 0; i < env.servers.length; i++) {
			paths[i] = '\\\\' + env.servers[i] + env.path;
		}
	}
	return paths;
}

// return the environment, defaulting to cs105
function getEnv(name) {

	var cs105 = {"servers": ['content.cgi.demo'], 
		"path": '\\d$\\opentext\\wwwroot\\res\\csdumb\\'};
	var cs10 = {"servers": ['content2.cgi.demo'], 
		"path": '\\d$\\opentext\\wwwroot\\res\\csdumb\\'};

	if (name === 'cs10') {
		console.log('copying to Cloudshare CS 10');
		return cs10;
	}
	
	console.log('copying to Cloudshare CS 10.5');
	return cs105;
}

/* development tasks */

var localreload = false;
var remotereload = false;

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
gulp.task('copydev', function(done) {
	runsequence('views','cssnomin','img','jsnomin','root',done);
});

gulp.task('default', function(done) {
	runsequence('clean','bower','copydev','watch',done);
});

gulp.task('remote', function(done) {
	runsequence('clean','bower','copydev','watchremote',done);
});