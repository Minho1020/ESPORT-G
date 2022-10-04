$(document).ready(function() {

    recommand();
    recent();
    
    function recommand() { 
        $(".command_list").html("");
        const req = {
            game_type: "all",
            eglevel: "all",
            order: "random",
        }
        fetch("/competition/getcompetition", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            for(const i of data) {
                const start = i.start_date
                const start_dateObj = new Date(start);
                const start_korea = start_dateObj.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                const end = i.end_date
                const end_dateObj = new Date(end);
                if(i.more_dec.length > 60) {
                    i['more_dec'] = i.more_dec.slice(0,60) + "..." + ` <a href="/competition/${i.uni_number}" style=" color:black">자세히보기</a>`;
                }
                const end_korea = end_dateObj.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                const list = `
                <div class="swiper-slide list_slide">
                    <div class="card_wrap">
                        <div class="card_menu">
                            <div class="card_open">
                                <div class="ctime"><img src="/img/close_icon.png" alt=""></div>
                            </div>
                            <div id="${i.uni_number}" class="card_option">
                                <div class="heart"><i class="far fa-heart"></i></div>
                                <div class="twitter"><i class="fab fa-twitter"></i></div>
                                <div class="facebook"><i class="fab fa-facebook-f"></i></i></div>
                                <div class="link"><i class="fas fa-link"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="card_menu">
                        <div class="card_open">
                            <div class="cmenu"><img src="/img/menu_icon.png" alt=""></div>
                        </div>
                    </div>
                    <div class="slide_inner_wrapper">
                        <div class="inner_title">
                            <div class="title_game" id="${i.game_type}1"></div>
                            <div class="title_level"></div>
                        </div>
                        <div class="winner_pay"><p>상금 : </p><span>&nbsp;${i.reward + " EGC"}</span></div>
                        <div class="inner_info">
                            <div class="info_value">
                                <li><span>${start_korea + " ~ "}</span></li>
                                <hr>
                                <li><span class="${i.game_type}"></span></li>
                                <li><span>상금 &nbsp;<span>${i.reward}</span>&nbsp;EGC</span></li>
                                <li><span>참가비 &nbsp;<span>${i.join_pay}</span>&nbsp;EGC</span></li>
                                <hr>
                                <li><span>${i.more_dec}</span></li>
                            </div>
                        </div>
                        <div class="inner_btn">
                            <a href="/competition/${i.uni_number}">자세히 보기</a>
                        </div>
                    </div>
                </div>
                `;
                $(".recommand_list").append(list);
            }
            const more_card = `
            <div class="swiper-slide list_slide more_card">
                <div class="slide_inner_wrapper">
                    <div class="more"><span>더보기</span></div>
                    <div class="inner_btn" id="more">
                        <a href="/competition"><i class="fas fa-chevron-circle-right"></i></a>
                    </div>
                </div>
            </div>`;
            $(".recommand_list").append(more_card)
            $(".inner_title > #valorant_all1").append('<img class="valorant" src="/img/valorant_logo.png" alt="">')
            $(".inner_title > #kakaoBattleground_all1").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #steamBattleground_all1").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #overwatch_all1").append('<img class="overwatch" src="/img/overwatch.png" alt="">')
            $(".info_value>li > .valorant_all").text("발로란트(VALORANT)")
            $(".info_value>li > .kakaoBattleground_all").text("카카오 배틀그라운드(KAKAO)")
            $(".info_value>li > .steamBattleground_all").text("스팀 배틀그라운드(STEAM)")
            $(".info_value>li > .overwatch_all").text("오버워치(OVERWATCH)")
            var card_wrap = $(this).parent().parent().prev()
            var card_menu = $(this).parent().next()
            var card_option = card_wrap.children().children('.card_option')
            $(".cmenu").click(function() {
                $(this).css('display','none');
                card_wrap.css('display','flex');
                card_wrap.css({"display":'block'}).animate({opacity: '1'}, 100);
                card_option.children('.heart').animate({top : '0'}, 100);
                card_option.children('.twitter').animate({top : '42px'}, 100);
                card_option.children('.facebook').animate({top : '84px'}, 100);
                card_option.children('.link').animate({top : '126px'}, 100);
            });
            $(".ctime").click(function() {
                $(this).parent().parent().parent().animate({opacity: '0'}, 150, function() {
                    $(this).css('display','none');
                }); 
                card_menu.children('.heart').animate({top : '0px'}, 100);
                card_menu.children('.twitter').animate({top : '0px'}, 100);
                card_menu.children('.facebook').animate({top : '0px'}, 100);
                card_menu.children('.link').animate({top : '0px'},100)
                $(this).parent().parent().parent().next().children().children().css('display','flex').delay(100)
            });
            $(".link").click(function() {
                var url = '';
                var textarea = document.createElement("textarea");
                document.body.appendChild(textarea);
                url = location.origin +"/competition/"+ $(this).parent().attr('id')
                textarea.value = url;
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                alert("링크가 복사되었습니다.")
                $(this).parent().prev().children().click()
            });

            $('.list_slide').css('opacity','0')
            const competition_1 = new Swiper('#recommand_slide_swiper', {
                direction: 'horizontal',
                width: 310,
                slidesPerGroup : 1,
                allowTouchMove: false,
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
                allowTouchMove: false,
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
            setTimeout(function() {
                $(".loader").css("display","none")
                $('.list_slide').css('opacity','1')
            },300)
        })
    }
    function recent() { 
        $(".recent_list").html("");
        const req = {
            game_type: "all",
            eglevel: "all",
            order: "",
        }
        fetch("/competition/getcompetition", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            for(const i of data) {
                const start = i.start_date
                const start_dateObj = new Date(start);
                const start_korea = start_dateObj.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                const end = i.end_date
                const end_dateObj = new Date(end);
                if(i.more_dec.length > 60) {
                    i['more_dec'] = i.more_dec.slice(0,60) + "..." + ` <a href="/competition/${i.uni_number}" style=" color:black">자세히보기</a>`;
                }
                const end_korea = end_dateObj.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                const list = `
                <div class="swiper-slide list_slide">
                    <div class="card_wrap">
                        <div class="card_menu">
                            <div class="card_open">
                                <div class="ctime"><img src="/img/close_icon.png" alt=""></div>
                            </div>
                            <div id="${i.uni_number}" class="card_option">
                                <div class="heart"><i class="far fa-heart"></i></div>
                                <div class="twitter"><i class="fab fa-twitter"></i></div>
                                <div class="facebook"><i class="fab fa-facebook-f"></i></i></div>
                                <div class="link"><i class="fas fa-link"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="card_menu">
                        <div class="card_open">
                            <div class="cmenu"><img src="/img/menu_icon.png" alt=""></div>
                        </div>
                    </div>
                    <div class="slide_inner_wrapper">
                        <div class="inner_title">
                            <div class="title_game" id="${i.game_type}2"></div>
                            <div class="title_level"></div>
                        </div>
                        <div class="winner_pay"><p>상금 : </p><span>&nbsp;${i.reward + " EGC"}</span></div>
                        <div class="inner_info">
                            <div class="info_value">
                                <li><span>${start_korea + " ~ "}</span></li>
                                <hr>
                                <li><span class="${i.game_type}"></span></li>
                                <li><span>상금 &nbsp;<span>${i.reward}</span>&nbsp;EGC</span></li>
                                <li><span>참가비 &nbsp;<span>${i.join_pay}</span>&nbsp;EGC</span></li>
                                <hr>
                                <li><span>${i.more_dec}</span></li>
                            </div>
                        </div>
                        <div class="inner_btn">
                            <a href="/competition/${i.uni_number}">자세히 보기</a>
                        </div>
                    </div>
                </div>
                `;
                $(".recent_list").append(list);
            }
            const more_card = `
            <div class="swiper-slide list_slide more_card">
                <div class="slide_inner_wrapper">
                    <div class="more"><span>더보기</span></div>
                    <div class="inner_btn" id="more">
                        <a href="/competition"><i class="fas fa-chevron-circle-right"></i></a>
                    </div>
                </div>
            </div>`;
            $(".recent_list").append(more_card)
            $(".inner_title > #valorant_all2").append('<img class="valorant" src="/img/valorant_logo.png" alt="">')
            $(".inner_title > #kakaoBattleground_all2").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #steamBattleground_all2").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #overwatch_all2").append('<img class="overwatch" src="/img/overwatch.png" alt="">')
            $(".info_value>li > .valorant_all").text("발로란트(VALORANT)")
            $(".info_value>li > .kakaoBattleground_all").text("카카오 배틀그라운드(KAKAO)")
            $(".info_value>li > .steamBattleground_all").text("스팀 배틀그라운드(STEAM)")
            $(".info_value>li > .overwatch_all").text("오버워치(OVERWATCH)")
            $(".cmenu").click(function() {
                $(this).css('display','none');
                $(this).parent().parent().prev().css('display','flex')
                $(this).parent().parent().prev().css({"display":'block'}).animate({opacity: '1'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.heart').animate({top : '0'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.twitter').animate({top : '42px'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.facebook').animate({top : '84px'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.link').animate({top : '126px'}, 100)

            });
            $(".ctime").click(function() {
                $(this).parent().parent().parent().animate({opacity: '0'}, 150, function() {
                    $(this).css('display','none');
                }); 
                $(this).parent().next().children('.heart').animate({top : '0px'}, 100);
                $(this).parent().next().children('.twitter').animate({top : '0px'}, 100);
                $(this).parent().next().children('.facebook').animate({top : '0px'}, 100);
                $(this).parent().next().children('.link').animate({top : '0px'},100)
                $(this).parent().parent().parent().next().children().children().css('display','flex').delay(100)
            });
            $(".link").click(function() {
                var url = '';
                var textarea = document.createElement("textarea");
                document.body.appendChild(textarea);
                url = location.origin +"/competition/"+ $(this).parent().attr('id')
                textarea.value = url;
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                alert("링크가 복사되었습니다.")
                $(this).parent().prev().children().click()
            });
            $('.list_slide').css('opacity','0')
            const competition_1 = new Swiper('#recommand_slide_swiper', {
                direction: 'horizontal',
                width: 310,
                allowTouchMove: false,
                spaceBetween: 30,
                slidesPerGroup : 1,
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
            setTimeout(function() {
                $(".loader").css("display","none")
                $('.list_slide').css('opacity','1')
            },300)
        })
    }

});