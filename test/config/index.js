import chai from 'chai';
import path from 'path';
import fs from 'fs';

global.chai = chai;
global.expect = chai.expect;

chai.loadFixture = (function() {
  var cache = {};

  return function(filename) {
    if (!cache.hasOwnProperty(filename)) {
      cache[filename] = fs.readFileSync(path.join(__dirname, '../fixtures', filename + '.lame'), 'utf-8');
    }
    return cache[filename];
  };
}());
