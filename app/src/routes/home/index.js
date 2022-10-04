"use strict"

const express = require("express");
const session = require("express-session");
const router =  express.Router();

const ctrl = require("./homectrl");
const get = require('./homeget');
const adminget = require('./adminget');
const adminctrl = require('./adminctrl');

router.get("/", get.output.main);
router.get("/login", get.output.login);
router.get("/register", get.output.register);
router.get('/logout', get.output.logout);
router.get('/mypage', get.output.myPage);
router.get('/lookforid', get.output.lookforid);
router.get('/lookforpw', get.output.lookforpw);

router.get('/competition', get.output.competition);
router.get('/competition/kakaoBattleground', get.output.competition);
router.get('/competition/steamBattleground', get.output.competition);
router.get('/competition/valorant', get.output.competition);
router.get('/competition/overwatch', get.output.competition);
router.get('/competition/ing', get.output.competition);
router.get('/competition/will', get.output.competition);
router.get('/competition/end', get.output.competition);

router.get('/notice', get.output.notice);
router.get('/notice/notice', get.output.notice);
router.get('/notice/event', get.output.notice);
router.get('/notice/update', get.output.notice);





router.post("/login",ctrl.process.login);
router.post("/register",ctrl.process.register);
router.post("/register/mailing/ctf",ctrl.process.registerMailingCtf);
router.post("/register/ctf",ctrl.process.registerCtf);
router.post("/lookforid",ctrl.process.lookforid);
router.post("/updatepsword",ctrl.process.updatepsword);
router.post("/competition/getcompetition", ctrl.process.getcompetition)

router.post("/notice/getNotice", ctrl.process.getNotice)






router.get("/admin", adminget.output.main);
router.get("/admin/login", adminget.output.login);
router.get("/admin/adver", adminget.output.adver);
router.get('/admin/notice', adminget.output.notice);
router.get('/admin/user', adminget.output.user);
router.get('/admin/news', adminget.output.news);
router.get('/admin/competition', adminget.output.competition);
router.get('/admin/faq', adminget.output.faq);
router.get('/admin/competition/all', adminget.output.competition);
router.get('/admin/competition/ing', adminget.output.competition);
router.get('/admin/competition/will', adminget.output.competition);
router.get('/admin/competition/end', adminget.output.competition);

router.get('/admin/notice/posting', adminget.output.notice);



router.post("/admin/login", adminctrl.process.login)
router.post("/admin/competition/post", adminctrl.process.post)
router.post("/admin/competition/getcompetition", adminctrl.process.getCompetition)
router.post("/admin/competition/delete", adminctrl.process.deleteCompetition)

router.post("/admin/notice/post", adminctrl.process.noticePost)
router.post("/admin/notice/delete", adminctrl.process.noticeDelete)
router.post("/admin/notice/edit", adminctrl.process.noticeEdit)
router.post("/admin/notice/update", adminctrl.process.noticeUpdate)






module.exports = router;
