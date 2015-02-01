var express = require('express')
var app = express()
app.set('views', './views')
app.set('view engine', 'jade')
var moment = require('moment');
var favicon = require('serve-favicon');
var wordGame = require('./my_modules/wordGame.js');
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Jerry Schneider', year: (moment(Date.now())).format('YYYY')});
})

app.get('/resume', function (req, res) {
  res.render('resume', { title: "Jerry Schneider's Resume", year: (moment(Date.now())).format('YYYY')});
})

app.get('/emulator', function (req, res) {
  res.render('emulator', { title: "Jerry Schneider's Resume", year: (moment(Date.now())).format('YYYY')});
})

app.get('/wordGame', function (req, res) {
  res.render('wordGame', { title: "Jerry Word Game", year: (moment(Date.now())).format('YYYY')});
})

app.get('/wordGameAjax', function (req, res) {
  wordGame.handleRequest(req, res);
})

app.get('/secrets', function (req, res) {
  res.render('secrets', { title: "Secrets Links", year: (moment(Date.now())).format('YYYY')});
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
