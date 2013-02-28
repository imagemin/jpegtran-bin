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
        var host = (process.platform === 'darwin') ? ' --host i686-apple-darwin' : '';
        var buildScript = './configure --disable-shared ' + host + ' CFLAGS=\'-O3 -m64\' LDFLAGS=-m64 && ' +
                          'make install prefix=' + __dirname + '/libjpeg-turbo/ bindir=' + binDir + ' bin_PROGRAMS=jpegtran'
        exec(buildScript, { cwd: './libjpeg-turbo/' }, function (err) {
            if (err) {
                return console.log(err.red);
            }

            console.log('libjpeg-turbo rebuilt successfully'.green);
        });
    }
});
