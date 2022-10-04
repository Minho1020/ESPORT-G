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
    if($(location).attr('pathname')==="/admin/notice") {
        $(".menu1").click();
    }
    if($(location).attr('pathname')==="/admin/notice/posting") {
        $(".menu2").click();
    }

    $(".menu_1").click(function() {
        $(".choose").removeClass("choose")
        $(".menu_1").children().addClass("choose")
        const notice_type = "all";
        noticeList(notice_type)
    })
    $(".menu_2").click(function() {
        $(".choose").removeClass("choose")
        $(".menu_2").children().addClass("choose")
        const notice_type = "notice";
        noticeList(notice_type)
    })
    $(".menu_3").click(function() {
        $(".choose").removeClass("choose")
        $(".menu_3").children().addClass("choose")
        const notice_type = "event";
        noticeList(notice_type)
    })
    $(".menu_4").click(function() {
        $(".choose").removeClass("choose")
        $(".menu_4").children().addClass("choose")
        const notice_type = "update";
        noticeList(notice_type)
    })
    $(".menu_1").click()

    let editor;

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            language: {ui : 'ko', content: 'ko'}
        } )
        .then( newEditor => {
            editor = newEditor;
        })
        .catch( error => {
            console.error( error );
        });

    let editor2;

    ClassicEditor
        .create( document.querySelector( '#editor2' ), {
            language: {ui : 'ko', content: 'ko'}
        } )
        .then( newEditor => {
            editor2 = newEditor;
        })
        .catch( error => {
            console.error( error );
        });

    const post_btn = document.querySelector("#submit"),
        cancel_btn = document.querySelector("#cancel"),
        preview = document.querySelector("#preview"),
        preview2 = document.querySelector("#preview2"),
        title = document.querySelector("#title"),
        title2 = document.querySelector("#title2");

    post_btn.addEventListener("click", posting)

    function posting() {
        if(!title.value) return alert("제목을 입력해주세요")
        const editorData = editor.getData();
        if(!editorData) return alert("내용을 입력해주세요")

        const req = {
            title: title.value,
            preview: preview.value,
            notice_type : $("#notice_type option:selected").val(),
            content: editorData,
        }
        fetch("/admin/notice/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res, req) => {
            if(res.success) {
                alert("공지 포스팅이 완료되었습니다")
                location.href="/admin/notice/posting";
            } else {

            }
        })
    } 

    function noticeList(notice_type) {
        $(".card_wrap").html("");
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
                        <a href="/">${i.title}</a>                        
                    </div>
                    <div class="card_type">
                        <span>${notice_type}</span>
                    </div>
                    <div class="card_inDate">
                        <span>${i.in_date.slice(0, 10)}</span>
                    </div>
                    <div class="notice_add">
                        <div class="edit"><i class="fas fa-edit"></i></div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>
                </div>
                <hr>
                `;
                $('.card_wrap').append(card);
            }
            $(".delete").click(function() {
                const ask = confirm("이 공지를 삭제하시겠습니까?");
                const req = {
                    uni_number: $(this).parent().parent().attr('id')
                }
                if(ask) {
                    fetch("/admin/notice/delete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req),
                    })
                    .then((res) => res.json())
                    .then((res, req) => {
                        if(res.success) {
                            alert("공지가 삭제되었습니다")
                            location.href=location.href;
                        } else {
                            alert("문제가 발생했습니다. 나중에 다시 실행해주세요")
                        }
                    })
                } else {
                    return false
                }
            });
            $(".edit").click(function() {
                const ask = confirm("이 공지를 수정하시겠습니까?");
                const req = {
                    uni_number: $(this).parent().parent().attr('id')
                };
                if(ask) {
                    fetch("/admin/notice/edit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(req),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        for(const i of data) {
                            $(".selected").removeClass("selected")
                            $("#page3").addClass("selected")
                            $("#edit_btn").attr("class",i.uni_number)
                            title2.value=i.title;
                            preview2.value=i.preview;
                            $("#notice_type2").val(i.notice_type).prop("selected",true);
                            editor2.setData(i.content)
                        }
                    })
                } else {
                    return false
                }
            })
            $("#edit_btn").click( function() {
                const editorData2 = editor2.getData();
                const req = {
                    uni_number: $(this).attr('class'),
                    content: editorData2,
                    preview: preview2.value,
                    notice_type: $("#notice_type2 option:selected").val(),
                    title: title2.value
                };
                fetch("/admin/notice/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(req),
                })
                .then((res) => res.json())
                .then((res, req) => {
                    if(res.success) {
                        alert("공지 수정이 완료되었습니다.")
                        location.href=location.href;
                    } else {
                        alert("문제가 발생했습니다. 나중에 다시 실행해주세요")
                    }
                })
            });
            $("#cancel").click(function() {
                location.href=location.href;
            })
            $("#cancel2").click(function() {
                location.href=location.href;
            })
        })
    }

});