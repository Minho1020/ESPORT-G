'use strict';

const adminUser = require("../../models/adminuser");
const nodemailer = require("nodemailer");
const adminUserStorage = require("../../models/adminstorage");
const noticeUser = require("../../models/noticeUser");
const noticeStorage = require("../../models/noticestorage");

const process = {
    login: async (req, res) => {
        const user = new adminUser(req.body);
        const response = await user.login();
        if(response.success) {
            req.session.admin_is_logined = true;
            req.session.admin_userid = req.body.id;
        }
        return res.json(response)
    },
    post: async (req, res) => {
        const user = new adminUser(req.body);
        const response = await user.post();
        return res.json(response);
    },  
    getCompetition: async (req, res) => {
        const option = new adminUser(req.body);
        const competition = await option.getcompetition();
        return res.json(competition);
    },
    deleteCompetition: async (req, res) => {
        const response = await adminUserStorage.deleteCompetition(req.body);
        console.log(response)
        return res.json(response);
    },
    noticePost: async(req, res) => {
        const content = new noticeUser(req.body);
        const response = await content.noticePost();
        return res.json(response);
    },
    noticeDelete: async (req, res)=> {
        const response = await noticeStorage.deleteNotice(req.body);
        return res.json(response)
    },
    noticeEdit: async (req, res) => {
        const editData = await noticeStorage.getNoticeForEdit(req.body);
        return res.json(editData)
    },
    noticeUpdate: async (req, res) => {
        const response = await noticeStorage.updateNotice(req.body);
        return res.json(response);
    }
}


module.exports = {
    process,
}