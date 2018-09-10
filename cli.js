#!/usr/bin/env node
'use strict';
const execa = require('execa');
const jpegtran = require('.');

execa(jpegtran, process.argv.slice(2), {stdio: 'inherit'});
