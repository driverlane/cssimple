var gulp = require('gulp');
var clean = require('gulp-rimraf');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var bowerfiles = require('main-bower-files');
var annotate = require('gulp-ng-annotate');
var karma = require('karma').server;
var argv = require('yargs').argv;
var runsequence = require('run-sequence');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var protractor = require('protractor');
var exec = require('child_process').exec;
var gutil = require('gulp-util');

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
});

// headless version for watch based testing
gulp.task('unitlight', function(done) {
	/*karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		browsers: ['PhantomJS']
	}, done);*/
});

// use protractor to run system tests
gulp.task('system', function (cb) {
  /*exec('node .\\node_modules\\protractor\\bin\\protractor -configFile protractor.config.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });*/
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
		.pipe(stripdebug())
		.pipe(annotate())
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
		.pipe(annotate())
        .pipe(gulp.dest('./dist/js/'))
		.pipe(gulpif(reloading, livereload()));
});

// copy the root
gulp.task('root', function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(gulpif(reloading, livereload()));
});

// copy the views
gulp.task('views', function() {
	return gulp.src(['./src/components/**/*.html','./src/app/**/*.html'])
		.pipe(gulp.dest('./dist/views/'))
		.pipe(gulpif(reloading, livereload()));
});

// copies all resources to dist
gulp.task('copy', ['css','img','js','root','views']);

// clean and build dist
gulp.task('build', function() {
	runsequence('lint','unit','clean','bower','copy','system');
});

/* upload task */

// copy dist to the server/environment specified (uses yargs), cleaning it first
gulp.task('upload', function() {
	var paths = getPaths();
	for (var i = 0; i < paths.length; i++) {
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
	server.listen(process.env.PORT || 8008);

	// start livereload
	livereload.listen();
	reloading = true;

	// start watching
    gulp.watch(['./src/*.html'], ['root']);
    gulp.watch(['./src/components/**/*.html'], ['views']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['jsnomin','lint','unitlight']);
	gulp.watch('./src/css/*.css', ['cssnomin']);
});

gulp.task('watchiis', function() {

	// start livereload
	livereload.listen();
	reloading = true;

    gulp.watch(['./src/*.html'], ['root']);
    gulp.watch(['./src/components/**/*.html'], ['views']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['jsnomin','lint','unitlight']);
	gulp.watch('./src/css/*.css', ['cssnomin']);
});

// copies all unminified resources to dist and starts a local server
gulp.task('copydev', function() {
	runsequence(
		['lint','unit'],
		['views','cssnomin','img','jsnomin','root']
	);
});

gulp.task('default', function() {
	runsequence('clean','bower','copydev','watch');
});

gulp.task('iis', function() {
	runsequence('clean','bower','copydev','watchiis');
});