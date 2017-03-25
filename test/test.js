'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const jpegtran = require('..');

test.cb('rebuild the jpegtran binaries', t => {
	const tmp = tempy.directory();
	const cfg = [
		'./configure --disable-shared',
		`--prefix="${tmp}" --bindir="${tmp}"`
	].join(' ');

	new BinBuild()
		.src('https://downloads.sourceforge.net/project/libjpeg-turbo/1.5.1/libjpeg-turbo-1.5.1.tar.gz')
		.cmd(cfg)
		.cmd('make install')
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'jpegtran')));
			t.end();
		});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegtran, ['-version']));
});

test('minify a JPG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(tmp, 'test.jpg');
	const args = [
		'-outfile', dest,
		src
	];

	await execa(jpegtran, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
