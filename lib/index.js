'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');


//The default location that missing binaries are fetched from
const defaultDownloadUrl = `https://raw.githubusercontent.com/imagemin/jpegtran-bin/`;
const defaultDownloadDir = 'vendor/';

//If we detect that a different download location has been set in the environment shall use it over the default
const downloadUrl = process.env.IMAGEMIN__JPEGTRAN_BIN__MIRROR_URL ? process.env.IMAGEMIN__JPEGTRAN_BIN__MIRROR_URL : defaultDownloadUrl;
const downloadDir = process.env.IMAGEMIN__JPEGTRAN_BIN__CUSTOM_DIR ? process.env.IMAGEMIN__JPEGTRAN_BIN__CUSTOM_DIR : defaultDownloadDir;

const url = `${downloadUrl}v${pkg.version}/${downloadDir}`;


module.exports = new BinWrapper()
	.src(`${url}macos/jpegtran`, 'darwin')
	.src(`${url}linux/x86/jpegtran`, 'linux', 'x86')
	.src(`${url}linux/x64/jpegtran`, 'linux', 'x64')
	.src(`${url}freebsd/x86/jpegtran`, 'freebsd', 'x86')
	.src(`${url}freebsd/x64/jpegtran`, 'freebsd', 'x64')
	.src(`${url}sunos/x86/jpegtran`, 'sunos', 'x86')
	.src(`${url}sunos/x64/jpegtran`, 'sunos', 'x64')
	.src(`${url}win/x86/jpegtran.exe`, 'win32', 'x86')
	.src(`${url}win/x64/jpegtran.exe`, 'win32', 'x64')
	.src(`${url}win/x86/libjpeg-62.dll`, 'win32', 'x86')
	.src(`${url}win/x64/libjpeg-62.dll`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpegtran.exe' : 'jpegtran');
