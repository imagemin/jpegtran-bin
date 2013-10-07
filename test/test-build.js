/*global describe, it */
'use strict';

var assert = require('assert');
var Bin = require('bin-wrapper');
var fs = require('fs');
var options = require('../lib/jpegtran').options;
var path = require('path');

describe('jpegtran.build()', function () {
	it('should rebuild the jpegtran binaries', function (cb) {
		this.timeout(false);
		var configureFlags = '--disable-shared ';

		if (process.platform === 'darwin') {
			configureFlags += '--host i686-apple-darwin ';
		}

		if (process.platform === 'linux' && process.arch === 'x64') {
			configureFlags += 'CFLAGS=\'-O3 -m64\' LDFLAGS=-m64';
		} else {
			configureFlags += 'CFLAGS=\'-O3 -m32\' LDFLAGS=-m32';
		}

		options.path = path.join(__dirname, '../tmp');
		options.buildScript = './configure ' + configureFlags + ' &&' +
							  ' make install bindir=' + path.join(__dirname, '../tmp') + ' bin_PROGRAMS=jpegtran';

		var bin = new Bin(options);

		bin.build(function () {
			var origCTime = fs.statSync(bin.path).ctime;
			var actualCTime = fs.statSync(bin.path).ctime;

			assert(actualCTime !== origCTime);
			cb();
		});
	});
});
