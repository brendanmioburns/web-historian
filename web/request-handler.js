var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res, statusCode) {
  // console.log('req', req)
  // res.end(archive.paths.list);
  if (req.method === 'GET') {
    if (req.url === '/') {
       // console.log('req.url', req.url)
      exports.serveAssets(res, asset);
      exports.sendResponse(res, statusCode);
    }
  } else if (req.method === 'POST') {
    exports.requestData(req, res, callback);
  }
};
