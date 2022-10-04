"use strict";

const UserStorage = require("./Userstorage");

class User  {
    constructor(body) {
        this.body = body;
    }
    
    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
            if(user) {
                if(user.user_id === client.id && user.user_psword === client.psword) {
                    return { success:true };
                }
                return {success:false, msg: "비밀번호가 틀렸습니다"};
            }
            return {success:false, msg: "존재하지 않는 아이디입니다"}
        } catch {
            return { success : false, err};
        }
    }

    async register() {
        const client = this.body
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success:false, msg:"이미 존재하는 아이디입니다"}
        }
    }
    async registerCtf() {
        const client = this.body;
        try {
            const user_ctf = await UserStorage.getCtfnumber(client.email)
            if(client.ctfnumber === user_ctf.randomnumber) {
                return { success : true}
            }
            return {success: false, msg:"인증번호가 일치하지 않습니다"}
        } catch  (err) {
            return {success: false, err}
        }
    }

}


module.exports = User;