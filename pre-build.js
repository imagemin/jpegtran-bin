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

var proxyServer = process.env.HTTPS_PROXY
	|| process.env.https_proxy
	|| process.env.HTTP_PROXY
	|| process.env.http_proxy;

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

if (fs.existsSync(binPath)) {
	runTest();
} else {
	if (!fs.existsSync(path.dirname(binPath))) {
		mkdir.sync(path.dirname(binPath));
	}

	if (proxyServer) {
    	request = request.defaults({ proxy: proxyServer, timeout: 5000 });
  	}

	return request.get(jpegtran.url)
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
