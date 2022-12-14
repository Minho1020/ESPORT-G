
$(document).ready(function() {
    $("#psword").on("propertychange change keyup paste input", function() {
        pswordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        psword_val = $("#psword").val();
        if(pswordRegExp.test(psword_val)) {
            $("#er_psword").css("display","block").css("color","#00bf00")
            $(".psword .checkbox > i:nth-child(2)").css("display","block")
            $(".psword .checkbox > i:nth-child(1)").css("display","none")
        } else {
            $("#er_psword").css("display","block").css("color","#DB4455")
            $(".psword .checkbox > i:nth-child(1)").css("display","block")
            $(".psword .checkbox > i:nth-child(2)").css("display","none")
        }
    });
    $("#confirm-psword").on("propertychange change keyup paste input", function() {
        confirm_psword_val = $("#confirm-psword").val();
        if(confirm_psword_val === psword_val && confirm_psword_val.length > 1) {
            $("#er_confirm-psword").css("display","block").css("color","#00bf00")
            $(".confirm-psword .checkbox > i:nth-child(2)").css("display","block")
            $(".confirm-psword .checkbox > i:nth-child(1)").css("display","none")
        } else {
            $("#er_confirm-psword").css("display","block").css("color","#DB4455")
            $(".confirm-psword .checkbox > i:nth-child(1)").css("display","block")
            $(".confirm-psword .checkbox > i:nth-child(2)").css("display","none")
        }
    });

    
    const email = document.querySelector("#email"),
        id = document.querySelector("#id"),
        nextBtn = document.querySelector("#next_btn"),
        ctfnumber = document.querySelector("#ctf_number"),
        mailer_btn = document.querySelector("#mailer"),
        checker_btn = document.querySelector("#checker"),
        psword = document.querySelector("#psword"),
        confirmPsword = document.querySelector("#confirm-psword"),
        new_btn = document.querySelector("#new_btn");


    nextBtn.addEventListener("click", register);
    mailer_btn.addEventListener("click", mailing);
    checker_btn.addEventListener("click",ctf);
    new_btn.addEventListener("click", newPsword)

    function mailing() {
        emailRegExp = /^[A-Za-z0-9_.]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        email_val = $("#email").val();
        if(!emailRegExp.test(email_val)) {
            return alert("????????? ???????????? ??????????????????")
        }
        const req = {
            email: email.value,
        }
        fetch("/register/mailing/ctf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success) {
                $("#mailer_box").css("display","flex")
                $("#mailer").text("???????????? ?????????")
                $("#email").prop('readonly',true)
            } else {
                return alert("?????? ??????????????????")
            }
        })
    }

    function ctf() {
        const req = {
            email: email.value,
            ctfnumber: ctfnumber.value,
        }
        fetch("/register/ctf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success) {
                $("#ctf_number").prop('readonly',true)
                $("#checker").text("????????????").prop('disabled',true)
                $("#mailer").prop('disabled', true)
                alert("????????? ????????? ?????????????????????")
            } else {
                alert(res.msg)
            }
        })
        
    }

    function register() {

        if(!ctfnumber.value) return alert("????????? ????????? ????????????")
        if($("#mailer").prop('disabled')===false) {
            return alert("??????????????? ???????????????")
        }

        const req = {
            email: email.value,
        };

        fetch("/updatepsword",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res)=> {
            if(res.success) {
                $(".login_page").animate({
                    opacity: '0',
                }).css('display','none')
                $(".newPw_page").css('display','flex').animate({
                    opacity: '1',
                })
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("???????????? ??? ?????? ??????"))
        })
    };

    function newPsword() {
        if(!psword.value) return alert("??????????????? ??????????????????");
        if(psword.value !== confirmPsword.value) return alert("??????????????? ???????????? ????????????");
        var pswordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if(!pswordRegExp.test(psword.value)) {
            psword.value = "";
            psword.focus();
            return alert("????????? ??????????????? ??????????????????");
        }

        const req = {
            id: id.value,
            email: email.value,
            psword: psword.value,
        };

        fetch("/updatepsword",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res)=> {
            if(res.success) {
                $(".newPw_page").animate({
                    opacity: '0',
                }).css('display','none')
                $(".id_page").css('display','flex').animate({
                    opacity: '1',
                })
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("???????????? ???????????? ??? ?????? ??????"))
        })
    }
})
