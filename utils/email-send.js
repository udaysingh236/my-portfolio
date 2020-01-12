const nodemailer = require('nodemailer');
const ejs = require("ejs");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_URL,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

exports.sendEmails = (payload,req, res, next) => {
    ejs.renderFile(__dirname + "/email-body.ejs", {payload: payload}, (err, data) => {
        if (err) {
            console.log(err);
            let frontErr = new Error('Internal Error Occured, sorry for this..!!');
            next(frontErr);
        } else {
            let mainOptions = {
                from: 'info-noreply@udaysingh.xyz',
                to: "udaysingh236@gmail.com",
                subject: `New form submission at ${(new Date()).toDateString()}`,
                html: data
            };
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    let frontErr = new Error('Internal Error Occured, sorry for this..!!');
                    next(frontErr);
                } else {
                    console.log('Message sent: ' + info.response);
                    res.render('success', {status:200, message: "Thank you for your time, message sent succesfully, I will contact you soon." + " \n Redirecting to home page..!!"});
                }
            });
        }
    
    });
};