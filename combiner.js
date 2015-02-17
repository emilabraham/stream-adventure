var combine = require('stream-combiner');
var split = require('split');
var through = require('through');

module.exports = function () {
  process.stdin.pipe(split()).pipe(through(function (line) {
    console.log(line);
  }));
  return combine(process.stdin, split, process.stdout);
}
