var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var path = url.parse(asset).pathname;
  if (path === '/'){
    path = 'index.html';
  }

  if (path.substring(path.length - 4).toLowerCase() === 'html') {
  
    fs.readFile('web/public/' + path, function(error, contents) {
      if (error) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(contents);
      }
    });    
  } else {
    fs.readFile('web/public/' + path, function(error, contents) {
      if (error) {
        res.writeHead(404, headers);
        res.end();
      } else {
        headers['Content-Type'] = 'text/css';
        res.writeHead(200, headers);
        res.end(contents);
      }
    });
  }
};



// As you progress, keep thinking about what helper functions you can put here!
