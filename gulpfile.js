var gulp = require('gulp');
var clean = require('gulp-clean');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssminify = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
//var karma = require('gulp-karma');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

/* testing tasks */

// lint the scripts
gulp.task('lint', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
		.on('error', function(err) {
			throw err;
		});		
});

// use karma to run unit tests
gulp.task('unit', function() {
	return gulp.src('fake/path');
	// todo setup the unit testing
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
	return gulp.src('./src/bower_components/**/*')
		.pipe(changed('./dist/bower_components/'))
		.pipe(gulp.dest('./dist/bower_components/'));
});

// copy the views
gulp.task('views', function() {
	return gulp.src('./src/components/**/*.html')
		.pipe(gulp.dest('./dist/views/'));
});

// combine, minify and copy the css
gulp.task('css', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('style.css'))
		.pipe(cssminify())
		.pipe(gulp.dest('./dist/css/'));
});

// combine and copy the css
gulp.task('cssnomin', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./dist/css/'));
});

// minify and copy images
gulp.task('img', function() {
	return gulp.src('./src/img/*.{ico,gif,png}')
		.pipe(changed('./dist/img/'))
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'));
});

// build concatenated and minified javascript
gulp.task('js', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
		.pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

// build concatenated javascript
gulp.task('jsnomin', function() {
    return gulp.src(['./src/components/**/*.js','./src/app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// copy the root
gulp.task('root', function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist/'));
});

// copies all resources to dist
gulp.task('copy', ['bower','components','css','img','js','root']);

// clean and build dist
gulp.task('build', function() {
	runSequence('lint','unit','clean','copy','system');
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

/* default development tasks */
gulp.task('watch', function() {
    gulp.watch(['./src/*.html','./src/components/**/*.html'], ['copydev']);
    gulp.watch(['./src/components/**/*.js','./src/app/**/*.js'], ['copydev']);
    gulp.watch('./src/css/*.css', ['copydev']);
});

// copies all unminified resources to dist and then dev server
gulp.task('copydev', function() {
	runSequence(
		['lint','unit'],
		['bower','views','cssnomin','img','jsnomin','root'],
		'upload');
});

gulp.task('default', function() {
	runSequence('clean','copydev','watch');
});