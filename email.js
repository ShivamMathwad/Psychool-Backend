const psycool_mail = "cass.psycool@gmail.com";
const nodemailer = require("nodemailer"); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: psycool_mail, 
        pass: process.env.PsycoolPassword
    }
}); 
  
let mailDetails = { 
    from: psycool_mail, 
    to: "psycool2020@gmail.com", 
    subject: "null", 
    html: "null"
}; 
  

function signup_mail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Welcome to the Psycool community!";
    mailDetails.html = `Hi ${username},<br/>I am CASS your Career Aiding Support System. Thank you for signing up and welcome to the Psycool family. I hope that you find your calling soon and the team would love to help you out in this journey. <br/><br/>Regards,<br/>CASS`;

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function password_change_success_mail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Password Changed Successfully";
    mailDetails.html = `Hi ${username},<br/>Your password was changed successfully from the Psycool app.<br/><br/>Regards,<br/>CASS`;

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function forgot_password_mail(toMail, username, new_password){
    var html_msg = `Hi ${username},<br/>Your account password is changed to an admin-generated password.<br/>New Password: <b>${new_password}</b><br/>You can change your password to your liking in the app(Account->Change Password).<br/><br/>Regards,<br/>CASS`;

    mailDetails.to = toMail;
    mailDetails.subject = "Forgot Password";
    mailDetails.html = html_msg;

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function job_recommend_mail(toMail, username){
    var html_msg = `Hi ${username},<br/>Given the scores from all your tests, following career fields are recommended for you:<br/>1.Education<br/>2.Medical<br/>3.Engineering<br/><br/>Regards,<br/>CASS`;

    mailDetails.to = toMail;
    mailDetails.subject = "Career Recommendation";
    mailDetails.html = html_msg;

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}


module.exports.signup_mail = signup_mail; 
module.exports.password_change_success_mail = password_change_success_mail;
module.exports.forgot_password_mail = forgot_password_mail;
module.exports.job_recommend_mail = job_recommend_mail;
