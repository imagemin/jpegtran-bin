var path = require('path');
var which = require('which');

var target = {
  name:'jpegtran',
  pathPrefix: ['..','vendor'],
  platforms: {
    darwin: { path: 'osx'},
    linux: {
      path: 'linux', 
      arch: true 
    },
    win32: {
      path: 'win',
      arch: true,
      suffix: 'exe'
    }
  }
};

exports.path = setPath(target);

function setPath(target){
  try {
    return which.sync(target.name);
  }
  catch(e){
    console.log(e);
    return getPathToPackagedBinary(target);
  }
}

function getPathToPackagedBinary(target){
  var platform = target.platforms[process.platform];
  if (platform === undefined) {
      console.error('Unsupported platform:', process.platform, process.arch);
  } else {
    var targetpath = target.pathPrefix,
        arch = process.arch === 'x64' ? 'x64' : 'x86',
        exec = target.name;

    targetpath.unshift(__dirname);
    targetpath.push[platform.path];

    if (platform.arch === true) {
      targetpath.push(arch);
    }
    if (target.platforms[process.platform].suffix !== undefined) {
      exec += '.' + platform.suffix;
    }
    return path.join.apply(path, targetpath);
  }

}

