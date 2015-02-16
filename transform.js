var through = require('through');

function write (buffer) {
  this.queue(buffer.toString().toUpperCase());
}

var tr = through(write);

process.stdin.pipe(tr).pipe(process.stdout);
