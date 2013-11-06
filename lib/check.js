'use strict';

var bin = require('./jpegtran').bin;
var chalk = require('chalk');
var path = require('path');

var args = [
	'-copy', 'none',
	'-optimize',
	'-outfile', path.join(__dirname, '../test/minified.jpg'),
	path.join(__dirname, '../test/fixtures/test.jpg')
];

bin.check(args, function (w) {
	if (!w) {
		console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

		if (process.platform === 'win32') {
			return console.log(chalk.yellow('? building is not supported on ' + process.platform));
		}

		return bin.build(function (err) {
			if (err) {
				return console.log(chalk.red('✗ ' + err.message));
			}

			console.log(chalk.green('✓ jpegtran rebuilt successfully'));
		});
	}

	console.log(chalk.green('✓ pre-build test passed successfully'));
});
