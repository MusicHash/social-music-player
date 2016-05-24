const MIN_DEV_PORT = 8000;

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {development as devConfig, distribution as distConfig} from '../../webpack.config';


/**
 * WebPack task runner
 */
const webpackRun = (env, cfg, callback, devPort) => {
    let onRun = (err, onSuccess) => {
        if (err) {
            throw new gutil.PluginError(env, err);
        }

        // keep the server alive or continue?
        callback();

        if ('function' === typeof onSuccess) {
            onSuccess();
        }
    };

    // run dev server
    if (MIN_DEV_PORT <= devPort) {
        new WebpackDevServer(webpack(cfg), {/* server options */}).listen(devPort, 'localhost', (err, stats) => {
            onRun(err, () => {
                gutil.log('[' + env + ':' + devPort + ']', 'http://localhost:' + devPort + '/webpack-dev-server/index.html');
            });
        });

        return; // quit here.
    }

    // run webpack
    webpack(cfg).run((err, stats) => {
        onRun(err, () => {
            gutil.log('[' + env + ']', stats.toString({
                colors: true
            }));
        });
    });
};


gulp.task('webpack:dev', callback => {
    let cfg = Object.create(devConfig);
    cfg.output.pathinfo = true;

    webpackRun('webpack:dev', cfg, callback);
});


gulp.task('webpack-dev-server:dev', callback => {
    let cfg = Object.create(devConfig);
    cfg.output.pathinfo = true;

    webpackRun('webpack-dev-server:dev', cfg, callback, 8080);
});


gulp.task('webpack:dist', callback => {
    let cfg = Object.create(distConfig);

    webpackRun('webpack:dist', cfg, callback);
});


gulp.task('webpack-dev-server:dist', callback => {
    let cfg = Object.create(distConfig);

    webpackRun('webpack-dev-server:dist', cfg, callback, 8081);
});