//run by gulp hello-world

//import gulp
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();

var $ = require('gulp-load-plugins')({lazy: true});

function log(msg) {
	$.util.log($.util.colors.yellow(msg));
}

//create task
gulp.task('vet', function () {
	log('Analyzing source');
    return gulp
   		.src(config.alljs)
		.pipe($.if(args.showAllFiles, $.print()))//if condition on 'verbose' arguments to print gulppprint
		//.pipe(gulpprint()) //prints all the source files
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});