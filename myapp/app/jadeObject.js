var moment = require('moment');

function JadeObject(req){

    this.year = (moment(Date.now())).format('YYYY');

    this.setTitle = function(a_title) {
        this.title = a_title;
        return this;
    }

    this.setUser = function(req) {
        this.user = req.user;
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
