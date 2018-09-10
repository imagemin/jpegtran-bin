'use strict';
const execa = require('execa');
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

const args = [
	'-copy',
	'none',
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

		execa('touch configure.ac aclocal.m4 configure Makefile.am Makefile.in');

		binBuild.url('https://downloads.sourceforge.net/project/libjpeg-turbo/1.5.1/libjpeg-turbo-1.5.1.tar.gz', [
			cfg,
			'make install',
		])
			.then(() => {
				log.success('jpegtran built successfully');
			})
			// eslint-disable-next-line unicorn/catch-error-name
			.catch(error => {
				log.error(error.stack);

				// eslint-disable-next-line unicorn/no-process-exit
				process.exit(1);
			});

	}

	log.success('jpegtran pre-build test passed successfully');
});
