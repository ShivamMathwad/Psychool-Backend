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
    to: 'shivam25.mathwad@gmail.com', 
    subject: 'Psycool Sign Up Mail', 
    html: "Hi,<br/>&nbsp;&nbsp;I am CASS your Career Aiding Support System. Thank you for signing up and welcome to the Psycool family. I hope that you find your calling soon and the team would love to help you out in this journey. <br/>Cheers!"
}; 
  

function signup_mail(){
    mailDetails.subject = "Sign Up Mail";

    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } else { 
            console.log('Email sent successfully'); 
        } 
    });
}

module.exports.signup_mail = signup_mail; 
