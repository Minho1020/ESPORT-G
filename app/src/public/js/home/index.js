$(document).ready(function() {
    const competition_1 = new Swiper('#recommand_slide_swiper', {
        direction: 'horizontal',
        width: 310,
        slidesPerGroup : 1,
        spaceBetween: 30,
        navigation: {
            nextEl: "#right_1",
            prevEl: "#left_1",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        breakpoints: { 
            0: {
                slidesPerGroup : 1,
                allowTouchMove: true,
            },
            750: { 
                slidesPerGroup : 2,
                slidePerView: 2,
                allowTouchMove:false,
            },
            1200: {
                slidesPerGroup : 3,
                slidePerView: 3,
                allowTouchMove: false,
            },
            1570: {
                slidesPerGroup : 4,
                slidePerView: 4,
                allowTouchMove: false,
            },
            2000: {
                slidesPerGroup : 5,
                slidePerView: 5,
                allowTouchMove: false,
            },
            2500: {
                slidesPerGroup : 6,
                slidePerView: 6,
                allowTouchMove: false,
            },
        }
    });
    const competition_2 = new Swiper('#recent_slide_swiper', {
        direction: 'horizontal',
        width: 310,
        slidesPerGroup : 1,
        spaceBetween: 30,
        navigation: {
            nextEl: "#right_2",
            prevEl: "#left_2",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        breakpoints: { 
            0: {
                slidesPerGroup : 1,
                allowTouchMove: true,
            },
            750: { 
                slidesPerGroup : 2,
                slidePerView: 2,
                allowTouchMove:false,
            },
            1200: {
                slidesPerGroup : 3,
                slidePerView: 3,
                allowTouchMove: false,
            },
            1570: {
                slidesPerGroup : 4,
                slidePerView: 4,
                allowTouchMove: false,
            },
            2000: {
                slidesPerGroup : 5,
                slidePerView: 5,
                allowTouchMove: false,
            },
            2500: {
                slidesPerGroup : 6,
                slidePerView: 6,
                allowTouchMove: false,
            },
        }
    });
    const adver_swiper = new Swiper('#adver_slide', {
        direction: 'horizontal',
        loop: true,
        slidePerView: 1,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });  
    $('#gpay_btn').click(function() {
        $('.gpay_wrap').css('display','flex')
        $('.my_esportgpay').css('display','block')
        $('body').css('overflow','hidden')
    });
    $('.gpay_wrap').click(function() {
        $('.gpay_wrap').css('display','none')
        $('.my_esportgpay').css('display','none')
        $('body').css('overflow','scroll')
    });
    $('.sidebar_wrap').click(function() {
        $('#open_btn').click()
    });
    

    var acc = document.getElementsByClassName("menu_title");
    var a;
    for (a = 0; a < acc.length; a++) {
        acc[a].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
