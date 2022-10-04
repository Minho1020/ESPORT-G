$(document).ready(function() {  
    const notice_type2 = "all";
    noticeList2(notice_type2)
    $(".menu1").click(function() {
        $(".choosed").removeClass("choosed")
        $(".menu1").children().addClass("choosed")
        const notice_type = "all";
        noticeList(notice_type)
    })
    $(".menu2").click(function() {
        $(".choosed").removeClass("choosed")
        $(".menu2").children().addClass("choosed")
        const notice_type = "notice";
        noticeList(notice_type)
    })
    $(".menu3").click(function() {
        $(".choosed").removeClass("choosed")
        $(".menu3").children().addClass("choosed")
        const notice_type = "event";
        noticeList(notice_type)
    })
    $(".menu4").click(function() {
        $(".choosed").removeClass("choosed")
        $(".menu4").children().addClass("choosed")
        const notice_type = "update";
        noticeList(notice_type)
    })
    if($(location).attr('pathname')==="/notice") {
        $(".menu1").click();
    }
    if($(location).attr('pathname')==="/notice/notice") {
        $(".menu2").click();
    }
    if($(location).attr('pathname')==="/notice/event") {
        $(".menu3").click();
    }
    if($(location).attr('pathname')==="/notice/update") {
        $(".menu4").click();
    }
    

    function noticeList(notice_type) {
        const req =  {
            notice_type: notice_type,
        }
        fetch("/notice/getNotice", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            for(const i of data) {
                if(i.notice_type==="notice_all") {
                    var notice_type = "공지사항";
                } else if(i.notice_type==="event_all") {
                    var notice_type = "이벤트";
                } else {
                    var notice_type = "업데이트";
                }
                const card=`
                <div id="${i.uni_number}" class="card_notice">
                    <div class="card_title">
                        <img src="/img/fifa.png" alt="">
                        <a href="/notice/${i.uni_number}">${i.title}</a>                        
                    </div>
                    <div class="card_type">
                        <span>${notice_type}</span>
                    </div>
                    <div class="card_inDate">
                        <span>${i.in_date.slice(0, 10)}</span>
                    </div>
                </div>
                <hr>
                `;
                const new_mark = `<div class="new_mark"></div>`;
                const today = new Date().getTime();
                const inDate = new Date(i.in_date);
                inDate.setHours(inDate.getHours()+9)
                const indate = inDate.getTime()
                const result = (today - indate) / 1000 / 60 / 60 / 24;
                console.log(result)
                if(Math.floor(result) < 1) {
                    $('.card_wrap').append(card);
                    $(`#${i.uni_number}`).append(new_mark);
                } else {
                    $('.card_wrap').append(card);
                }

            }
        })
    }
    function noticeList2(notice_type) {
        const req =  {
            notice_type: notice_type,
        }
        fetch("/notice/getNotice", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            for(const i of data.slice(0,5)) {
                const card=`
                <div class="notice_card">
                    <a href="">
                        <div class="notice_title">${i.title}</div>
                        <div class="notice_inDate">${i.in_date.slice(0, 10)}</div>
                    </a>
                </div>
                `;
                $('.wrap').append(card);
            }
        })
    }





























});