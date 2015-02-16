var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
  if (request.method === 'POST') {
    console.log(request.body);
  }
});
