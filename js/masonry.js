$(function() {
    var $masonry = $("#masonry");

    $masonry.imagesLoaded(function() {
        $masonry.masonry(
            {
                columnWidth: ".masonry-sizer",
                itemSelector: ".masonry-item",
                percentPosition: true,
                transitionDuration: 0
            });
    });
});