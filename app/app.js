var url = require('url');
var path = require('path');

if(process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('./webpack.config');

  console.log("Starting webpack");
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    contentBase: webpackConfig.output.publicPath,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: { colors: true },
    inline: true,
  }).listen(8080, 'localhost', function (err) {
    if (err) { console.error(err); }
  });
}

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// proxy the request for static assets in dev mode
if(process.env.NODE_ENV !== 'production') {
  var proxy = require('proxy-middleware');
  app.use('/assets', proxy(url.parse('http://localhost:8080/assets')));
}

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
