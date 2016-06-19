/**
 * gh-pages
 */
import gulp from 'gulp';
import replace from 'gulp-replace';
import ghPages from 'gulp-gh-pages';
import config from '../config';

gulp.task('gh-pages', function() {
  return gulp
    .src(['./playground/**/*', './dist/**/*'])
    .pipe(replace(/\.\.\/dist\//g, ''))
    .pipe(ghPages());
});