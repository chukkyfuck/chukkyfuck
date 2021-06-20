$(function()
{
    var $masonry = $("#masonry");
    var $photoSwipe = $(".pswp");
    var gallery;
    
    $masonry.masonry(
        {
            columnWidth: ".masonry-sizer",
            itemSelector: ".masonry-item",
            percentPosition: true,
            transitionDuration: 0
        });

    var items = $masonry.find(".figure").map(function(index, figure)
    {
        var $figure = $(figure);
        var $image = $figure.find("img");
        //var $caption = $figure.find(".figure-caption");

        $figure.click(function()
        {
            var options =
            {
                index: index,
                shareEl: false,
                showHideOpacity: true,
                getThumbBoundsFn: function (index)
                {
                    var image = items[index].image;
                    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    var rect = image.getBoundingClientRect();

                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                }
            };

            gallery = new PhotoSwipe($photoSwipe[0], PhotoSwipeUI_Default, items, options);
            gallery.init();
        });

        return {
            src: $image.attr("src"),
            w: $image[0].naturalWidth,
            h: $image[0].naturalHeight,
            //title: $caption.html(),
            image: $image[0]
        };
    }).get();
});