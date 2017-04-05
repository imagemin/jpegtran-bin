'use strict';
const path = require('path');
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

const args = [
	'-copy', 'none',
	'-optimize',
	'-outfile', path.join(__dirname, '../test/fixtures/test-optimized.jpg'),
	path.join(__dirname, '../test/fixtures/test.jpg')
];

bin.run(args, err => {
	if (err) {
		log.warn(err.message);
		log.warn('jpegtran pre-build test failed');
		log.info('compiling from source');

		const cfg = [
			'./configure --disable-shared',
			`--prefix="${bin.dest()}" --bindir="${bin.dest()}"`
		].join(' ');

		const builder = new BinBuild()
			.cmd('touch configure.ac aclocal.m4 configure Makefile.am Makefile.in')
			.src('https://downloads.sourceforge.net/project/libjpeg-turbo/1.5.1/libjpeg-turbo-1.5.1.tar.gz')
			.cmd(cfg)
			.cmd('make install');

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				process.exit(1);
				return;
			}

			log.success('jpegtran built successfully');
		});
	}

	log.success('jpegtran pre-build test passed successfully');
});
