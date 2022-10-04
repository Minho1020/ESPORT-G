const User = require("../../models/User");
const noticeUser = require("../../models/noticeUser");
const nodemailer = require("nodemailer");
const UserStorage = require("../../models/Userstorage");
const ctrl = require("./homectrl");

async function getMypage(req) {
    const user = await UserStorage.getUserInfo(req.session.userid);
    const my_page = `<div class="my_profile_id"><a href="/mypage" id="my_id">${user.id}</a><span id="my_email">${user.email}</span><div class="my_profile_link"><a href="/mypage">내 계정 보기</a><a href="/logout">로그아웃</a></div></div>`;
    const my_page_side = `                    
    <div class="my_info_sidemenu">
        <div class="my_profile_id_sidemenu">
            <a id="my_id_sidemenu">${user.id}</a>
            <span id="my_email_sidemenu">${user.email}</span>
            <div class="my_profile_link_sidemenu">
                <a href="">내 계정 보기</a>
                <a href="/logout">로그아웃</a>
            </div>
        </div>
    </div>
    <div class="my_esportgpay_sidemenu">
        <div class="gpay_title_sidemenu">
            <span>GPAY</span>
            <a href="">충전하러 가기 ></a>
        </div>
        <div class="gmoney_title_sidemenu">
            <span>잔액 :</span>
            <span id="my_gmoney_sidemenu"></span>
        </div>
    </div>`;
    return {my_page: my_page, my_page_side:my_page_side}
}

const output = {
    main: async (req, res) => {
        const notice_type = [
            notice = {
                notice_type:"notice",
            },
            event = {
                notice_type:"event",
            },
            update = {
                notice_type:"update",
            }
        ];

        for(const i of notice_type) {
            const option = new noticeUser(i);
            const data = await option.getNotice();
            const date1 = JSON.stringify(data[0].in_date)
            const date2 = JSON.stringify(data[1].in_date)
            const date3 = JSON.stringify(data[2].in_date)
            if(data[0].preview.length > 155) {
                i['preview'] = data[0].preview.slice(0, 150) + "...";
            } else {
                i['preview'] = data[0].preview;
            }

            i['title_1'] = data[0].title;
            i['in_date_1'] = date1.slice(1,11);
            i['num_1'] = data[0].uni_number;

            i['title_2'] = data[1].title;
            i['in_date_2'] = date2.slice(1,11);
            i['num_2'] = data[1].uni_number;

            i['title_3'] = data[2].title;
            i['in_date_3'] = date3.slice(1,11);
            i['num_3'] = data[2].uni_number;

        }
        if(req.session.is_logined) {
            const user = await UserStorage.getUserInfo(req.session.userid);

            const getres = await getMypage(req)

            res.render("home/index", {
                userid:  user.id,
                useremail: user.email,
                my: getres.my_page,
                myside: getres.my_page_side,
                notice_data: notice_type,
            });
        } else {
            const login_btn = `<div class="login_btn"><a href="/login">로그인</a></div>`;
            const login_side = `<div class="my_info_sidemenu"><a href="/login">로그인</a></div>`;

            res.render("home/index", {
                my: login_btn,
                myside: login_side,
                notice_data: notice_type,
            });
        }   
    },
    login: (req, res) => {
        res.render("user/login");
    },
    register: (req, res) => {
        res.render("user/register");
    },
    logout: (req, res) => {
        req.session.destroy(function (err) {
            if(err) throw err
            res.redirect("/")
        })
    },
    myPage: async (req, res) => {
        if(req.session.is_logined) {
            const user = await UserStorage.getUserInfo(req.session.userid);
            const secret_name = user.name[0]+"**"
            const secret_psword = user.psword.replace(user.psword, '*'.repeat(user.psword.length))
            res.render("home/my_page", {
                userid:  user.id,
                useremail: user.email,
                username: secret_name,
                userpsword:secret_psword,
            });
        } else {
            res.redirect('/login')
        }  
    },
    lookforid: (req, res) => {
        res.render("user/lookForid.ejs");
    },
    lookforpw: (req, res) => {
        res.render("user/lookForpw.ejs");
    },
    competition: async (req, res) => {
        if(req.session.is_logined) {
            const user = await UserStorage.getUserInfo(req.session.userid);
            const getres = await getMypage(req);

            res.render("home/competition", {
                userid:  user.id,
                useremail: user.email,
                my: getres.my_page,
                myside: getres.my_page_side,
            });
        } else {
            const login_btn = `<div class="login_btn"><a href="/login">로그인</a></div>`;
            const login_side = `<div class="my_info_sidemenu"><a href="/login">로그인</a></div>`;

            res.render("home/competition", {
                my: login_btn,
                myside: login_side,
            });
        }   
    },
    notice: async(req, res) => {
        if(req.session.is_logined) {
            const user = await UserStorage.getUserInfo(req.session.userid);
            const getres = await getMypage(req)

            res.render("home/notice", {
                userid:  user.id,
                useremail: user.email,
                my: getres.my_page,
                myside: getres.my_page_side,
            });
        } else {
            const login_btn = `<div class="login_btn"><a href="/login">로그인</a></div>`;
            const login_side = `<div class="my_info_sidemenu"><a href="/login">로그인</a></div>`;

            res.render("home/notice", {
                my: login_btn,
                myside: login_side,
            });
        }   
    }
};

module.exports = {
    output,
}
