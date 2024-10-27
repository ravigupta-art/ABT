$(document).ready(function () {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });


    // Fixed header on scroll
    $(window).scroll(function () {
        let $header = $('.makefix'),
                $headerLogo = $('.header-logo'),
                $logoText = $('.logo-text'),
                $menuIcon = $('.menu-icon'),
                $hideLogo = $('.hidelogo');

        if ($(window).scrollTop() >= 1) {
            $header.addClass('fixedheader');
            $headerLogo.addClass('smlogo-img');
            $logoText.addClass('smlogo-text');
            $('.lt-horizontal').removeClass('lt-vertical');
            $menuIcon.addClass('menu-space');
            $hideLogo.addClass('logoinvis');
        } else {
            $header.removeClass('fixedheader');
            $headerLogo.removeClass('smlogo-img');
            $logoText.removeClass('smlogo-text');
            $('.lt-horizontal').addClass('lt-vertical');
            $menuIcon.removeClass('menu-space');
            $hideLogo.removeClass('logoinvis');
        }
    });


    // Menubar toggle
    $("html").on("click", function (e) {
        let $t = $(e.target),
                $myMenu = $(".menubar"),
                $toggleMenu = $(".menubtn"),
                $overlay = $("#overlay"),
                $closemenu = $("#closemenu");

        if (!$t.is($myMenu) && !$myMenu.has($t).length) {
            if ($t.is($toggleMenu) || $toggleMenu.has($t).length) {
                $myMenu.toggleClass("open");
                $overlay.css("right", "0");
                $closemenu.css("top", "0");
            } else {
                $myMenu.removeClass("open");
                $overlay.css("right", "100%");
                $closemenu.css("top", "-30px");
            }
        }

        $closemenu.click(function () {
            $myMenu.removeClass("open");
            $overlay.css("right", "100%");
            $closemenu.css("top", "-30px");
        });
    });

    // Scroll bottom to top and top to bottom
    let isBottom = false;
    window.addEventListener('scroll', function () {
        const scrollIcon = document.getElementById('scrollIcon');
        const scrolled = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrolled / (docHeight - winHeight)) * 100;

        if (scrollPercent >= 50) {
            isBottom = true;
            scrollIcon.innerHTML = '<span class="material-icons">arrow_upward</span>';
        } else {
            isBottom = false;
            scrollIcon.innerHTML = '<span class="material-icons">arrow_downward</span>';
        }
    });
    document.getElementById('scrollIcon').addEventListener('click', function () {
        window.scrollTo({
            top: isBottom ? 0 : document.body.scrollHeight,
            behavior: 'smooth'
        });
        isBottom = !isBottom;
    });


    // Blind mode toggle
    $('.blind').click(function () {
        $(this).toggleClass('active');
        $('body').toggleClass('bmode');
    });


    // Initialize Slick sliders
    function initSlickSlider(selector, slidesToShow) {
        $(selector).slick({
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: false,
            autoplaySpeed: 5000,
            cssEase: 'linear',
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: Math.max(2, slidesToShow - 1)
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    initSlickSlider('.homeresearch', 3);
    initSlickSlider('.homenews', 3);
    initSlickSlider('.homeannouncement', 3);
    initSlickSlider('.homeevents', 3);
    initSlickSlider('.footerimages', 1);


    // Equal height for Research Highlights and News
    function setEqualHeight(selector) {
        let maxHeight = 0;
        $(selector).each(function () {
            maxHeight = Math.max($(this).height(), maxHeight);
        });
        $(selector).height(maxHeight);
    }
    setEqualHeight('.home-research-info');
    setEqualHeight('.homenews-info');


    // Add Element on dropdown click
    $('.addmysection').click(function (e) {
        e.preventDefault();
        $('#addelement1').empty().append($('.myroq').clone().show());
    });


    // A To Z Index Alphabetical Scroll
    $('a[href*=\\#]:not([href=\\#])').on('click', function () {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            let offset = $(window).width() > 991 ? 125 : 70;
            $('html,body').animate({
                scrollTop: (target.offset().top - offset)
            }, 500);
            return false;
        }
    });


    // A To Z Index Fixed Alphabetical List
    try {
        let fixmeTop = $('.a-zalphabets').offset().top;
        $(window).scroll(function () {
            let currentScroll = $(window).scrollTop();
            $('.a-zalphabets').toggleClass('freezalphabets', currentScroll >= fixmeTop);
        });
    } catch (err) {
        // Handle the error if .a-zalphabets doesn't exist
    }


    // People page tab
    $('#ChildVerticalTab_1').easyResponsiveTabs({
        type: 'horizontal',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1'
    });

});

// Skip to main content
function skiptocontent() {
    $('html, body').animate({
        scrollTop: $("#maincontent").offset().top
    }, 500);
}
