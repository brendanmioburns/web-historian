var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),

  //contains actual html
  archivedSites: path.join(__dirname, '../archives/sites'),

  //contains pending URLs in text file and once the worker found the html content, worker will add the html contents to sites direcory 
  // and that url will be removed from sites.txt file
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//reads the urls in the list of urls (exports.path.list)
//goes down the file path, makes sure it's properly encoded, and returns a callback on the data
exports.readListOfUrls = function(callback) {
  //using fs.readFile get access to the path and the urls inside it
 
  //BUFFER is a temporary holding spot for data being moved from one place to another.
  fs.readFile(exports.paths.list, 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    var urlArray = data.toString().split('\n');
    // console.log(callback(data));
    // console.log('data', data);
    // console.log(urlArray);
    return callback(urlArray);
  });
  
};

exports.isUrlInList = function(url, callback) {
  console.log('url', url);
  exports.readListOfUrls(function(urls) {
    // console.log('urls', urls);
    return callback(_.contains(urls, url));
  });     
};

exports.addUrlToList = function(url, callback) {
  // if (!exports.isUrlInList(url)) {
  fs.appendFile(exports.paths.list, 'Wes is awesome', function(error) {
    if (error) {
      throw error;
    }
  });
  // } 
  return exports.readListOfUrls(callback);
};

exports.isUrlArchived = function(url, callback) {
  
  fs.readdir(exports.paths.archivedSites, function (err, files) {
    if (err) {
      throw err;
    }
    for (var i = 0; i < files.length; i++) {
      if (url === files[i]) {
     
        callback(true);
        return;
      }
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  //if the url is in the list (site.txt file)
  // add that url to the archive directory(sites folder)
  urls.forEach(function(url) {
    if (!exports.isUrlInList(url, callback)) {
      fs.appendFile(exports.paths.archivedSites, url, function(error) {
        if (error) {
          throw error;
        }
      }); 
    }
    return callback(true);
  });
};
