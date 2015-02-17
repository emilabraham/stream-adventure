var duplexer = require('duplexer');
var through = require('through');

// This exercise was very confusing.
module.exports = function (counter) {
  var count = {};
  var input = through(write, end);

  function write (object) {
    // I still don't know what that || does.
    count[object.country] = (count[object.country] || 0) + 1;
  }
  function end () {
    counter.setCounts(count);
  }

  return duplexer(input, counter);
}
