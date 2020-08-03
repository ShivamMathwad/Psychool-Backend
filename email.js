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
  

function improvementMail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Aptitude Improvement Suggestions";
    mailDetails.html = `Hi ${username},<br/>I am CASS your Career Aiding Support System. Thank you for signing up and welcome to the Psycool family. I hope that you find your calling soon and the team would love to help you out in this journey. <br/><br/>Regards,<br/>CASS`;

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } 
    });
}

function signup_mail(toMail, username){
    mailDetails.to = toMail;
    mailDetails.subject = "Welcome to the Psycool community!";
    mailDetails.html = `Hi ${username},
    <br/>I'm CASS.<br/>In case you wish to improve your Aptitude Scores, click on the links for guidance!<br/>
<br/>Numerical Aptitude -
<br/>Link 1: <a href="https://www.practiceaptitudetests.com/resources/top-15-tips-to-pass-your-aptitude-test/">Click here</a>
<br/>Link 2: <a href="https://psychometric-success.com/numerical-reasoning">Click here</a>
<br/>Book: <a href="https://www.jagranjosh.com/affiliates/best-books-for-mathematics-numerical-ability-quantitative-aptitude-section-of-competitive-govt-exams-1567605593-1">Click here</a>
<br/>
<br/>Perceptual Aptitude -
<br/>Link 1: <a href="https://www.yourarticlelibrary.com/organization/perception/strategies-for-improving-perceptual-skills-7-strategies/63797">Click here</a>
<br/>Link 2: <a href="https://crushthedatexam.com/perceptual-ability-test/
<br/>Book: <a href="https://www.google.com/url?q=https://bookauthority.org/books/best-memory-improvement-books&sa=D&source=hangouts&ust=1596532928552000&usg=AFQjCNHs5S5lQ6vFgfwLBMVDyM1yhmX8Ug">Click here</a>
<br/>
<br/>Spatial Aptitude -
<br/>Link 1: <a href="https://www.practiceaptitudetests.com/spatial-reasoning-tests/">Click here</a>
<br/>Link 2:<a href="https://www.archdaily.com/806402/9-everyday-activities-to-increase-your-spatial-intelligence">Click here</a>
<br/>Book: <a href="https://www.goodreads.com/shelf/show/spatial-reasoning">Click here</a>
<br/>
<br/>Verbal Reasoning -
<br/>Link 1: <a href="https://study.com/academy/topic/developing-verbal-reasoning-skills.html">Click here</a>
<br/>Link 2: <a href="https://www.psychometricinstitute.com.au/Psychometric-Test-Guide/Verbal-Reasoning-Test-Guide/Improve_your_Score_in_the_Verbal_Test.html">Click here</a>
<br/>Book: <a href="https://www.jagranjosh.com/affiliates/best-reasoning-books-for-all-competitive-examinations-1567602499-1">Click here</a>
<br/>
<br/>Abstract Reasoning -
<br/>Link 1: <a href="https://www.assessmentcentrehq.com/abstract-reasoning-test/">Click here</a>
<br/>Link 2:<a href="https://www.psychometricinstitute.com.au/Psychometric-Test-Guide/Abstract-Reasoning-Test-Guide/Improve_your_abstract_reasoning_test_score.html#:~:text=Although%20you%20cannot%20significantly%20improve,to%20quickly%20improve%20your%20performance">Click here</a>
<br/>Book: <a href="https://www.jagranjosh.com/affiliates/best-reasoning-books-for-all-competitive-examinations-1567602499-1">Click here</a>
<br/>
<br/>For further details on different aptitudes, refer the following book-
<a href="https://static1.squarespace.com/static/57fbabb61b631be17ec6bfc2/t/57fc544de4fcb5f48d6dbea0/1476154479010/The+Aptitude+Handbook+May+1+2014.pdf">Click here</a>
<br/>
<br/>Regards,
<br/>CASS.`;

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
module.exports.improvementMail = improvementMail;
module.exports.job_recommend_mail = job_recommend_mail;
