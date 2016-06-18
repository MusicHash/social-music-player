'use strict';

/**
 * gh-pages
 */
const gulp = require('gulp'),
      replace = require('gulp-replace'),
      ghPages = require('gulp-gh-pages'),
      config = require('./../config');

gulp.task('deploy', function() {
  return gulp
    .src(['./playground/**/*', './dist/**/*'])
    .pipe(replace(/\.\.\/dist\//g, ''))
    .pipe(ghPages());
});