const psycool_mail = "cass.psycool@gmail.com";
const psycool_password = "Psychool@2020";

const nodemailer = require("nodemailer"); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: psycool_mail, 
        pass: psycool_password
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
    mailDetails.subject = "Psycool Sign Up Mail";
    mailDetails.html = "Hi {{username}},<br/>I am CASS your Career Aiding Support System. Thank you for signing up and welcome to the Psycool family. I hope that you find your calling soon and the team would love to help you out in this journey. <br/><br/>Best,<br/>CASS";

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function password_change_success_mail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Password Changed Successfully";
    mailDetails.html = "Hi {{username}},<br/>Your password was changed successfully from the Psycool app.<br/><br/>Best,<br/>CASS";

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function forgot_password_mail(toMail, username, new_password){
    mailDetails.to = toMail;
    mailDetails.subject = "Forgot Password";
    mailDetails.html = "Hi {{username}},<br/>Your account password is changed to an admin-generated password.<br/>New Password: <b>{{new_password}}</b><br/>You can change your password to your liking in the app(Account->Change Password).<br/><br/>Best,<br/>CASS";

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function job_recommend_mail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Career Recommendation";
    mailDetails.html = "Hi {{username}},<br/>Given the scores from all your tests, following career fields are recommended for you:<br/>1.Education<br/>2.Medical<br/>3.Engineering<br/><br/>Best,<br/>CASS";

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function create_password(){
    var number = Math.floor(Math.random() * (9999 - 1000) + 1000);    

    var finalString = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i=0; i<2; i++) {
        finalString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return number.toString() + finalString;
}


module.exports.signup_mail = signup_mail; 
module.exports.password_change_success_mail = password_change_success_mail;
module.exports.forgot_password_mail = forgot_password_mail;
module.exports.job_recommend_mail = job_recommend_mail;
module.exports.create_password = create_password;
