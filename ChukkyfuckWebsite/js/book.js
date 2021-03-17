$(function() {
    var $pageflip = $("#pageflip");

    $pageflip.pageflipInit(
        {
            PageWidth: 2008,
            PageHeight: 2834,
            FullScreenEnabled: true,
            Margin: 64,
            CenterSinglePage: false,
            StartPage: 1,
            AutoFlipLoop: -1,
            ControlbarToFront: true,
            Thumbnails: false,
            HashControl: true,
            Emboss: true,
            AutoScale: true,
            Copyright: Key.Copyright,
            Key: Key.Key
        },
        "book");
});