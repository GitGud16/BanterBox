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

const sendInvitationEmail = ({email,url}) => {

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject:"BanterBox Chat Invitation",
    html: `<h1>You have been invited to join BanterBox. Click on the link below to join. </h1><h1>${url}</h1>`
  })
}

module.exports={sendOtpEmail,sendInvitationEmail}

