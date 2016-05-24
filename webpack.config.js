let extend = require('util')._extend,
    path = require('path'),
    PATH_BASE = path.resolve(__dirname),
    webpack = require('webpack');


const babel = {
    entry: path.resolve(PATH_BASE, 'src/bootstrap.js'),

    output: {
        path: path.resolve(PATH_BASE, 'dist/js'),
        filename: 'player.min.js',
        libraryTarget: 'umd',
        pathinfo: false
    },


    debug: true,


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


export var distribution = extend(babel, {
    debug: false,

    plugins: babel.plugins.concat([
        new webpack.DefinePlugin({
            __DEBUG__: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ])
});


export var development = extend(babel, {
    debug: true,
    devtool: '#eval-source-map',

    plugins: babel.plugins.concat([
        new webpack.DefinePlugin({
            __DEBUG__: true
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'development'
            }
        })
    ])
});