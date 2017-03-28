/*
 * grunt-async-ssh-exec
 * https://github.com/yale8848/grunt-async-ssh-exec.git
 *
 * Copyright (c) 2017 yale8848
 * Licensed under the MIT license.
 */

let ExeCommand = require('../lib/ExeCommand');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('async_ssh_exec', 'grunt async ssh exec shell commands', function() {


        let data = this.data;
        let hosts = data.server.host;

        let addDefalutExe = () => {
            for (let j in data.exeCommands) {
                if (data.exeCommands[j].silent == undefined) {
                    data.exeCommands[j].silent = false;
                }
                if (data.exeCommands[j].interrupt == undefined) {
                    data.exeCommands[j].interrupt = false;
                }
            }
            if (data.async == undefined) {
                data.async = true;
            }
            if (typeof data.server.host == 'string') {
                hosts = [];
                hosts.push(data.server.host);
            }
        };
        addDefalutExe();
        if (data.async) {
            let count = { value: 0 };
            let done = this.async();
            for (let i in hosts) {
                let server = JSON.parse(JSON.stringify(data.server));
                server.host = hosts[i];
                let exe = new ExeCommand(server);

                exe.exesAsync(data.exeCommands, done, count, hosts.length);
            }
        } else {

            (async() => {
                let done = this.async();
                for (let i in hosts) {
                    let server = JSON.parse(JSON.stringify(data.server));
                    server.host = hosts[i];
                    let exe = new ExeCommand(server);

                    await exe.exesSync(data.exeCommands);
                    if (i == hosts.length - 1) {
                        done();
                    }
                }

            })();
        }
    });

};