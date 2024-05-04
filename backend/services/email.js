const { Resend } = require('resend')
require('dotenv').config()

const resendApiKey = process.env.RESEND_API_KEY

const resend = new Resend(resendApiKey);


const sendOtpEmail = ({email, otp}) => {

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'BanterBox OTP',
        html: `<h1>Your OTP is: <strong>${otp}</strong> </h1>`
      });

}

module.exports=sendOtpEmail

