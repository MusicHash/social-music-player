import gulp from 'gulp';
import run from 'run-sequence';

gulp.task('deploy', callback => {
    return run(
        'clear:dist',
        'webpack:dist',
        'gh-pages',
        callback
    );
});