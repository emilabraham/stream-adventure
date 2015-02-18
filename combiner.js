var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

// Used a solution I found online as a guide
module.exports = function () {
  var category;

  function write (data) {  
    if(data.length === 0) {
      return;
    }
    var parsed = JSON.parse(data);

    if (parsed.type === 'genre') {
      if (category){
        this.queue(JSON.stringify(category) + '\n');
      }
      category = { name: parsed.name, books: [] };
    }
    else if (parsed.type === 'book'){
      category.books.push(parsed.name);
    }
  }

  function end () {
    if (category) {
      this.queue(JSON.stringify(category) + '\n');
    }
    this.queue(null);
  }

  var organize = through(write, end);

  return combine(split(), organize, zlib.createGzip());
}
