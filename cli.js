#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var jpegtran = require('./').path;
var input = process.argv.slice(2);

spawn(jpegtran, input, {stdio: 'inherit'})
	.on('exit', process.exit);
