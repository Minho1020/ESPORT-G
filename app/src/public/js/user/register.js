
$(document).ready(function() {
    $("#id").on("propertychange change keyup paste input", function() {
        idRegExp = /^[a-zA-z0-9]{8,15}$/;
        id_val = $("#id").val();
        if(idRegExp.test(id_val)) {
            $("#er_id").css("display","block").css("color","#00bf00")
            $(".id .checkbox > i:nth-child(2)").css("display","block")
            $(".id .checkbox > i:nth-child(1)").css("display","none")
        } else {
            $("#er_id").css("display","block").css("color","#DB4455")
            $(".id .checkbox > i:nth-child(1)").css("display","block")
            $(".id .checkbox > i:nth-child(2)").css("display","none")
            return false
        }
    });
    $("#name").on("propertychange change keyup paste input", function() {
        nameRegExp = /^[가-힣]{3,6}$/;
        name_val = $("#name").val();
        if(nameRegExp.test(name_val)) {
            $("#er_name").css("display","block").css("color","#00bf00")
            $(".name .checkbox > i:nth-child(2)").css("display","block")
            $(".name .checkbox > i:nth-child(1)").css("display","none")
        } else {
            $("#er_name").css("display","block").css("color","#DB4455")
            $(".name .checkbox > i:nth-child(1)").css("display","block")
            $(".name .checkbox > i:nth-child(2)").css("display","none")
        }
    });
    $("#email").on("propertychange change keyup paste input", function() {
        emailRegExp = /^[A-Za-z0-9_.]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        email_val = $("#email").val();
        if(emailRegExp.test(email_val)) {
            $("#er_email").css("display","block").css("color","#00bf00")
            $(".email .checkbox > i:nth-child(2)").css("display","block")
            $(".email .checkbox > i:nth-child(1)").css("display","none")
            $("#mailer").css("display","block")
        } else {
            $("#er_email").css("display","block").css("color","#DB4455")
            $(".email .checkbox > i:nth-child(1)").css("display","block")
            $(".email .checkbox > i:nth-child(2)").css("display","none")
            $("#mailer").css("display","none")
            $("#mailer").text("인증번호 발송")
            $("#mailer_box").css("display","none")
        }
    });
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
    $("#mailer").click(function() {
        $("#mailer_box").css("display","flex")
        $("#mailer").text("인증번호 재발송")
        $("#email").prop('readonly',true)
    })

    
    const id = document.querySelector("#id"),
        name = document.querySelector("#name"),
        email = document.querySelector("#email"),
        psword = document.querySelector("#psword"),
        confirmPsword = document.querySelector("#confirm-psword"),
        registerBtn = document.querySelector("#btn"),
        checker_btn = document.querySelector("#checker"),
        ctfnumber = document.querySelector("#check_number"),
        mailer_btn = document.querySelector("#mailer");


    registerBtn.addEventListener("click", register);
    mailer_btn.addEventListener("click", mailing)
    checker_btn.addEventListener("click",ctf)

    function mailing() {
        req = {
            email: email.value,
        }
        fetch("/register/mailing/ctf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
    }

    function ctf() {
        req = {
            ctfnumber: ctfnumber.value,
            email: email.value,
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
                $("#er_email_ctf").css("display","block").css("color","#00bf00")
                $("#mailer_box .checkbox > i:nth-child(2)").css("display","block")
                $("#mailer_box .checkbox > i:nth-child(1)").css("display","none")
                $("#check_number").prop('readonly',true)
                $("#checker").text("인증완료").prop('disabled',true)
                $("#mailer").prop('disabled', true)
                alert("이메일 인증에 성공하셨습니다")
            } else {
                $("#er_email_ctf").css("display","block").css("color","#DB4455")
                $("#mailer_box .checkbox > i:nth-child(1)").css("display","block")
                $("#mailer_box .checkbox > i:nth-child(2)").css("display","none")
                alert(res.msg)
                return false
            }
        })
        
    }

    function register() {
        if(!id.value) return alert("아이디를 입력해주세요");
        if(psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다");
        if(!name.value) return alert("이름을 입력해주세요");
        if(!email.value) return alert("이메일을 입력해주세요");
        if(!psword.value) return alert("비밀번호를 입력해주세요");
        var idRegExp = /^[a-zA-z0-9]{8,12}$/;
        if (!idRegExp.test(id.value)) {
            id.value = "";
            id.focus();
            return alert("올바른 아이디를 입력해주세요");
        }
        var nameRegExp = /^[가-힣]{3,6}$/;
        if(!nameRegExp.test(name.value)) {
            name.value = "";
            name.focus();
            return alert("올바른 이름을 입력해주세요");
        }
        var emailRegExp = /^[A-Za-z0-9_.]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!emailRegExp.test(email.value)) {
            email.value = "";
            email.focus();
            return alert("올바른 이메일을 입력해주세요");
        }
        var pswordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if(!pswordRegExp.test(psword.value)) {
            psword.value = "";
            psword.focus();
            return alert("올바른 비밀번호를 입력해주세요");
        }
        if(!ctfnumber.value) return alert("이메일 인증을 해주세요")
        if($("#er_email_ctf").css("color")==="#DB4455" || $("#er_email_ctf").css("display")==="none") {
            return alert("인증버튼을 눌러주세요")
        }

        const req = {
            id: id.value,
            name: name.value,
            email: email.value,
            psword: psword.value,
        };

        fetch("/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res)=> {
            if(res.success) {
                id.value = null;
                name.value = null;
                email.value = null;
                ctfnumber.value = null;
                psword.value = null;
                confirmPsword.value = null;
                location.href="/login"
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("회원가입 중 에러 발생"))
        })
    };
})
