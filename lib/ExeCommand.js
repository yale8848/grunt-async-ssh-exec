/**
 * Create by yale
 */


let logjs = require('log4js').getLogger();

function Log(h, c) {
    this.host = h;
    this.c = c;
    this.info = function(s) {
        let h = this.host ? this.host + " : " : "";
        let c = this.c ? this.c + ' : ' : '';
        logjs.info(h + c + s);
    };
    this.error = function(s) {
        let h = this.host ? this.host + " : " : "";
        let c = this.c ? this.c + ' : ' : '';
        logjs.error(h + c + s);
    };
}

module.exports = class ExeCommand {
    constructor(context) {
        this.context = context;
    };

    exeOne(commds) {
        let commd = commds.exe;
        return new Promise((resolve, reject) => {
            let Client = require('ssh2').Client;
            let _this = this;
            let conn = new Client();

            let log = new Log(_this.context.host, commd);
            log.info("start");
            conn.on('connect', () => {
                log.info("connect");
            }).on('ready', function() {
                log.info('ready');
                conn.exec(commd, function(err, stream) {
                    if (err) {
                        log.error('err' + err);
                        reject(err);
                        system.exit(1);
                    }
                    stream.on('close', function(code, signal) {
                        log.info('close :: code: ' + code);
                        conn.end();
                    }).on('exit', function(exitCode) {
                        log.info(': exitCode  ' + exitCode);
                        resolve();
                    }).on('data', function(data) {
                        if (!commds.silent) {
                            log.info('-STDOUT: \r\n' + data);
                        }
                    }).stderr.on('data', function(data) {
                        if (!commds.silent) {
                            log.error('-STDERR:' + data + '\r\n');
                        }
                        if (commds.interrupt) {
                            process.exit(1);

                        }

                    });
                });
            }).on('timeout', () => {
                log.error(_this.context.host + ' : ' + commd + 'err' + err);
                system.exit(1);
            }).connect(_this.context);
        });

    };
    exe(commds) {

        return new Promise((res, rej) => {
            let commd = commds.exe;
            let Client = require('ssh2').Client;
            let _this = this;
            let conn = new Client();
            let log = new Log(_this.context.host, commd);
            log.info("start");
            conn.on('connect', () => {
                log.info('connect');
            }).on('ready', function() {
                log.info('ready');
                conn.exec(commd, function(err, stream) {
                    if (err) {
                        log.error('err' + err);
                        system.exit(1);
                    }
                    stream.on('close', function(code, signal) {
                        log.info('close :: code: ' + code);
                        conn.end();
                    }).on('exit', function(exitCode) {
                        log.info('exitCode  ' + exitCode);
                        res();
                    }).on('data', function(data) {
                        if (!commds.silent) {
                            log.info('-STDOUT: \r\n' + data);
                        }
                    }).stderr.on('data', function(data) {
                        if (!commds.silent) {
                            log.error('-STDERR:' + data + '\r\n');
                        }
                        if (commds.interrupt) {
                            process.exit(1);

                        }

                    });
                });
            }).on('timeout', () => {
                log.error('err :' + err);
                system.exit(1);
            }).connect(_this.context);
        });


    };
    exesSync(commands) {

        let _this = this;
        return new Promise((res, rej) => {
            (async() => {
                for (let item in commands) {
                    await _this.exe(commands[item]);
                }
                res();
            })();

        });

    };
    exesAsync(commands, done, count, length) {

        let _this = this;

        (async() => {
            for (let item in commands) {
                let test = await _this.exeOne(commands[item]);
            }
            count.value++;
            if (length == count.value) {
                done(true);
            }
        })();
    }
}