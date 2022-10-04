"use strict";

const adminUserStorage = require("./adminstorage");
const UserStorage = require("./Userstorage");

class adminUser  {
    constructor(body) {
        this.body = body;
    }
    
    async login() {
        const client = this.body;
        try {
            const user = await adminUserStorage.getUserInfo(client.id);
            if(user) {
                if(user.id === client.id && user.psword === client.psword) {
                    return { success:true };
                }
                return {success:false, msg: "비밀번호가 틀렸습니다"};
            }
            return {success:false, msg: "존재하지 않는 아이디입니다"}
        } catch {
            return { success : false, err};
        }
    }

    async post() {
        const client = this.body;
        client['start_date'] = client.start_date.slice(0, 10) + " " + client.start_date.slice(11, 16)+":00";
        client['end_date'] = client.end_date.slice(0, 10) + " " + client.end_date.slice(11, 16)+":00";
        client['more_dec'] = client.more_dec.replace(/\n/g,'<br/>')
        try {
            const response = await adminUserStorage.saveCompetition(client);
            return response;
        } catch (err) {
            return { success:false, msg:"알 수 없는 에러가 발생하였습니다. 다시 시도해주시기 바랍니다"}
        }
    }

    async getcompetition() {
        const client = this.body;
        try {
            const competition = await adminUserStorage.getCompetition(client);
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
            } else {
                return competition
            }
            return competition
        } catch (err) {
            return console.log("에러 발생")
        }
    }
}


module.exports = adminUser;