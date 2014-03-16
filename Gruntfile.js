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
        less: {
            'app/css/main.css': 'app/less/_build.less'
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            less: {
                files: 'app/less/*.less',
                tasks: ['less']
            }
        },
        nodemon: {
            dev: {
                script: ['server.js'],
                options: {
                    watch: ['server.js', 'routes/*.js']
                }
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
