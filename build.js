'use strict';
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');
var which = require('which');
var chalk = require('chalk');
var tar = require('tar');
var request = require('request');
var zlib = require('zlib');
var tmpdir = os.tmpdir ? os.tmpdir() : os.tmpDir();
var binPath = require('./lib/jpegtran').path;
var version = '1.2.90';
var tmpPath = path.join(tmpdir, 'libjpeg-turbo-' + version);
var urlPath = 'http://downloads.sourceforge.net/project/libjpeg-turbo/1.2.90%20%281.3beta1%29/libjpeg-turbo-' + version + '.tar.gz';

module.exports = function () {
	if (!(process.platform === 'darwin' || process.platform === 'linux')) {
		return;
	}

	var opts = {
		type: 'Directory',
		path: tmpPath,
		strip: 1
	};

	var proxy = process.env.http_proxy || process.env.HTTP_PROXY ||
		process.env.https_proxy || process.env.HTTPS_PROXY || '';

	console.log(chalk.yellow('Fetching %s...'), urlPath);

	var req = request.defaults({ proxy: proxy }).get(urlPath, function (err, resp) {
		if (resp.statusCode !== 200) {
			throw err;
		}
	});

	req
		.pipe(zlib.Gunzip())
		.pipe(tar.Extract(opts))
		.on('close', function () {
			console.log(chalk.green('Done in %s'), tmpPath);

			which('make', function (err) {
				if (err) {
					throw err;
				}

				console.log(chalk.yellow('\nBuilding libjpeg-turbo...'));

				var binDir = path.dirname(binPath);
				var configureFlags = '--disable-shared ';

				if (process.platform === 'darwin') {
					configureFlags += '--host i686-apple-darwin ';
				}

				if (process.platform === 'linux' && process.arch === 'x64') {
					configureFlags += 'CFLAGS=\'-O3 -m64\' LDFLAGS=-m64';
				} else {
					configureFlags += 'CFLAGS=\'-O3 -m32\' LDFLAGS=-m32';
				}

				var buildScript = './configure ' + configureFlags + ' &&' +
								  'make install prefix=' + tmpPath +
								  ' bindir=' + binDir + ' bin_PROGRAMS=jpegtran';

				exec(buildScript, { cwd: tmpPath }, function (err) {
					if (err) {
						throw err;
					}

					console.log(chalk.green('libjpeg-turbo rebuilt successfully'));
				});
			});
		});
};
