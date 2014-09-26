var gulp = require('gulp');
var clean = require('gulp-rimraf');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var bowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var karma = require('karma').server;
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

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
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
});

// use protractor to run system tests
gulp.task('system', function() {
	return gulp.src('fake/path');
	// todo setup the system testing
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
	
	return gulp.src(bowerFiles())
	
		// copy the javascript
		.pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('vendor.min.js'))
		.pipe(stripDebug())
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

// copy the views
gulp.task('views', function() {
	return gulp.src(['./src/components/**/*.html','./src/app/**/*.html'])
		.pipe(gulp.dest('./dist/views/'))
		.pipe(gulpif(reloading, livereload()));
});

// combine, minify and copy the css
gulp.task('css', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('app.css'))
		.pipe(cssminify())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulpif(reloading, livereload()));
});

// combine and copy the css
gulp.task('cssnomin', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(gulpif(reloading, livereload()));
});

// minify and copy images
gulp.task('img', function() {
	return gulp.src('./src/img/*.{ico,gif,png}')
		.pipe(changed('./dist/img/'))
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'))
		.pipe(gulpif(reloading, livereload()));
});

// build concatenated and minified javascript
gulp.task('js', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
		.pipe(stripDebug())
		.pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(gulpif(reloading, livereload()));		
});

// build concatenated javascript
gulp.task('jsnomin', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
		.pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
		.pipe(ngAnnotate())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(gulpif(reloading, livereload()));
});

// copy the root
gulp.task('root', function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(gulpif(reloading, livereload()));
});

// copies all resources to dist
gulp.task('copy', ['views','css','img','js','root']);

// clean and build dist
gulp.task('build', function() {
	runSequence('lint','unit','clean','copy','system');
});

/* upload task */

// copy dist to the server/environment specified (uses yargs), cleaning it first
gulp.task('upload', function() {
	var paths = getPaths();
	for (var i = 0; i < paths.length; i++) {
		gulp.src(paths[i] + '*', {read: false})
			.pipe(clean());
		gulp.src('./dist/**/*.*')
			.pipe(gulp.dest(paths[i]));
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

var reloading = false;

gulp.task('watch', function() {
	var connect = require('connect');
	var serveStatic = require('serve-static');

	// create the server
	var server = connect();
	server.use(serveStatic('./dist/'));
	server.listen(process.env.PORT || 80);

	// start livereload
	livereload.listen();
	reloading = true;

	// start watching
    gulp.watch(['./src/.html'], ['root']);
    gulp.watch(['./src/components/**/*.html'], ['views']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['jsnomin']);
	gulp.watch('./src/css/*.css', ['cssnomin']);
});

gulp.task('watchremote', function() {
    gulp.watch(['./src/*.html','./src/components/**/*.html'], ['copydevremote']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['copydevremote']);
    gulp.watch('./src/css/*.css', ['copydev']);
});

// copies all unminified resources to dist and starts a local server
gulp.task('copydev', function() {
	runSequence(
		['lint','unit'],
		['views','cssnomin','img','jsnomin','root']
	);
});

// copies all unminified resources to dist and then to the remote server
gulp.task('copydevremote', function() {
	runSequence(
		['lint','unit'],
		['views','cssnomin','img','jsnomin','root'],
		'upload');
});

gulp.task('default', function() {
	runSequence('clean','bower','copydev','watch');
});

gulp.task('remote', function() {
	runSequence('clean','bower','copydev','watchremote');
});