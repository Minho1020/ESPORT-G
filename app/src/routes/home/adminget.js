'use strict';


const output = {
    main: (req, res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/main')
        } else {
            res.redirect("/admin/login")
        }  
    },
    login: (req,res) => {
        res.render('admin/login')
    },
    adver: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/adver')
        } else {
            res.redirect("/admin/login")
        }  
    },
    notice: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/notice')
        } else {
            res.redirect("/admin/login")
        }  
    },
    user: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/user')
        } else {
            res.redirect("/admin/login")
        }  
    },
    news: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/news')
        } else {
            res.redirect("/admin/login")
        }  
    },
    competition: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/competitionList')
        } else {
            res.redirect("/admin/login")
        }  
    },
    faq: (req,res) => {
        if(req.session.admin_is_logined) {
            res.render('admin/faq')
        } else {
            res.redirect("/admin/login")
        }  
    }
}

module.exports = {
    output,
}