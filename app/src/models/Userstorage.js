"use strict";

const db = require("../config/db");

class UserStorage {
    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if(err) reject(err);
                else resolve(data[0])
            });
        });
    }
    static async lookforUserInfo(email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?;";
            db.query(query, [email], (err, data) => {
                if(err) reject(err)
                else resolve(data[0])
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, email, psword) VALUES(?,?,?,?);";
            db.query(query, [userInfo.id,userInfo.name,userInfo.email,userInfo.psword], (err) => {
                if(err) reject(err);
                else resolve({ success : true})
            });
        });
    }

    static async saveCtfNumber(email, randomnumber) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM ctfnumber WHERE email = ?;"+
            "INSERT INTO ctfnumber(email, randomnumber) VALUES(?,?);";
            db.query(query, [email, email, randomnumber], (err) => {
                if(err) reject(err);
                else resolve({ success : true})
            });
        });
    }


    static async getCtfnumber(email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM ctfnumber WHERE email = ?;";
            db.query(query,[email],(err, data) => {
                if(err) reject(err)
                else resolve(data[0])
            })
        })
    }


    static async updatePsword(psword, id , email) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE users SET psword = ? WHERE id = ? AND email = ?;";
            db.query(query,[psword, id ,email], (err) => {
                if(err) reject(err)
                else resolve({success:true})
            })
        })
    }
}

module.exports = UserStorage;