var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        './src/main'
    ],
    output: {
        path: __dirname + '/build/',
        filename: 'app.js',
        publicPath: 'http://localhost:9090/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader?stage=0'
                ]
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'css-loader!cssnext-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ],
        modulesDirectories: [
            'node_modules',
            'src',
            'test'
        ]
    },
    cssnext: {
        compress: true,
        features: {
            rem: false,
            pseudoElements: false,
            colorRgba: false
        }
    }
};
