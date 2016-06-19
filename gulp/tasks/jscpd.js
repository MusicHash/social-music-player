/**
 * jscpd, finds duplicate code
 */
import gulp from 'gulp';
import jscpd from 'gulp-jscpd';
import config from '../config';


gulp.task('jscpd', () => {
    return gulp.src([config.path.js.files])
        .pipe(jscpd(config.jscpd));
});