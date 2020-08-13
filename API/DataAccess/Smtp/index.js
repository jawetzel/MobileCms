const nodemailer = require("nodemailer");
const validator = require('validator');

var queue = [];

const SendEmail = ({to, cc = [], bcc = [], subject, html, attachments = [], text = "", from = process.env.EMAILDEFAULTUSER}) => {
    return new Promise((resolve, reject) => {

        if(typeof from !== "string"){
            //todo reject non string from
        } else{
            //todo validate from is valid email address
        }

        if(to.__proto__.hasOwnProperty("push")){
            //todo validate each to in array
        } else if(typeof to === "string"){
            //todo validate to
        } else{
            //todo resolve no success for reasons
        }

        if(!cc.__proto__.hasOwnProperty("push")){
            //todo reject request because cc should be array
        } else{
            //todo validate each in array
        }

        if(!bcc.__proto__.hasOwnProperty("push")){
            //todo reject request because bcc should be array
        } else{
            //todo validate each in array
        }

        if(!attachments.__proto__.hasOwnProperty("push")){
            //todo reject request because attachments should be array
        } else{
            //todo validate each in array
        }


        queue.push({
            entry: {
                from: from,
                to: to,
                subject: subject,
                text: text,
                html: html,
                cc: cc,
                bcc: bcc,
                attachments: attachments, // see https://nodemailer.com/message/attachments/
            },
            callback:  (response)  => {
                console.log(response);
                if(response.rejected && response.rejected.length > 0){
                    resolve({success: false, errors: ["Email Failed To Send"], data: { accepted: response.accepted}})
                } else {
                     resolve({success: true});
                }
            }
        });
    });
}

setInterval(async () => {
    if(queue.length > 0){
        var message = queue.pop();
        let transporter = nodemailer.createTransport({
            host: process.env.EMAILDOMAIN,
            port: process.env.EMAILPORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAILUSERNAME, // generated ethereal user
                pass: process.env.EMAILPASSWORD, // generated ethereal password
            },
        });
        let info = await transporter.sendMail(message.entry);
        message.callback(info);
    }
}, 1000 / process.env.EMAILSPERSECCOND)

SendEmail();