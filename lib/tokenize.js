// Turns a string into a list of tokens. Tokenization is ghetto(fabulous).
var tokenize = function(string) {
  return string
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(' ')
    .map(token => token.replace(/\n/g, ''))
    .filter(token => token !== '' && token !== '\n');
};

export default tokenize;
