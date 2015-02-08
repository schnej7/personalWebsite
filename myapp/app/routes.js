module.exports = function(app, passport) {

    var moment = require('moment');
    var favicon = require('serve-favicon');
    var wordGame = require('../my_modules/wordGame.js');

    app.get('/', function (req, res) {
      res.render('index', { title: 'Jerry Schneider', year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/resume', function (req, res) {
      res.render('resume', { title: "Jerry Schneider's Resume", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/emulator', function (req, res) {
      res.render('emulator', { title: "Jerry Schneider's Resume", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/wordGame', function (req, res) {
      res.render('wordGame', { title: "Jerry Word Game", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/wordGameAjax', function (req, res) {
      wordGame.handleRequest(req, res);
    });

    app.get('/secrets', function (req, res) {
      res.render('secrets', { title: "Secrets Links", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/testing', function (req, res) {
      res.render('testing', { title: "Testing Page", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/login', function (req, res) {
      res.render('loginPage', { title: "login", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { title: "login", year: (moment(Date.now())).format('YYYY') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // accept POST request on the homepage
    app.post('/', function (req, res) {
      res.send('Got a POST request');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
