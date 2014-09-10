'use strict';

/**
 * This file bootstraps Traceur (ES6) into Node's module system. It'll interpret any `require`d or
 * `import`ed files as ES6 modules; any packages installed in the `node_modules` folder will be
 * interpreted as normal ES5 files.
 *
 * https://github.com/google/traceur-compiler/wiki/Using-Traceur-with-Node.js
 */

var traceur = require('traceur');

traceur.require.makeDefault(function(filename) {
  return filename.indexOf('node_modules') === -1;
});
