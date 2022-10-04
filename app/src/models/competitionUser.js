"use strict";

const UserStorage = require("./competitionstorage.js");

class User  {
    constructor(body) {
        this.body = body;
    }

    async getcompetition() {
        const client = this.body;
        try {
            const competition = await UserStorage.getCompetition(client);
            if(client.order==="top") {
                competition.sort(function(a, b) {
                    if(a.reward > b.reward) return -1;
                    if(a.reward === b.reward) return 0;
                    if(a.reward < b.reward) return 1;
                })
            } else if(client.order==="bottom") {
                competition.sort(function(a, b) {
                    if(a.reward > b.reward) return 1;
                    if(a.reward === b.reward) return 0;
                    if(a.reward < b.reward) return -1;
                })
            } else if(client.order==="high") {
                competition.sort(function(a, b) {
                    if(a.join_pay > b.join_pay) return -1;
                    if(a.join_pay === b.join_pay) return 0;
                    if(a.join_pay < b.join_pay) return 1;
                })
            } else if(client.order==="low") {
                competition.sort(function(a, b) {
                    if(a.join_pay > b.join_pay) return 1;
                    if(a.join_pay === b.join_pay) return 0;
                    if(a.join_pay < b.join_pay) return -1;
                })
            }else if(client.total_member==="many") {
                competition.sort(function(a, b) {
                    if(a.total_member > b.total_member) return -1;
                    if(a.total_member === b.total_member) return 0;
                    if(a.total_member < b.total_member) return 1;
                })
            } else if(client.order==="little") {
                competition.sort(function(a, b) {
                    if(a.total_member > b.total_member) return 1;
                    if(a.total_member === b.total_member) return 0;
                    if(a.total_member < b.total_member) return -1;
                })
            } else if(client.order==="random") {
                return competition
            } else {
                competition.sort(function(a, b) {
                    if(a.uni_number > b.uni_number) return -1;
                    if(a.uni_number === b.uni_number) return 0;
                    if(a.uni_number < b.uni_number) return 1;
                })
            }
            return competition
        } catch (err) {
            return console.log("에러 발생")
        }
    }
}


module.exports = User;