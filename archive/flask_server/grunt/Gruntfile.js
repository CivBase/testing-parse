module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        react: {
            compile: {
                files: {
                    '../app/static/scripts/foo/foo.compiled.js': [
                        '../app/static/scripts/foo/foo.jsx'
                    ]
                }
            }
        },
        concat: {
            js: {
                src: '../app/static/scripts/foo/*.compiled.js',
                dest: '../app/static/dist/foo.js'
            }
        },
        uglify: {
            js: {
                src: '../app/static/dist/foo.js',
                dest: '../app/static/dist/foo.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['react', 'concat', 'uglify']);
};
