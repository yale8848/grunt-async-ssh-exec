# grunt-async-ssh-exec

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> grunt async ssh exec shell commands

## Getting Started
This plugin requires Grunt `~0.4.5`

This plugin node  `~7.6.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-async-ssh-exec --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-async-ssh-exec');
```

## The "async_ssh_exec" task

### Overview
In your project's Gruntfile, add a section named `async_ssh_exec` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
        async_ssh_exec: {
            prod: {
                async: true,
                server: {
                    host: ["192.168.72.129", "192.168.72.130"],
                    port: 22,
                    username: "root",
                    password: "123456"
                },
                exeCommands: [
                    { exe: "uptime && uname", silent: false, interrupt: false },
                    { exe: "bash /home/server/tomcat/start.sh", silent: false, interrupt: false }
                ]
            }
        }
});

grunt.registerTask('default', ['async_ssh_exec:prod']);
```

### Options

#### async
Type: `boolen`

Default value: `true`

whether execommands async

#### server.host
Type: `Array`

host list

#### server.port
Type: `int`

#### server.username
Type: `String`

#### server.password
Type: `String`

#### exeCommands
Type: `Array`

#### exeCommands exe
Type: `String`

the shell commands

#### exeCommands silent
Type: `boolen`

Default value: `false`

whether show shell STDOUT,STDERR

#### exeCommands interrupt
Type: `boolen`

Default value: `false`

whether exit when STDERR or other error happen


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

