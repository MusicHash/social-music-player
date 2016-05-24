import gulp from 'gulp';
import eslint from 'gulp-eslint';
import config from '../config';

/**
 * Eslint task runner
 */
gulp.task('eslint', () => {
    return gulp.src([config.path.js.files])
        .pipe(eslint({useEslintrc: true}))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('eslint:tasks', () => {
    return gulp.src(config.path.tasks.files)
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('eslint:tests', () => {
    return gulp.src(config.path.tests.files)
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});