$(function()
{
    var $gallery = $("#gallery");
    var $photoSwipe = $(".pswp");
    var gallery;
    
    var items = $gallery.find("img").map(function(index, image)
    {
        var $image = $(image);

        $image.click(function()
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
            w: $image.attr("width"),
            h: $image.attr("height"),
            //title: $caption.html(),
            image: $image[0]
        };
    }).get();
});