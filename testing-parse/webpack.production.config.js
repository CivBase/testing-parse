module.exports = {
    entry: './src/main',
    output: {
        path: __dirname + '/build/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?stage=0'
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
    }
};
