$(document).ready(function() {
    $('#open_btn').click(function(){
        if($('#open_btn').hasClass("open_off")) {
            $('#open_btn').removeClass("open_off")
            $('#open_btn').addClass("open_on")
            $('.sidebar').css('right','0')
            $('html').css('overflow-y','hidden')
            $('.sidebar').css('overflow-y','scroll')
            $('.sidebar_wrap').css('display','flex')
        } else {
            $('#open_btn').removeClass("open_on")
            $('#open_btn').addClass("open_off")
            $('.sidebar').css('right','-402px')
            $('html').css('overflow-y','scroll')
            $('.sidebar').css('overflow-y','hidden')
            $('.sidebar_wrap').css('display','none')
            if($(".menu_title").hasClass("active")) {
                $(".menu_title").toggleClass('active')
                $(".menu_title > i").css('transform','rotateX(-180deg)')
            }
            if($(".menu_title").css("max-height") > 0 + "px") {
                $(".panel_sidemenu").css("max-height","")
            }
        }
    });    
    $('.sidebar_wrap').click(function() {
        $('#open_btn').click()
    });
})