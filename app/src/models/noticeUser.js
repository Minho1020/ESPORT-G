"use strict";

const noticeStorage = require("./noticestorage");

class noticeUser  {
    constructor(body) {
        this.body = body;
    }

    async noticePost() {
        const client = this.body;
        const response = await noticeStorage.saveNotice(client)
        return response;
    }

    async getNotice() {
        const client = this.body;
        try {
            const notice_type = client.notice_type;
            const notice = await noticeStorage.getNotice(notice_type)
            
            return notice
        } catch (err) {
            return console.log("에러 발생")
        }
    }

}


module.exports = noticeUser;