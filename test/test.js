'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var BinBuild = require('bin-build');
var binCheck = require('bin-check');
var compareSize = require('compare-size');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the jpegtran binaries', function (t) {
	t.plan(2);

	var cfg = [
		'./configure --disable-shared',
		'--prefix="' + tmp + '" --bindir="' + tmp + '"'
	].join(' ');

	if (process.platform === 'darwin' && process.arch === 'x64') {
		cfg = 'CFLAGS="-m32" LDFLAGS="-m32" ' + cfg;
	}

	new BinBuild()
		.src('http://downloads.sourceforge.net/project/libjpeg-turbo/1.4.0/libjpeg-turbo-1.4.0.tar.gz')
		.cmd(cfg)
		.cmd('make install')
		.run(function (err) {
			t.assert(!err, err);
			t.assert(fs.statSync(path.join(tmp, 'jpegtran')).isFile());
		});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	var args = [
		'-outfile', path.join(tmp, 'test-path.jpg'),
		path.join(__dirname, 'fixtures/test.jpg')
	];

	binCheck(require('../').path, args, function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a JPG', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test.jpg');
	var args = [
		'-outfile', dest,
		src
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});
