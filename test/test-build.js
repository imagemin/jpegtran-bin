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
		var bin = new Bin(options);

		bin.path = path.join(__dirname, '../tmp', bin.bin);
		bin.buildScript = './configure --disable-shared --prefix="' + bin.path + '" && ' + 'make install';

		bin.build(function (err) {
			if (err) {
				cb(err);
			}

			var origCTime = fs.statSync(bin.path).ctime;
			var actualCTime = fs.statSync(bin.path).ctime;

			assert(actualCTime !== origCTime);
			cb();
		});
	});
});
