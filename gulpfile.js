//run by gulp hello-world

//import gulp
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy: true});

function log(msg) {
	$.util.log($.util.colors.yellow(msg));
}

//create task
gulp.task('vet', function() {
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
//before running styles please clear all styles - add dependency
gulp.task('styles', ['clear-styles'], function() {
	log('Compiling and creating Stylesheets');
	return gulp
		.src(config.styles)
		.pipe($.plumber())//error handling
		//.on('error', errorMessage)
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 5 version', '> 1%']
		})) //get the auto prefixer from website
		//use browsers that are having >1% in market - vendor prefixes
		.pipe(gulp.dest(config.temp));
});

//now delete existing styles in the temp folder
//instead of running this task in separate add this as dependency to 'styles' task to execute ahead
//add a callback 'done' so that task 'styles' will wait until 'clear-styles' is run, this task should not be a stream but a callback - didnt work had to remove
gulp.task('clear-styles', function() {
	log('Clearing styles');
	var files = config.temp + '**/*.css'; //delete all css files
	cleanFiles(files);
});

//create a watch task for changes in styles are reflected immediately in the temp
gulp.task('styles-watcher', function(){
	//watch API
	gulp.watch([config.styles], ['styles']);//all the files to watch for changes, all the tasks to kickoff for any change
});

//pass the callback
function cleanFiles(path){
	log('Cleaning file ' + $.util.colors.red(path));
	del(path); //del function already has arguments for callback
}

//function errorMessage(msg){
//	log("start of error message");
//	log(msg);
//	log("end of error message");
//	this.emit('error');
//}