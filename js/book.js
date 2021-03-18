$(function() {
    var $pageflip = $("#pageflip");

    $pageflip.pageflipInit(
        {
            PageWidth: 2008,
            PageHeight: 2834,
            FullScreenEnabled: true,
            Margin: 64,
            CenterSinglePage: true,
            StartPage: 1,
            AutoFlipLoop: -1,
            ControlbarToFront: false,
            PagerText: "Seite #~Seite # und #",
            Thumbnails: false,
            HashControl: false,
            Emboss: true,
            AutoScale: true,
            Copyright: Key.Copyright,
            Key: Key.Key
        },
        "book");
});