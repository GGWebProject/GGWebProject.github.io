
$(function () {

/* Stop the animation when the page loads */ 
    $('body').removeClass('preload');

/* Open mobile menu */
	$('.button-menu').click(function () {
	    $(this).toggleClass('button-menu-open');
        $('.menu').toggleClass('menu-open');
        $('body').toggleClass('no-scroll');
        return false;
    });

/* Проверка ширины окна браузера */
    var windowWidth;
    var moveBlock;
    function windowResize() {

        windowWidth = $(window).width();
        moveBlock   = $('.col1');

        if (windowWidth >= 1024){
            $('.menu').removeClass('menu-mobile menu-open');
            $('.button-menu').removeClass('button-menu-open');
            moveBlock.detach().prependTo('.header__main'); // перемещение по dom картинки телефона
            menuHeight = 90;
        } else {
            $('.menu').addClass('menu-mobile');
            moveBlock.detach().appendTo('.moveblock'); // перемещение по dom картинки телефона
            menuHeight = 106;
        } 
        return windowWidth;
    };

    windowResize();

    $(window).resize(function () {
        windowResize();
    });

    /* задание menuHeight */
    var menuHeight;
    function setMenuHeight(value) {

        if(value == 'MAIN' && windowWidth >= 1900){
            menuHeight = 0;
        } else if(windowWidth >= 1024 && windowWidth < 1900){
            menuHeight = 90;
        } else {
            menuHeight = 106;
        }
    
    };
    /* Подсвечивание активного пункта меню при прокрутке*/

    var menuName = ['header .menu','#work .menu']; // список меню


    function onScroll() {

        for (var i = 0; i <= menuName.length - 1 ; i++) {



            var scroll_top = $(document).scrollTop();

            $(menuName[i] + ' a[href]').each(function () {
                var blockID = $(this).attr("href");
                var activeItem  = $(blockID);
                var namePart = activeItem.parent().prop("tagName"); // название части сайта для изменения menuHeight на 0 для экранов 1900+px
                setMenuHeight(namePart);

                if(activeItem.position().top  <= scroll_top + menuHeight + 1 && activeItem.position().top + activeItem.outerHeight() > scroll_top){
                    $(menuName[i] + " a.active").removeClass("active");
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            }); 
        }

    };

    $(document).on("scroll", onScroll);
 

    $(".menu a[href]").click(function(event){

           
            var linkPosition = $(this).parent().index(); // позиция нажатого li в меню

            $(document).off("scroll");
            $(".menu a.active").removeClass("active"); // удаление active во всех меню

            for (var i = 0; i <= menuName.length - 1 ; i++) {
                $(menuName[i]).find('li').eq(linkPosition).children('a').addClass('active'); // добавление active всем меню
            }


            var blockID = $(this).attr("href");
            var activeItem  = $(blockID);
            console.dir(activeItem);
            var namePart = $("#work").parent().prop("tagName"); // название части сайта для изменения menuHeight на 0 для экранов 1900+px
            
            setMenuHeight(namePart);

            $("html, body").animate({
                scrollTop: activeItem.offset().top - menuHeight
            }, 500, function(){
                window.location.blockID = blockID;
                $(document).on("scroll", onScroll);
            });

            if(windowWidth >= 1024){
                menuHeight = 90;
            } else {
                menuHeight = 106;
            }

            return false;

       



    });

    /* Конец Подсвечивание активного пункта меню при прокрутке*/

});