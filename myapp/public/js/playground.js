function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

$(document).ready(function(){
    $('.top, .mapCTA, .list.alternate .listing').click(function(){
        var filterHeight = $('.filters').height();
        var height = $('.filters').hasClass('mapMode') ? "initial" : filterHeight+1+"px";
        $('.container').css({"height": height});

        if ($('.container').hasClass('animate')) {
            $('.container').toggleClass('listMode').toggleClass('mapMode');
            $('.map').removeClass('noTrans').addClass('trans');
            setTimeout(function(){
                $('.filters, .list').toggleClass('listMode').toggleClass('mapMode');
            }, $('.filters').hasClass('mapMode') ? 0 :100);
            setTimeout(function(){
                $('.map').addClass('noTrans').removeClass('trans');
            }, 400);
        } else {
            $('.filters, .list, .container').toggleClass('listMode').toggleClass('mapMode');
        }
    });

    $('.map').click(function(){
        var elmt = $('.list.alternate .wrap');
        var height = elmt.height();
        var movement = rand(0,height - $('.map').height());
        $('.list.alternate .wrap').css({"margin-top":"-"+movement+"px"});
    });

    $('.animButton').click(function(){
        $('.container').toggleClass('animate');
    });
});
