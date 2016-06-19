import gulp from 'gulp';
import del from 'del';
import config from '../config';

gulp.task('clear:dist', () => {
    return del([
        './dist',
        './.publish'
    ]);
});