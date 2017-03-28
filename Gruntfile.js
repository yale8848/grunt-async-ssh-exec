/*
 * grunt-async-ssh-exec
 * https://github.com/yale8848/grunt-async-ssh-exec.git
 *
 * Copyright (c) 2017 yale8848
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        async_ssh_exec: {
            main: {
                async: false,
                server: {
                    host: ["192.168.72.129", "192.168.72.130"],
                    port: 22,
                    username: "root",
                    password: "123456"
                },
                exeCommands: [
                    { exe: "cd /home/server/DXHQuestServer/deploy/shell/test && chmod 777 *", silent: false, interrupt: false },
                    { exe: "bash /home/server/DXHQuestServer/deploy/shell/test/start.sh", silent: false, interrupt: false }
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'async_ssh_exec', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['async_ssh_exec:main']);

};