module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        jslint: {
            base: {
                src: [
                    'testing-parse/js/**/*.js'
                ],
                exclude: [
                    'testing-parse/js/**/*.min.js',
                    'testing-parse/js/gen/**/*.js',
                    'testing-parse/js/vend/**/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery',
                        '$',
                        'Parse'
                    ]
                },
                options: {
                    edition: 'latest',
                    junit: 'testing-parse/out/junit.xml',
                    log: 'testing-parse/out/lint.log',
                    jslintXml: 'testing-parse/out/jslint.xml',
                    errorsOnly: true,
                    failOnError: true,
                    checkstyle: 'testing-parse/out/server-checkstyle.xml'
                }
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            base: {
                src: [
                    'testing-parse/ts/**/*.ts'
                ]
            }
        },
        typescript: {
            base: {
                src: [
                    'testing-parse/ts/**/*.ts'
                ],
                dest: 'testing-parse/js/gen'
            }
        },
        watch: {
            scripts: {
                files: [
                    'testing-parse/ts/**/*.ts'
                ],
                tasks: [
                    'typescript'
                ]
            }
        }
    });

    grunt.registerTask('build', ['typescript']);
    grunt.registerTask('lint', ['tslint', 'jslint']);
    grunt.registerTask('default', ['tslint', 'build', 'jslint']);
};
