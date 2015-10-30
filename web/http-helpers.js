var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};

  var path = url.parse(asset).pathname;
  if (path === '/'){
    path = '/index.html';
  }

  // console.log(archive.paths.siteAssets + path); //TODO GET CSS (maybe because of headers)

  fs.readFile(archive.paths.siteAssets + path, encoding, function(error, contents){
    if (error){
      fs.readFile(archive.paths.archivedSites+path, encoding, function(error, contents){
        if (error){
          send404(res);
        } else{
          exports.sendResponse(res, 200, contents);
        }
      })
    } else {
      exports.sendResponse(res, 200, contents);
    }
  })
};

exports.sendResponse = function(response, statusCode, data, contentType) {  
  headers['Content-Type'] = contentType || 'text/html';
  response.writeHead(statusCode, headers);
  response.end(data);
}

exports.sendRedirect = function(response, location) {
  response.writeHead(302, {Location: location});
  response.end();
}

var send404 = function(response){
  exports.sendResponse(response, 404, "404: Page Not Found");
}


// As you progress, keep thinking about what helper functions you can put here!
