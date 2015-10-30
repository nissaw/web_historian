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

    // parse url
    collectData(req, function(data){
      //console.log(data.toString());
      //console.log(data.toString().substring(4));
      //console.log(url.parse(data.toString().substring(4)));
      //var path = url.parse(data.toString().substring(4)).hostname;
      var path = data.toString().substring(4);
      // console.log(path);
 
      archive.isUrlArchived(path, function(exists){
        if (exists){ // is archived
          redirectLocation = path;
        } else { // is not archived
          redirectLocation = '/loading.html'
        }
        console.log("redirect: " + redirectLocation);
        httpHelpers.sendRedirect(res, redirectLocation);
      })
 
      archive.addUrlToList(path);
    
    })
   
  }
};



var collectData = function(request, callback){
  // handle interactions around POST
  //two events emitted by node
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
 });
};