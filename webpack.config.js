let fs = require('fs'),
    path = require('path'),
    PATH_BASE = path.resolve(__dirname),
    webpack = require('webpack'),
    packageJSON = JSON.parse(fs.readFileSync('./package.json'));


/**
 *
 */
const babel = {
    entry: path.resolve(PATH_BASE, 'src/social_music_player.js'),

    output: {
        path: path.resolve(PATH_BASE, 'dist/js'),
        filename: 'smp.min.js',
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
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline'
            }
        ]
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


/**
 *
 */
export var distribution = Object.assign({}, babel, {
    debug: false,

    plugins: babel.plugins.concat([
        new webpack.DefinePlugin({
            __DEBUG__: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            },

            __VERSION__: JSON.stringify(packageJSON.version)
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ])
});


/**
 *
 */
export var development = Object.assign({}, babel, {
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