'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-react');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            target: [
                'testing-parse/js/**/*.jsx'
            ]
        },
        react: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'testing-parse/js',
                        src: [
                            '**/*.jsx'
                        ],
                        dest: 'testing-parse/js/gen',
                        ext: '.js'
                    }
                ]
            },
            options: {
                harmony: true,
                es6module: true
            }
        },
        babel: {
            options: {
                modules: 'amd'
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'testing-parse/js/gen',
                        src: [
                            '**/*.js'
                        ],
                        dest: 'testing-parse/js/dist',
                        ext: '.js'
                    }
                ]
            }
        },
        uglify: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'testing-parse/js/dist',
                        src: [
                            '**/*.js'
                        ],
                        dest: 'testing-parse/js/dist',
                        ext: '.min.js'
                    }
                ]
            },
            options: {
                compress: true,
                mangle: true,
                mangleProperties: true
            }
        },
        watch: {
            js: {
                files: [
                    'testing-parse/js/**/*.jsx'
                ],
                tasks: [
                    'build'
                ]
            }
        }
    });

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('build', ['react', 'babel', 'uglify']);
    grunt.registerTask('default', ['lint', 'build']);
};
