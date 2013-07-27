'use strict';

var fs = require('fs');
var path = require('path');
var request = require('request');
var colors = require('colors');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var build = require('./build.js');

function runTest() {
	mocha.addFile('test/test-jpegtran-path.js');
	mocha.run(function (failures) {
		if (failures > 0) {
			console.log('pre-build test failed, compiling from source...'.red);
			build();
		} else {
			console.log('pre-build test passed successfully, skipping build...'.green);
		}
	});
}

var binPath = require('./lib/jpegtran-bin').path;
var binUrl = require('./lib/jpegtran-bin').url;
var dllPath = require('./lib/jpegtran-bin').pathDll;
var dllUrl = require('./lib/jpegtran-bin').urlDll;

fs.exists(binPath, function (exists) {
	if (exists) {
		runTest();
	} else {
		request.get(binUrl)
			.pipe(fs.createWriteStream(binPath))
			.on('close', function () {
				fs.chmod(binPath, '0755');
				if (process.platform === 'win32') {
					request.get(dllUrl)
						.pipe(fs.createWriteStream(dllPath))
						.on('close', function () {
							runTest();
						});
				} else {
					runTest();
				}
			});
	}
});
