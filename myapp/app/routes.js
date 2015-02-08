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

    app.get('/wordGameNoAuth', function (req, res) {
      res.render('wordGame', { title: "Jerry Word Game", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/wordGame', isLoggedInWordGame, function(req, res) {
        res.render('wordGame', {
            user : req.user, // get the user out of session and pass to template
            title: "Jerry Word Game",
            year: (moment(Date.now())).format('YYYY')
        })
    });

    app.get('/wordGameAjax', function (req, res) {
      if (req.isAuthenticated()) {
        console.log("auth");
      }
      wordGame.handleRequest(req, res);
    });

    app.get('/secrets', function (req, res) {
      res.render('secrets', { title: "Secrets Links", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/testing', function (req, res) {
      res.render('testing', { title: "Testing Page", year: (moment(Date.now())).format('YYYY')});
    });

    app.get('/login', isLoggedInLogin, function(req, res) {
        res.render('loginPage', {
            title: "login",
            year: (moment(Date.now())).format('YYYY')
        })
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', isLoggedInLogin, function(req, res) {
        res.render('signup', {
            title: "signup",
            year: (moment(Date.now())).format('YYYY')
        })
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user, // get the user out of session and pass to template
            title: "login",
            year: (moment(Date.now())).format('YYYY')
        })
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    // accept POST request on the homepage
    app.post('/', function (req, res) {
      res.send('Got a POST request');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// route middleware to make sure a user is logged in
function isLoggedInWordGame(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/wordGameNoAuth');
}

function isLoggedInLogin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/profile');
}
