var moment = require('moment');
var URL = require('url');

function JadeObject(req){

    this.myPath = "http://jerry-schneider.com"+URL.parse(req.originalUrl).pathname;

    this.socialDescription = "Jerry Schneider's website has a lot of great games and articles.  Check out WordWizard, Marvel Puzzle Quest articles, emulators, and much more.";
    this.socialImageUrl = "http://jerry-schneider.com/images/jerry2.jpg";

    this.year = (moment(Date.now())).format('YYYY');

    this.setTitle = function(a_title) {
        this.title = a_title;
        return this;
    }

    this.setUser = function(req) {
        this.user = req.user;
        return this;
    }

    this.setSocialDescription = function(desc) {
        this.socialDescription = desc;
        return this;
    }

    this.setSocialImgUrl = function(url) {
        this.socialImageUrl = url;
        return this;
    }

    this.customSEO = function(isCustom) {
        this.customSEO = isCustom;
        return this;
    }

    if( req.isAuthenticated() ) {
        this.auth = true;
        this.setUser(req);
    }
};

exports.basic = function(req, title) {
    var jo = new JadeObject(req);
    return jo.setTitle(title);
}

exports.auth = function(req, title) {
    var jo = new JadeObject(req);
    return jo.setTitle(title);
}
