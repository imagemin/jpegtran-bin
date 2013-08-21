'use strict';
var fs = require('fs');
var path = require('path');
var mkdir = require('mkdirp');
var request = require('request');
var chalk = require('chalk');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var build = require('./build');
var jpegtran = require('./lib/jpegtran');
var binPath = jpegtran.path;

function runTest(done) {
	mocha.addFile('test/test-path.js');
	mocha.run(function (failures) {
        done(failures > 0);
	});
}
function fetchBinary(done) {
	return request.get(jpegtran.url)
		.pipe(fs.createWriteStream(binPath))
		.on('close', function () {
			fs.chmod(binPath, '0755');
			if (process.platform === 'win32') {
				request.get(jpegtran.urlDll)
					.pipe(fs.createWriteStream(jpegtran.pathDll))
					.on('close', function () {
						done();
					});
			} else {
				done();
			}
		});
}

runTest(function(err) {
    if (!err) return console.log(chalk.green('pre-build test passed successfully, skipping build...'));

    console.log(chalk.red('pre-build packaged binary test failed'));
    fetchBinary(function() {
        runTest(function(err) {
            if (!err) return console.log(chalk.green('pre-build test passed successfully, skipping build...'));

            console.log(chalk.red('pre-build fetched binary test failed, attempt compiling'));
            build();
        });
    }); 
});

