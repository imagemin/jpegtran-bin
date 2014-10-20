'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
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

	var version = require('../').version;
	var builder = new BinBuild()
		.src('http://downloads.sourceforge.net/project/libjpeg-turbo/' + version + '/libjpeg-turbo-' + version + '.tar.gz')
		.cmd(cfg)
		.cmd('make install');

	builder.run(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'jpegtran'), function (exists) {
			t.assert(exists);
		});
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
	t.plan(4);

	var args = [
		'-outfile', path.join(tmp, 'test.jpg'),
		path.join(__dirname, 'fixtures/test.jpg')
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		fs.stat(path.join(__dirname, 'fixtures/test.jpg'), function (err, a) {
			t.assert(!err, err);

			fs.stat(path.join(tmp, 'test.jpg'), function (err, b) {
				t.assert(!err, err);
				t.assert(b.size < a.size);
			});
		});
	});
});
