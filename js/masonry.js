$(function()
{
    var $masonry = $("#masonry");

    $masonry.masonry(
        {
            columnWidth: ".masonry-sizer",
            itemSelector: ".masonry-item",
            percentPosition: true,
            transitionDuration: 0
        });
});