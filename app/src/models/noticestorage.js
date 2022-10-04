"use strict";

const db = require("../config/db");

class noticeStorage {
    static async saveNotice(content) {
        const query = "INSERT INTO notice(notice_type, title, content, preview) VALUES(?,?,?,?);";
        return new Promise((resolve, reject) => {
            db.query(query, [content.notice_type, content.title, content.content, content.preview], (err) => {
                if(err) reject(err)
                else resolve({success:true})
            })
        })
    }

    static async getNotice(type) {
        const query = "SELECT * FROM notice WHERE notice_type LIKE ? ORDER BY uni_number desc;";
        return new Promise((resolve, reject) => {
            db.query(query, ["%"+type+"%"], (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    static async deleteNotice(id) {
        const query = "DELETE FROM notice WHERE uni_number = ?;";
        return new Promise((resolve, reject) => {
            db.query(query,[id.uni_number], (err) => {
                if(err) reject(err)
                else resolve({success:true})
            })
        })
    }

    static async getNoticeForEdit(id) {
        const query = "SELECT * FROM notice WHERE uni_number = ?;";
        return new Promise((resolve, reject) => {
            db.query(query, [id.uni_number], (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        })
    }

    static async updateNotice(id) {
        const query = "UPDATE notice SET notice_type = ?, title = ?, content = ?, preview = ? WHERE uni_number = ?;";
        return new Promise((resolve, reject) => {
            db.query(query, [id.notice_type, id.title, id.content, id.preview ,id.uni_number], (err) => {
                if(err) reject(err)
                else resolve({success:true})
            })
        })
    }
}

module.exports = noticeStorage;