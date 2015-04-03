var express = require('express');
var app = express();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.local.config');


/************************************************************
 *
 * Express routes for:
 *   - index.html
 *
 *   Sample endpoints to demo async data fetching:
 *     - POST /landing
 *     - POST /home
 *
 ************************************************************/

// Serve index page
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(9090, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
});

/******************
 *
 * Express server
 *
 *****************/

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
