var zlib = require('zlib');
var crypto = require('crypto');
var tar = require('tar');
var concat = require('concat-stream');

var cipher = process.argv[2];
var passphrase = process.argv[3];
var gunzip = zlib.createGunzip();
var parser = tar.Parse();
var cryptstream = crypto.createDecipher(cipher, passphrase);

parser.on('entry', function (e) {
  if (e.type != 'File') {
    return;
  }
  e.pipe(crypto.createHash('md5', { encoding: 'hex' })).pipe(concat(function (hex) {
    console.log(hex, e.path);
  }));
});


process.stdin.pipe(cryptstream).pipe(gunzip).pipe(parser);
