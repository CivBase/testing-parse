module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: '../src/angular/scripts/**/*.js',
                dest: '../src/angular/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            js: {
                src: '../src/angular/dist/<%= pkg.name %>.js',
                dest: '../src/angular/dist/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
