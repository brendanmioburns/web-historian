var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendResponse = function(response, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  var data = JSON.stringify(exports.paths.siteAssets);
  response.end(data);
};

exports.requestData = function(request, response, callback) {
  
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  }).request.on('error', function(error) {
    throw error;
  }).request.on('end', function() {
    callback(JSON.parse(data));
  });
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  // console.log('asset', asset);

  //checking if the asset is found in the siteAssets (our local static files)
  fs.readFile(archive.paths.siteAssets + '/' + asset, 'utf8', function(err, data) {
    if (err) {
      //checking if the asset is found in the archives
      fs.readFile(archive.paths.archivedSites + '/' + asset, 'utf8', function(err, data) {
        if (err) {
          throw error;
        }
      });
      return callback ? callback() : exports.sendResponse(response, 404);
    }
    exports.sendResponse(response, statusCode);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
