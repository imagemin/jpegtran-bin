'use strict';
var exec = require('child_process').exec;
var colors = require('colors');
var binPath = require('./lib/jpegtran-bin.js').path;
var which = require('which');
var path = require('path');

which ('make', function (err) {
    if (err) {
        return console.log(err.red);
    }

    if (process.platform === 'darwin' || process.platform === 'linux') {
        var binDir = path.dirname(binPath);
        var host = (process.platform === 'darwin') ? 'i686-apple-darwin' : 'i686-pc-linux-gnu';
        var buildScript = 'make clean &&' +
                          './configure --disable-shared --host ' + host + ' CFLAGS=\'-O3 -m32\' LDFLAGS=-m32 &&' +
                          'make &&' +
                          'mv jpegtran ' + binDir;
        exec(buildScript, { cwd: './libjpeg-turbo/' }, function (err) {
            if (err) {
                return console.log(err.red);
            }

            console.log('libjpeg-turbo rebuilt successfully'.green);
        });
    }
});
