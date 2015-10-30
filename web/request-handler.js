var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, req.url);  
  } else if (req.method === 'POST') {
    var redirectLocation = '/';

    collectData(req, function(data){
      var path = data.toString().substring(4);
     
      archive.isUrlArchived(path, function(exists){
        if (exists){ // is archived
          redirectLocation = path;
        } else { // is not archived
          redirectLocation = '/loading.html'
        }
 
        httpHelpers.sendRedirect(res, redirectLocation);
      })
   
      archive.addUrlToList(path);
    
    }) 
  }
};


var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
 });
};
