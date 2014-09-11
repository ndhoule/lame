import fs from 'fs';
import lame from '../src/index';
import path from 'path';
import repl from 'repl';

var cwd = process.cwd();
var argv = process.argv.slice(2);

if (argv[0]) {
  // User has provided a path to a file
  var filepath = path.resolve(cwd, argv[0]);

  fs.exists(filepath, function(exists) {
    if (!exists) {
      throw new Error('File not found');
    }

    // User wants to evaluate a file
    fs.readFile(filepath, 'utf-8', function(err, source) {
      if (err) {
        throw err;
      }

      console.log(lame.eval(source));
    });
  });
} else {
  // Load the REPL
  repl.start({
    prompt: 'λ> ',
    eval: function(cmd, context, filename, callback) {
      var results;
      var error = null;

      // Remove extraneous characters from input
      cmd = cmd.slice(1, -2);

      if (!cmd) {
        return callback(error);
      }

      try {
        results = lame.eval(cmd);
      } catch (e) {
        error = e;
      } finally {
        callback(error, results);
      }
    }
  });
}
