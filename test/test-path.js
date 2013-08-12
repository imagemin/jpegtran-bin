/*global describe, it, after */
'use strict';
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var assert = require('assert');

describe('jpegtran', function () {
	after(function () {
		fs.unlinkSync('test/minified.jpg');
	});

	it('should return path to jpegtran binary', function (cb) {
		var binPath = require('../lib/jpegtran').path;

		exec('"' + binPath + '" -v -', function (err, stdout, stderr) {
			assert(stderr.toString().indexOf('libjpeg-turbo') !== -1);
			cb();
		});
	});

	it('should successfully proxy jpegtran', function (cb) {
		var binPath = path.join(__dirname, '../bin/jpegtran.js');

		exec('node "' + binPath + '" -v -', function (err, stdout, stderr) {
			assert(stderr.toString().indexOf('libjpeg-turbo') !== -1);
			cb();
		});
	});

	it('should minify a .jpg', function (cb) {
		var binPath = path.join(__dirname, '../bin/jpegtran.js');
		var args = [
			'-copy', 'none',
			'-optimize',
			'-outfile', '"' + path.join(__dirname, 'minified.jpg') + '"',
			'"' + path.join(__dirname, 'fixtures', 'test.jpg') + '"'
		];

		exec('node "' + binPath + '" ' + args.join(' '), function () {
			var actual = fs.statSync('test/minified.jpg').size;
			var original = fs.statSync('test/fixtures/test.jpg').size;
			assert(actual < original);
			cb();
		});
	});
});
