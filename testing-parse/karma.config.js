module.exports = function(config) {
    'use strict';

    config.set({
        files: [
            './test/polyfill.js',
            './test/main.js'
        ],
        preprocessors: {
            './test/main.js': [
                'webpack'
            ]
        },
        browsers: [
            'PhantomJS'
        ],
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        reporters: [
            'progress',
            'coverage'
        ],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {
                    type: 'lcovonly',
                    subdir: '.',
                    file: 'lcov.info'
                }, {
                    type: 'html',
                    subdir: 'html'
                }
            ]
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader?stage=0'
                    }
                ],
                postLoaders: [{
                    test: /\.jsx?$/,
                    exclude: /(test|node_modules)\//,
                    loader: 'istanbul-instrumenter'
                }]
            },
            resolve: {
                extensions: [
                    '',
                    '.js',
                    '.jsx'
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true,
        plugins: [
            'karma-mocha',
            'karma-webpack',
            'karma-coverage',
            'karma-sinon-chai',
            'karma-phantomjs-launcher'
        ]
    });
};
