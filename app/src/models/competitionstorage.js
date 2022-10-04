"use strict";

const db = require("../config/db");

class UserStorage {
    static async getCompetition(option) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM competitionList WHERE game_type LIKE ? AND eglevel LIKE ? ORDER BY rand() limit 14;",["%"+option.game_type+"%","%"+option.eglevel+"%" ], (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        });
    }
}

module.exports = UserStorage;