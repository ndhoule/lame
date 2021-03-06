# lame

![Lisp](https://sslimgs.xkcd.com/comics/lisp.jpg)
*Copyright Randall Munroe, [xkcd.com](https://xkcd.com)*

## Description

Miniature Lisp implementation written in JavaScript (ES6).

###### Build Status

Branch | Status
---    | ---
master | [![Circle CI](https://circleci.com/gh/ndhoule/lame/tree/master.png?style=badge)](https://circleci.com/gh/ndhoule/lame/tree/master)
dev    | [![Circle CI](https://circleci.com/gh/ndhoule/lame/tree/dev.png?style=badge)](https://circleci.com/gh/ndhoule/lame/tree/dev)


### Why?

I wanted to write a lexer and a compiler. And a language. And a cure for world hunger. Okay, just a language.

### Disclaimer

This is very unfinished. There are plenty of edge cases, places where behavior is weird or dumb, etc.

Sweet Jesus, please don't use this for anything important.


## Installation and Use

```sh
npm install git+https://github.com/ndhoule/lame.git#dev
```

### Load a File

```sh
node_modules/.bin/lamer path/to/filename.lame
```

### REPL

```sh
node_modules/.bin/lamer
```


## Development

Requirements:
- Node.js v0.10.x

### Getting Started

```sh
npm install
```


## License

Code copyright 2014 [Nathan Houle](mailto:nathan+github@nathanhoule.com). Released under the [MIT license](LICENSE.md).


## Credits and Resources

All of these blog posts/papers/articles/etc. helped me out in some way, big or small. In no particular order:

- http://javascript.crockford.com/tdop/tdop.html
- http://norvig.com/lispy.html
- http://norvig.com/lispy2.html
- http://www.paulgraham.com/ilc03.html
- https://www.hackerschool.com/blog/21-little-lisp-interpreter
