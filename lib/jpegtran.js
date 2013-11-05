'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
	name: 'jpegtran',
	bin: 'jpegtran',
	path: path.join(__dirname, '../vendor'),
	src: 'http://downloads.sourceforge.net/project/libjpeg-turbo/1.3.0/libjpeg-turbo-1.3.0.tar.gz',
	buildScript: './configure --disable-shared --prefix="' + path + '" && ' + 'make install',
	platform: {
		darwin: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/osx/jpegtran'
		},
		freebsd: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/freebsd/jpegtran',
		},
		linux: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/linux/x86/jpegtran',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/linux/x64/jpegtran'
				}
			}
		},
		sunos: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/sunos/x86/jpegtran',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/sunos/x64/jpegtran'
				}
			}
		},
		win32: {
			bin: 'jpegtran.exe',
			url: [
				'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/win/x86/jpegtran.exe',
				'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/win/x86/libjpeg-62.dll'
			],
			arch: {
				x64: {
					url: [
						'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/win/x86/jpegtran.exe',
						'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/win/x86/libjpeg-62.dll'
					]
				}
			}
		}
	}
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;
