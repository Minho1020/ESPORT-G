"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);


dotenv.config();

const options = {
    host: "esport-g.cp3vlssnnnaj.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password:"Minho0517!",
    database: "esport_g",
};

const sessionStore = new MySQLStore(options);

const home = require("./src/routes/home");

app.set("views","./src/views");
app.set("view engine","ejs");
app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());

app.use(session({
    secret: "userInfo",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use("/",home); 
 

module.exports = app;