

const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    login_btn = document.querySelector("#btn")

login_btn.addEventListener("click", adminlogin)

function adminlogin() {
    if (!id.value) return alert("아이디를 입력해주세요")

    if (!psword.value) return alert("비밀번호를 입력해주세요")

    
    const req = {
        id: id.value,
        psword: psword.value,
    };
    
    fetch("/admin/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res, req)=> {
        if(res.success) {
            id.value = null;
            psword.value = null;
            location.href="/admin";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"))
    })
};