"use strict";

const { query } = require("../config/db");
const db = require("../config/db");

class adminUserStorage {
    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM adminuser WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if(err) reject(err);
                else resolve(data[0])
            });
        });
    }

    static async saveCompetition(list_info) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO competitionList(game_type, reward, join_pay ,total_member, eglevel ,start_date, end_date, more_dec) VALUES(?,?,?,?,?,?,?,?);";
            db.query(query, [list_info.game_type, list_info.reward, list_info.join_pay, list_info.total_member, list_info.eglevel ,list_info.start_date, list_info.end_date, list_info.more_dec], (err) => {
                if(err) reject(err);
                else resolve({ success : true})
            });
        });
    }

    static async getCompetition(option) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM competitionList WHERE game_type LIKE ? AND eglevel LIKE ? ORDER BY uni_number desc",["%"+option.game_type+"%","%"+option.eglevel+"%" ], (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        });
    }

    static async deleteCompetition(uni_number) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM competitionList WHERE uni_number = ?;";
            db.query(query,[uni_number.uni_number], (err) => {
                if(err) reject(err)
                else resolve({success:true})
            })
        })
    }
}

module.exports = adminUserStorage;