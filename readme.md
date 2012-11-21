# node-jpegtran [![Build Status](https://secure.travis-ci.org/yeoman/node-jpegtran.png?branch=master)](http://travis-ci.org/yeoman/node-jpegtran)

jpegtran 1.2.1 (part of [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/)) Node.js wrapper that makes it seamlessly available as a local dependency on OS X, Linux and Windows. Most commonly used to losslessly minify JPEG images.

> libjpeg-turbo is a derivative of libjpeg that uses SIMD instructions (MMX, SSE2, NEON) to accelerate baseline JPEG compression and decompression on x86, x86-64, and ARM systems. On such systems, libjpeg-turbo is generally 2-4x as fast as the unmodified version of libjpeg, all else being equal.


## Example usage

```js
var execFile = require('child_process').execFile;
var jpegtranPath = require('jpegtran').path;

execFile(jpegtranPath, ['-outfile', 'output.jpg', 'input.jpg'], function(err, stdout, stderr) {
	console.log('Image minified');
});
```

You can also run directly from `./node_modules/.bin/jpegtran`


## License

Everything excluding the binaries licensed under the [BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google.

libjpeg-turbo licensed under the BSD license and copyright dcommander.
