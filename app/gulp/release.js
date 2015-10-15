'use strict';

var path = require('path');
var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

gulp.task('bower:release', ['bower:scripts'], function() {

});

gulp.task('bower:scripts', function() {
  return gulp.src(path.join(paths.src, '/app/triangular/**/*.js'))
    .pipe($.angularFilesort())
    .pipe($.debug({title:'script'}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.ngAnnotate())
    .pipe($.concat('triangular.js'))
    .pipe(gulp.dest('../dist'));
});