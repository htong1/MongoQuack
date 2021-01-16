//define a function for sending emails and exported for use in verifyemail
const nodemailer = require("nodemailer");
const sendEmail = function (email) {
    console.log("recipient" + email);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "TimeToQuack@gmail.com",
            pass: process.env.pass,
        },
    });

    const mailOptions = {
        from: "TimeToQuack@gmail.com",
        to: email,
        subject: "Time to get quacking!",
        html: `<h1>Welcome to Quack!:D™</h1> <br>
    <br>
    <p>Please click the link below to verify your account and begin quacking! <br>
    <br> <a href=https://MongoQuack.htong1.repl.co/signup.html?e=${email}> Click to verify</a>`,
    };
    console.log("yayyy" + email);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
module.exports = sendEmail;