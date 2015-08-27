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
          'js/**/*.js'
        ],
        exclude: [
          'js/**/*.min.js'
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
          junit: 'out/junit.xml',
          log: 'out/lint.log',
          jslintXml: 'out/jslint.xml',
          errorsOnly: true,
          failOnError: true,
          checkstyle: 'out/server-checkstyle.xml'
        }
      }
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      base: {
        src: [
          'ts/**/*.ts'
        ]
      }
    },
    typescript: {
      base: {
        src: [
          'ts/**/*.ts'
        ],
        dest: 'js/gen'
      }
    },
    watch: {
      scripts: {
        files: [
          'ts/**/*.ts'
        ],
        tasks: [
          'typescript'
        ]
      }
    }
  });
 
  grunt.registerTask('build', ['typescript']);
  grunt.registerTask('lint', ['jslint', 'tslint']);
  grunt.registerTask('default', ['tslint', 'build', 'jslint']);
};
