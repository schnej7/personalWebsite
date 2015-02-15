module.exports = function(app, passport) {

    var wordGame = require('../my_modules/wordGame.js');
    var jadeObject = require('../app/jadeObject.js');

    app.get('/', function (req, res) {
      res.render(
        'index',
        jadeObject.basic(req, 'Jerry Schneider')
      )
    });

    app.get('/resume', function (req, res) {
      res.render(
        'resume',
        jadeObject.basic(req, "Jerry Schneider's Resume")
      )
    });

    app.get('/emulator', function (req, res) {
      res.render(
        'emulator',
        jadeObject.basic(req, "Chip-8 Emulator")
        .setSocialDescription("Try out this Chip-8 Emulator written entirely in Javascript!")
        .setSocialImgUrl("http://jerry-schneider.com/images/Invaders.png")
      )
    });

    app.get('/wordWizard', function (req, res) {
      res.render(
        'wordGame',
        jadeObject.basic(req, "Word Wizard")
        .setSocialDescription("Test your vocabulary with the hardest word game around!")
        .setSocialImgUrl("http://jerry-schneider.com/images/wordWizard.png")
      )
    });

    app.get('/wordWizardTutorial', function (req, res) {
      res.render(
        'wordGameTutorial',
        jadeObject.basic(req, "Word Wizard Tutorial")
        .setSocialDescription("Test your vocabulary with the hardest word game around!")
        .setSocialImgUrl("http://jerry-schneider.com/images/wordWizard.png")
      )
    });

    app.get('/wordGameAjax', function (req, res) {
      wordGame.handleRequest(req, res);
    });

    app.get('/secrets', function (req, res) {
      res.render(
        'secrets',
        jadeObject.basic(req, "Secret Links")
      )
    });

    app.get('/testing', function (req, res) {
      res.render(
        'testing',
        jadeObject.basic(req, "Testing Page")
      )
    });

    app.get('/profile', isLoggedIn, function(req, res) {
      res.render(
        'profile',
        jadeObject.auth(req, "Profile")
      )
    });

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/login');
    });

    app.get('/login', isLoggedInLogin, function(req, res) {
      res.render(
        'loginPage',
        jadeObject.basic(req, "Login")
      )
    });

    app.get('/signup', isLoggedInLogin, function(req, res) {
      res.render(
        'signup',
        jadeObject.basic(req, "Sign Up")
      )
    });

    app.get('/blog', function (req, res) {
      res.render(
        'blog',
        jadeObject.basic(req, "Jerry's Blog")
      )
    });

    app.get('/blog/*', function (req, res) {
      filename = req.params[0];
      if (!filename) {
          return;
      }
      console.log("rendering partial at: ", filename);
      res.render(
        "blog/"+filename,
        jadeObject.basic(req, filename)
        .setSocialDescription("Read this article and more at jerry-schneider.com/blog!")
        .customSEO(true)
      )
    });

    app.get('/google62bc3c09f7c33d86.html', function(req, res) {
      res.sendfile('static/google62bc3c09f7c33d86.html');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

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
