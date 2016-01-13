// jest/preprocessor.js
var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename);
    }
    return src;
  }
};
