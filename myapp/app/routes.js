module.exports = function(app, passport) {

    var wordGame = require('../my_modules/wordGame.js');
    var jadeObject = require('../app/jadeObject.js');

    app.get('/', preReq, function (req, res) {
      res.render(
        'index',
        jadeObject.basic(req, 'Jerry Schneider')
      )
    });

    app.get('/resume', preReq, function (req, res) {
      res.render(
        'resume',
        jadeObject.basic(req, "Jerry Schneider's Resume")
      )
    });

    app.get('/emulator', preReq, function (req, res) {
      res.render(
        'emulator',
        jadeObject.basic(req, "Chip-8 Emulator")
        .setSocialDescription("Try out this Chip-8 Emulator written entirely in Javascript!")
        .setSocialImgUrl("http://jerry-schneider.com/images/Invaders.png")
      )
    });

    app.get('/wordWizard', preReq, function (req, res) {
      res.render(
        'wordGame',
        jadeObject.basic(req, "Word Wizard")
        .setSocialDescription("Test your vocabulary with the hardest word game around!")
        .setSocialImgUrl("http://jerry-schneider.com/images/wordWizard.png")
      )
    });

    app.get('/wordWizardTutorial', preReq, function (req, res) {
      res.render(
        'wordGameTutorial',
        jadeObject.basic(req, "Word Wizard Tutorial")
        .setSocialDescription("Test your vocabulary with the hardest word game around!")
        .setSocialImgUrl("http://jerry-schneider.com/images/wordWizard.png")
      )
    });

    app.get('/wordGameAjax', preReq, function (req, res) {
      wordGame.handleRequest(req, res);
    });

    app.get('/secrets', preReq, function (req, res) {
      res.render(
        'secrets',
        jadeObject.basic(req, "Secret Links")
      )
    });

    app.get('/playground', preReq, function (req, res) {
      res.render(
        'playground',
        jadeObject.basic(req, "Playground")
      )
    });

    app.get('/testing', preReq, function (req, res) {
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

    app.get('/logout', preReq, function(req, res) {
      req.logout();
      res.redirect('/login');
    });

    app.get('/login', isLoggedInLogin, function(req, res) {
      res.render(
        'loginPage',
        jadeObject.basic(req, "Login")
      )
    });

    app.get('/cloudRocket', preReq, function(req, res) {
      res.render(
        'runner',
        jadeObject.basic(req, "Cloud Rocket")
      )
    });

    app.get('/signup', isLoggedInLogin, function(req, res) {
      res.render(
        'signup',
        jadeObject.basic(req, "Sign Up")
      )
    });

    app.get('/blog', preReq, function (req, res) {
      res.render(
        'blog',
        jadeObject.basic(req, "Jerry's Blog")
        .setSocialDescription("The most recent blog posts by Jerry Schneider are waiting to be read!")
      )
    });

    app.get('/blog/*', preReq, function (req, res) {
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

    app.get('/google62bc3c09f7c33d86.html', preReq, function(req, res) {
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

    app.get('*', function(req, res){
      res.status(404).render(
        '404',
        jadeObject.noSocial(req, "404")
      )
    });
};

// route from www to non-www
function preReq(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        return next();     
    }
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return preReq(req, res, next);
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

function isLoggedInLogin(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated()) {
        return preReq(req, res, next);
    }

    // if they aren't redirect them to the home page
    res.redirect('/profile');
}
