const nodemailer=require("nodemailer")
const sendEmail=async(email,message)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD
        }
       });
       
       var mailOptions = {
        from:process.env.EMAIL_ID,
        to: email,
        subject: `verify your email for proshop `,
         html:`${message}`
       };
       
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } 
       });
}
module.exports= sendEmail;