"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 3000;

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];

function serveImage(filename, req, res) {
  fs.readFile('images/' + filename, (err, body) => {
    if(err) {
      console.error(err);
      res.statusCode = 500;
      res.statusMessage = "Server Error";
      res.end();
      return;
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(body);
  });
}

var server = http.createServer((req, res) => {

  switch(req.url) {

    case "/gallery":
      var gHtml = imageNames.map((fileName) => {
        return ' <img src="'+ fileName +'" alt="a fishing ace at work">'
      }).join(' ');
      var html = '<!doctype html>';
          html += '<head>';
          html += ' <title>Gallery</title>';
          html += ' <link href="gallery.css" type="text/css" rel="stylesheet">';
          html += '</head>';
          html += '<body>';
          html += ' <h1>Gallery</h1>';
          html += gHtml;
          html += ' <h1>Hello.</h1> Time is ' + Date.now();
          html += '</body>';
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      break;

    case "/gallery.css":
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
      break;

    case "/ace":
    case "/ace.jpg":
      serveImage('ace.jpg', req, res);
      break;

    case "/bubble":
    case "/bubble.jpg":
      serveImage('bubble.jpg', req, res);
      break;

    case "/chess":
    case "/chess.jpg":
      serveImage('chess.jpg', req, res);
      break;

    case "/fern":
    case "/fern.jpg":
      serveImage('fern.jpg', req, res);
      break;

    case "/mobile":
    case "/mobile.jpg":
      serveImage('mobile.jpg', req, res);
      break;

    default:
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
  }
});

server.listen(port, () => {
  console.log("Listening on Port " + port);
});
