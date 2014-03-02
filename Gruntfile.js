'use strict';
module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            server: {
                files: ['routes/*.js']
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['concurrent']);
};
