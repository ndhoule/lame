import repl from 'repl';
import lame from '../src/index';

repl.start({
  prompt: 'λ> ',
  eval: function(cmd, context, filename, callback) {
    // Remove extraneous characters from input
    cmd = cmd.slice(1, -2);

    if (!cmd) {
      return callback(null);
    }

    callback(null, lame.eval(cmd));
  }
});
