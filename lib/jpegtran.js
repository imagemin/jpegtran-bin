'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
	name: 'jpegtran',
	bin: 'jpegtran',
	path: path.join(__dirname, '../vendor'),
	src: 'http://downloads.sourceforge.net/project/libjpeg-turbo/1.3.0/libjpeg-turbo-1.3.0.tar.gz',
	buildScript: './configure --disable-shared &&' +
				 ' make install bindir=' + path.join(__dirname, '../vendor') + ' bin_PROGRAMS=jpegtran',
	platform: {
		darwin: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/osx/jpegtran',
			buildScript: './configure --disable-shared --host i686-apple-darwin &&' +
						 ' make install bindir=' + path.join(__dirname, '../vendor') + ' bin_PROGRAMS=jpegtran',
		},
		freebsd: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/freebsd/x86/jpegtran',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/freebsd/x64/jpegtran',
				}
			}
		},
		linux: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/linux/x86/jpegtran',
			buildScript: './configure --disable-shared CFLAGS=\'-O3 -m32\' LDFLAGS=-m32 &&' +
						 ' make install bindir=' + path.join(__dirname, '../vendor') + ' bin_PROGRAMS=jpegtran',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/linux/x64/jpegtran',
					buildScript: './configure --disable-shared CFLAGS=\'-O3 -m64\' LDFLAGS=-m64 &&' +
								 ' make install bindir=' + path.join(__dirname, '../vendor') + ' bin_PROGRAMS=jpegtran',
				}
			}
		},
		sunos: {
			url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/sunos/x86/jpegtran',
			arch: {
				x64: {
					url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/vendor/sunos/x64/jpegtran',
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
