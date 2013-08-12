'use strict';
var fs = require('fs');
var path = require('path');
var request = require('request');
var chalk = require('chalk');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var build = require('./build');
var jpegtran = require('./lib/jpegtran');
var binPath = jpegtran.path;

function runTest() {
	mocha.addFile('test/test-path.js');
	mocha.run(function (failures) {
		if (failures > 0) {
			console.log(chalk.red('pre-build test failed, compiling from source...'));
			build();
		} else {
			console.log(chalk.green('pre-build test passed successfully, skipping build...'));
		}
	});
}

if (fs.exists(binPath)) {
	runTest();
} else {
	request.get(jpegtran.url)
		.pipe(fs.createWriteStream(binPath))
		.on('close', function () {
			fs.chmod(binPath, '0755');
			if (process.platform === 'win32') {
				request.get(jpegtran.urlDll)
					.pipe(fs.createWriteStream(jpegtran.pathDll))
					.on('close', function () {
						runTest();
					});
			} else {
				runTest();
			}
		});
}
