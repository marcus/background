var url = require('url');
var path = require('path');
var fs = require('fs');
var screenshot = require('electron-screenshot-service');
var Promise = require('bluebird');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var writeFile = Promise.promisify(fs.writeFile, fs);

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

app.use(bodyParser.json({limit: '1mb'})); // parse application/json
app.use(methodOverride()); //  use HTTP verbs like PUT or DELETE where client doesn't support it.
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));

// proxy the request for static assets in dev mode
if(process.env.NODE_ENV !== 'production') {
  var proxy = require('proxy-middleware');
  app.use('/assets', proxy(url.parse('http://localhost:8080/assets')));
}

app.get('/', function (req, res) {
  var sourceFile = req.param('blueprint') || 'source.json';
  console.log("Source", req.param('blueprint'));
  try {
    var source = require('./blueprints/' + sourceFile);
  } catch (err) {
    return res.status(400).send({message: err.message});
  }
  return res.render('index', { title: 'Background', source: source});
});

app.post('/print', function (req, res) {
  var fileName = uuid.v4();

  console.log("Writing body", req.body);
  try{
    console.log(req.body.quotation);
  } catch(err) {
    return res.status(400).send({message: "Can't parse body. " + err.message});
  }
  writeFile('./blueprints/' + fileName + '.json', JSON.stringify(req.body))
    .then(function() {
      console.log("Taking screenshot");
      return screenshot({
        url : 'http://localhost:3000?blueprint=' + fileName + '.json',
        width : 1024,
        height : 768
      });
    })
    .then(function(img) {
      return writeFile('./public/quotes/' + fileName + '.jpg', img.data);
    })
    .then(function() {
      screenshot.close();
      return res.status(200).send({message: 'Rendered ' + fileName});
    })
    .catch(function(err) {
      console.log("There was a problem with the request", err);
      return res.status(400).send({message: err.message});
    })
    ;
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
