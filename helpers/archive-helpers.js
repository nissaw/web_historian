var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //TODO: possibly reduce file IO
  fs.readFile(exports.paths.list, 'utf-8', function(error, content) {
    if (error) {
      //handle error
    } else {
      callback(content.split('\n'));
    }
  })
};

exports.isUrlInList = function(targetUrl, callback) { //this works, even though tests fail
  exports.readListOfUrls(function(contents){
    callback(_.contains(contents, targetUrl));
  })
};

exports.addUrlToList = function(newUrl){
  exports.isUrlInList(newUrl, function(value){
    if (!value){
      fs.appendFile(exports.paths.list, newUrl + '\n', 'utf-8', function(error){
        if (error){
          // handle error
        } 
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + '/' + url, function (error, stat) {
    if (error) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function() {
  exports.readListOfUrls(function(contents) {
    _.each(contents, function(url) {
      exports.isUrlArchived(url, function(result) {
        if (!result) {
          request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
        }
      });
    })
  })
};


