$(function() {

    /* ~~~~~~~~~~ Smooth scroll ~~~~~~~~~~ */

    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 120)
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });


    /* ~~~~~~~~~~ Overlay search ~~~~~~~~~~ */

    if($('#overlay-search').length) {
        var $overlay = $('#overlay-search');
        $('.search-button-action').click(function(){
            if ( $overlay.is(':visible') ) {
                $overlay.fadeOut();
            } else {
                $overlay.fadeIn();
            }
        });

        $('#close').click(function(){
            $overlay.fadeOut();
        });
    }


    /* ~~~~~~~~~~ Toggle content button name change ~~~~~~~~~~ */

    $('#toggle-content-button').click(function () {
        if($.trim($("#toggle-content-button").html())=='Read more') {
            $('#toggle-content-button').html('Hide');
        } else {
            $('#toggle-content-button').html('Read more');
        }
    });


    /* ~~~~~~~~~~ Add page scroll to contact link on top navbar ~~~~~~~~~~ */

    $('.navbar-default .navbar-nav .contact-link a').addClass('page-scroll');


    /* ~~~~~~~~~~ Change navbar after scroll ~~~~~~~~~~ */

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".navbar-default").addClass("navbar-scrolled");
        } else {
            $(".navbar-default").removeClass("navbar-scrolled");
        }
    });



    $("a.single-image__show-gallery").fancybox();


    /* ~~~~~~~~~~ Match height ~~~~~~~~~~ */

    $(function() {
        $('.match-height').matchHeight({
            byRow: true,
            property: 'min-height',
            target: null,
            remove: false
        });
    });


    /* ~~~~~~~~~~ Replace the name of Destinations to Camps in main navigation ~~~~~~~~~~ */

    // $( "#menu-main-navigation li.camps-link > .dropdown-toggle" ).html('Camps<span class="caret"></span>');

});

$(document).ready(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr('href');
        if (target === '#collapse-tab-1') {
            if (!$('#collapse-tab-1').mixItUp('isLoaded')) {
                $('#collapse-tab-1').mixItUp({
                    selectors: {
                        filter: '.filter-1'
                    }
                });
            }
        }
    });
});

$(document).ready(function() {
    $('#collapse-tab-0').mixItUp({
        selectors: {
            filter: '.filter-0'
        }
    });
});

(function($){
    $(document).ready(function(){
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass('open');
            $(this).parent().toggleClass('open');
        });
    });
})(jQuery);
