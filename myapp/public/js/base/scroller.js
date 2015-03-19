function Scroller() {
    var bScrolling = false;

    var scroll = function(elem, amount, callbackScroll, hoverElem) {
        $(elem).animate({
            scrollLeft: amount
            }, 40, 'linear',function() {
                if (amount != '' && bScrolling) {
                    callbackScroll(elem, hoverElem);
                }
            }
        );
    };

    var scrollRight = function(elem, hoverElem) {
        scroll(elem, "+=10", scrollRight, hoverElem);
        var scrollContents = elem.find('.linkHolder');
        if (elem.scrollLeft() + elem.width() == scrollContents.width())
        {
            hoverElem.hide();
        }
    }

    var scrollLeft = function(elem, hoverElem) {
        scroll(elem, "-=10", scrollLeft, hoverElem);
        if (elem.scrollLeft() == 0) {
            hoverElem.hide();
        }
    }

    this.register = function(elem) {
        var scrollingElement = $(elem).find(".linkCarousel");
        var rScrollElem = $(elem).find(".scroller.right");
        var lScrollElem = $(elem).find(".scroller.left");

        rScrollElem.hover(
            function() {
                lScrollElem.show();
                bScrolling = true;
                scrollRight(scrollingElement, rScrollElem);
            }, function() {
                bScrolling = false;
            }
        );

        lScrollElem.hover(
            function() {
                rScrollElem.show();
                bScrolling = true;
                scrollLeft(scrollingElement, lScrollElem);
            }, function() {
                bScrolling = false;
            }
        );

        var scrollContents = scrollingElement.find('.linkHolder');
        var leftOffset = (scrollContents.width() - scrollingElement.width()) / 2;
        scrollingElement.scrollLeft(leftOffset);
    };
}

$(document).ready((function(){
    var globalScroller = new Scroller();
    var scrollerElements = $(".scrollingUnit");
    scrollerElements.each(function(index){
        var scrollerElement = scrollerElements[index];
        if (!scrollerElement) { return; }
        globalScroller.register(scrollerElement);
    });
}));
