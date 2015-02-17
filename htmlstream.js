var trumpet = require('trumpet');
var through = require('through');

var tr = trumpet();

// This part is very confusing.
var stream = tr.select('.loud').createStream()
stream.pipe(through(function (buffer) {
  this.queue(buffer.toString().toUpperCase());
})).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);
