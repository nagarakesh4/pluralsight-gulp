//run by gulp hello-world

//import gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var gulpprint = require('gulp-print');
var gulpif = require('gulp-if');
var args = require('yargs').argv;

function log(msg) {
	util.log(util.colors.red(msg));
}

//create task
gulp.task('vet', function () {
	log('Analyzing source');
    return gulp
   		.src([
			'./src/**/*.js',
		    './*.js'
	    ])
		.pipe(gulpif(args.hello, gulpprint()))//if condition on 'verbose' arguments to print gulppprint
		//.pipe(gulpprint()) //prints all the source files
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});