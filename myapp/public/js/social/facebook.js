function FacebookHelper() {

    this.postToFeed = function(title, desc, url, image){
        console.log(image);
        var obj = {method: 'feed',link: url, picture: image,name: title,description: desc};
        function callback(response){}
        FB.ui(obj, callback);
    };

    this.shareOnFacebook = function(elem) {
        elem = $(elem);
        if (!elem) {
            console.log("no elem");
            return;
        }
        Facebook.postToFeed(elem.data('title'), elem.data('desc'), elem.data('href'), elem.data('image'));
        return false;
    };

    this.initPage = function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '810673575665099',
                xfbml      : true,
                version    : 'v2.2'
            });
            Facebook.initPage();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        $(".fb-share").click(function(){
            Facebook.shareOnFacebook(this);
        });
    };
}

var Facebook = new FacebookHelper();
Facebook.initPage();
