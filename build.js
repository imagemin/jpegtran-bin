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
        var configureFlags = '--disable-shared ';
        if (process.platform === 'darwin'){
            configureFlags += '--host i686-apple-darwin ';
        }
        if (process.platform === 'linux' && process.arch === 'x64'){
            configureFlags += 'CFLAGS=\'-O3 -m64\' LDFLAGS=-m64';
        } else {
            configureFlags += 'CFLAGS=\'-O3 -m32\' LDFLAGS=-m32';
        }

        var buildScript = './configure ' + configureFlags + ' &&' +
                          'make install prefix=' + __dirname + '/libjpeg-turbo/ bindir=' + binDir + ' bin_PROGRAMS=jpegtran';

        exec(buildScript, { cwd: './libjpeg-turbo/' }, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('libjpeg-turbo rebuilt successfully'.green);
        });
    }
});
