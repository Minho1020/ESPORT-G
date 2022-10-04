
$(document).ready(function() {
    const email = document.querySelector("#email"),
        nextBtn = document.querySelector("#next_btn"),
        ctfnumber = document.querySelector("#ctf_number"),
        mailer_btn = document.querySelector("#mailer"),
        checker_btn = document.querySelector("#checker");


    nextBtn.addEventListener("click", register);
    mailer_btn.addEventListener("click", mailing);
    checker_btn.addEventListener("click",ctf);

    function mailing() {
        emailRegExp = /^[A-Za-z0-9_.]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        email_val = $("#email").val();
        if(!emailRegExp.test(email_val)) {
            return alert("올바른 이메일을 입력해주세요")
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
                $("#mailer").text("인증번호 재발송")
                $("#email").prop('readonly',true)
            } else {
                return alert("다시 시도해주세요")
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
                $("#checker").text("인증완료").prop('disabled',true)
                $("#mailer").prop('disabled', true)
                alert("이메일 인증에 성공하셨습니다")
            } else {
                alert(res.msg)
            }
        })
        
    }

    function register() {

        if(!ctfnumber.value) return alert("이메일 인증을 해주세요")
        if($("#mailer").prop('disabled')===false) {
            return alert("인증버튼을 눌러주세요")
        }

        const req = {
            email: email.value,
        };

        fetch("/lookforid",{
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
                $(".id_page").css('display','flex').animate({
                    opacity: '1',
                })
                $('.login-form>span>p').text(res.lookforid)
                email.value = null;
                ctfnumber.value = null;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("회원가입 중 에러 발생"))
        })
    };
})
