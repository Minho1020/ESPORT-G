"use strict";

const User = require("../../models/User");
const competitionUser = require("../../models/competitionUser");
const nodemailer = require("nodemailer");
const UserStorage = require("../../models/Userstorage");
const competitionStorage = require("../../models/competitionstorage");
const noticeUser = require("../../models/noticeUser");


const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.success) {
            req.session.is_logined = true
            req.session.userid = req.body.id 
        }
        return res.json(response)
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    registerMailingCtf: async (req, res) => {
        const user_email = req.body.email;
        const randomnumber = Math.floor(Math.random()*1000000)+100000;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user:  "esport.g.business@gmail.com",
                pass: "Minho0517!",
            },
        });
        const info = await transporter.sendMail({
            from: "ESPORT G <esport.g.business@gmail.com>",
            to: user_email,
            subject: "[ESPORT G] 인증코드",
            text: `ESPORT G - ${randomnumber} (이)가 인증코드입니다`,
        });
        const response = await UserStorage.saveCtfNumber( user_email ,randomnumber);
        return res.json(response)
    },

    registerCtf: async (req, res) => {
        const user_ctf = new User(req.body);
        const response = await user_ctf.registerCtf();
        return res.json(response);
    },
    lookforid: async (req, res) => {
        try {
            const data = await UserStorage.lookforUserInfo(req.body.email);
            return res.json({success:true, lookforid: data.id})
        } catch(err) {
            return res.json({success: false, msg:"해당 이메일이 등록된 계정이 존재하지 않습니다"})
        }

    },
    updatepsword: async (req, res) => {
        try {
            const response = await UserStorage.updatePsword(req.body.psword, req.body.id ,req.body.email);
            return res.json({success:true})
        } catch(err) {
            return res.json({success: false, msg:"알 수 없는 오류가 발생했습니다. 다시 시도해주시기 바랍니다"})
        }
    },
    getcompetition: async (req, res) => {
        const option = new competitionUser(req.body);
        const competition = await option.getcompetition();
        return res.json(competition)
    },
    getNotice: async (req, res) => {
        const option = new noticeUser(req.body);
        const data = await option.getNotice();
        return res.json(data)
    }
};

module.exports = {
    process,
};