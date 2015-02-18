var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  return combine(process.stdin, split(JSON.parse), process.stdout);
}
