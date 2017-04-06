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
   		.src(config.alljs)//EXTENDABILITY
		.pipe($.if(args.showAllFiles, $.print()))//if condition on 'verbose' arguments to print gulppprint
		//.pipe(gulpprint()) //prints all the source files
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

//for css compiling from LESS - less, adding prefixes use autoprefixer
gulp.task('styles', function () {
	log('Compiling Stylesheets');
	return gulp
		.src(config.styles)
		.pipe($.less())
		.pipe($.autoprefixer({browsers: ['last 5 version', '> 1%']})) //get the auto prefixer from website
		//use browsers that are having >1% in market
		.pipe(gulp.dest(config.temp));
});

