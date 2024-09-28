$(function()
{
    var $masonry = $("#masonry");
    var $filters = $(".masonry-filter");
   
    function onFilterClick(event) 
    {
        event.preventDefault();
        
        $link = $(event.currentTarget);

        if ($filters.not(".active").length > 0)
        {
            if ($link.hasClass("active"))
            {
                $link.removeClass("active");
                $filters.addClass("active");
            } else {
                $filters.removeClass("active");
                $link.addClass("active");
            }
        }
        else
        {
            $filters.removeClass("active");
            $link.addClass("active");
        }              

        updateIsotopeFilters();
    }

    function updateIsotopeFilters()
    {       
        var filter = $filters
        .filter(".active")
        .map(function () {
            return $(this).data("masonry-filter");
        })
        .get()
        .join(', ');

        $masonry.isotope({ filter: filter });
    }


    $masonry.isotope(
        {
            columnWidth: ".masonry-sizer",
            itemSelector: ".masonry-item",
            percentPosition: true,
            //transitionDuration: 0
        });

    $filters.click(onFilterClick);
});