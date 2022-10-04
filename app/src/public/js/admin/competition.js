
$(document).ready(function() {
    $(".menu1").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#page1").addClass("selected")
    })
    $(".menu2").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#page2").addClass("selected")
    })
    $(".menu3").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#page3").addClass("selected")
    })
    $(".menu4").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#page4").addClass("selected")
    })
    $(".menu5").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#page5").addClass("selected")
    })
    if($(location).attr('pathname')==="/admin/competition") {
        $(".menu1").click();
    }
    if($(location).attr('pathname')==="/admin/competition/all") {
        $(".menu2").click();
    }
    if($(location).attr('pathname')==="/admin/competition/ing") {
        $(".menu3").click();
    }
    if($(location).attr('pathname')==="/admin/competition/will") {
        $(".menu4").click();
    }
    if($(location).attr('pathname')==="/admin/competition/end") {
        $(".menu5").click();
    }

    const reward = document.querySelector("#reward"),
        join_pay = document.querySelector("#join_pay"),
        total_member = document.querySelector("#total_member"),
        start_date = document.querySelector("#start_date"),
        end_date = document.querySelector("#end_date"),
        more_dec = document.querySelector("#more_dec"),
        post_btn = document.querySelector("#post_btn");

    post_btn.addEventListener("click", post_competition);

    function post_competition() {
        if($("#game_type option:selected").val() === "") return alert("게임을 선택해주세요")
        if($("#eglevel option:selected").val() === "") return alert("등급을 선택해주세요")
        if(!reward.value) return alert("상금을 입력해주세요")
        if(!join_pay.value) return alert("참가비를 입력해주세요")
        if(!start_date.value) return alert("시작 일시를 입력해주세요")
        if(!end_date.value) return alert("마침 일시를 입력해주세요")
        if(!more_dec.value) return alert("설명을 입력해주세요")

        const req = {
            game_type: $("#game_type option:selected").val(),
            reward: reward.value,
            join_pay: join_pay.value,
            total_member: total_member.value,
            eglevel: $("#eglevel option:selected").val(),
            start_date: start_date.value,
            end_date: end_date.value,
            more_dec: more_dec.value,
        }
        fetch("/admin/competition/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res, req)=> {
            if(res.success) {
                alert("대회 포스트가 완료되었습니다")
                location.href="/admin/competition";
            } else {
                alert(res.msg);
            }
        })
    }

    function changeOption() { 
        $(".wrap").html("");
        const req = {
            game_type: $("#game_type_all option:selected").val(),
            eglevel: $("#eglevel_all option:selected").val(),
            order: $("#order_all option:selected").val(),
        }
        console.log(req)
        fetch("/admin/competition/getcompetition", {
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
                                <div class="heart"><i class="fas fa-trash-alt"></i></div>
                                <div class="twitter"><i class="fas fa-edit"></i></div>
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
                $(".wrap").append(list);
            }
            $(".inner_title > #valorant_all1").append('<img class="valorant" src="/img/valorant_logo.png" alt="">')
            $(".inner_title > #kakaoBattleground_all1").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #steamBattleground_all1").append('<img class="battleground" src="/img/BATTLEGROUNDS_OG.png" alt="">')
            $(".inner_title > #overwatch_all1").append('<img class="overwatch" src="/img/overwatch.png" alt="">')
            $(".info_value>li > .valorant_all").text("발로란트")
            $(".info_value>li > .kakaoBattleground_all").text("카카오 배틀그라운드")
            $(".info_value>li > .steamBattleground_all").text("스팀 배틀그라운드")
            $(".info_value>li > .overwatch_all").text("오버워치")
            $(".cmenu").click(function() {
                $(this).css('display','none');
                $(this).parent().parent().prev().css('display','flex')
                $(this).parent().parent().prev().css({"display":'block'}).animate({opacity: '1'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.heart').animate({top : '0'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.twitter').animate({top : '42px'}, 100)
                $(this).parent().parent().prev().children().children('.card_option').children('.link').animate({top : '84px'}, 100)

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
                url = location.origin + location.pathname +"/"+ $(this).parent().attr('id')
                textarea.value = url;
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                alert("링크가 복사되었습니다.")
                $(this).parent().prev().children().click()
            })
            
            $(".heart").click(function() {
                const ask = confirm("대회를 삭제하시겠습니까?")
                const req = {
                    uni_number: $(this).parent().attr('id')
                }
                console.log(req)
                if(ask) {
                    fetch("/admin/competition/delete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req),
                    })
                    .then((res) => res.json())
                    .then((res, req) => {
                        if(res.success) {
                            alert("대회가 삭제되었습니다")
                            location.href=location.href
                        }
                    })
                } else {
                    return false
                }
            });

        })
    }

    changeOption();
    
    $(".options > div #game_type_all").change(function() {
        changeOption()
    })
    $(".options > div #eglevel_all").change(function() {
        changeOption()
    })
    $(".options > div #order_all").change(function() {
        changeOption()
    })

})


