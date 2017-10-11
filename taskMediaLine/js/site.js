
$( document ).ready(function() {
    /*      SCROLL    */
    $(document).on('click', '.button_up', function(event){
        event.preventDefault();
        var customoffset = 0;
        var target_offset = $( $.attr(this, 'href')).offset() ? $( $.attr(this, 'href')).offset().top : 0;
        $('html, body').animate({scrollTop:target_offset - customoffset}, 1000);
    });
    /*		fixed block			*/
    $(window).scroll(function fixedBlock() {
    if (window.pageYOffset > '700'){
            $('.fixed_block ul').css({
            	'display':'block',
            	'z-index':"9999",
            	'opacity':'1'
            	});

        } else{
            $('.fixed_block ul').css({
            	'display':'none',
            	'z-index':"-1",
            	'opacity':'0'
            	});
        }
    });

    // /*          menu                */
    // $('.navbar_top .menu a').hover(  function() {$(this).addClass('button');}
    //                                 , function() {$(this).removeClass('button');}
    // );
        

    // /*          END MENU                    */
    /*	slide site map */
    var windWidth = window.innerWidth;

    	if ( windWidth < 768) {
    		$('.site_map h6').next().css('display','none');
    		$('.site_map h6').addClass("slide_list");
    		$('.site_map h6').stop().click(function () {

    			$(this).children('span').toggleClass('rotate_elem');        
    			$(this).next().stop().slideToggle();
    			return false;
    		})
    	} else	{
    		$('.site_map h6').removeClass("slide_list");
    	}


/*  fixed mobile contact */

    $('.fixed_block .mobile').stop().click(function () {
        $('.hide_elem').slideToggle();
        return false;
    })

/* mobile menu */

    $('.button_mob-menu').click(function () {
        if ($('.menu_mobile').css('width') === '0px'){
            $('.menu_mobile').css('width','100%');
            $("body").css("overflow","hidden"); 
        } else {
            $('.menu_mobile').css('width','0px');
            $("body").css("overflow","auto");
        }
        return false;
    });
    $('.menu_mobile a, button_close').click(function () {
        $('.menu_mobile').css('width','0px');
        $("body").css("overflow","auto");
    });
    /* end mobile menu */
});
