const {sendOtpEmail} = require('./email')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


const login = async (data) => {

        console.log('login detected');
        const otp = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        console.log(otp);
         sendOtpEmail({email:data.email, otp})
    
        let user = await User.findOne({where:{email:data.email}})
        if(user){
          user.otp=otp
          await user.save()
        }else{
          user = await User.create({email:data.email, otp})
        }

}

const otpVerification = async (data) =>{
    const otp = data.otp
    const email = data.email
    const user = await User.findOne({where:{email, otp}})
    console.log('otpVerification');
    if(!user) return {verified:false}
    else{
        const token = jwt.sign(
            { userID: user.dataValues.id },
             process.env.JWT_SECRET
             );
             return {token}
      //TODO:
  }


}

const validateToken =  (token) => {
  try {

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findOne({ where: { id: decode.userID } });
    console.log('not error in token validation');
    return decode;
  } catch (error) {
    console.log(error,'hi');
    return false;
  }


};
module.exports={
    login,
    otpVerification,
    validateToken
}



