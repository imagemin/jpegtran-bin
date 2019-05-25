# jpegtran-bin [![Build Status](https://travis-ci.org/imagemin/jpegtran-bin.svg?branch=master)](https://travis-ci.org/imagemin/jpegtran-bin)

> [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/) is a derivative of libjpeg that uses SIMD instructions (MMX, SSE2, NEON) to accelerate baseline JPEG compression and decompression on x86, x86-64, and ARM systems. On such systems, libjpeg-turbo is generally 2-4x as fast as the unmodified version of libjpeg, all else being equal.

You probably want [`imagemin-jpegtran`](https://github.com/imagemin/imagemin-jpegtran) instead.


## Install

```
$ npm install --save jpegtran-bin
```

### Customizing the Download Mirror

By default this package will fetch the libjpeg-turbo binary from this repository during install, if you need to customise this behavour it can be overridden using enviroment variables.

The following options are available:

Environment Variable               | Description                          | Default
-----------------------------------| -------------------------------------| --------------------------------------------------------
IMAGEMIN__JPEGTRAN_BIN__MIRROR_URL | Specifies the location of the mirror | https://raw.githubusercontent.com/imagemin/jpegtran-bin/
IMAGEMIN__JPEGTRAN_BIN__CUSTOM_DIR | Specifies a custom folder if needed  | vendor/

The resulting mirror location is composed as follows:

```js
url = IMAGEMIN__JPEGTRAN_BIN__MIRROR_URL + {library version} + IMAGEMIN__JPEGTRAN_BIN__CUSTOM_DIR + {platform information}
```

For instance with the below set:

```
IMAGEMIN__JPEGTRAN_BIN__MIRROR_URL = 'https://www.example.com/private/mirror/'
IMAGEMIN__JPEGTRAN_BIN__CUSTOM_DIR = 'binaries/'
```

Would result in `https://www.example.com/private/mirror/v4.0.0/binaries/win/x64/jpegtran.exe` on 64 bit Windows.

## Usage

```js
var execFile = require('child_process').execFile;
var jpegtran = require('jpegtran-bin');

execFile(jpegtran, ['-outfile', 'output.jpg', 'input.jpg'], function (err) {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global jpegtran-bin
```

```
$ jpegtran --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
