const {login, otpVerification} = require('../services/user')

const handleLogin = (socket) => {


    socket.on('login', async (data) => {//TODO: revise this part, logic is a little bit off
        console.log('data on login is : ', data);
        await login(data)
        socket.emit('otpsent')
        // const [user, created] = await User.findOrCreate({
        //   where:{email:data.email},
        //   defaults:{
        //     // email:data.email,
        //     otp
        //   }
        // })
    
      });

}

const handleOtpVerification = (socket) => {
    socket.on('otpVerification', async (data) => {
        console.log(data);
        const result = await otpVerification(data)
        if (result.verified == false) {
          console.log('resultJWT: ', result);
          socket.emit('otpFailed')
        }
        else {
          socket.emit('otpSuccess', { token: result.token })
        }
    
    
      });
}

module.exports={
    handleLogin,
    handleOtpVerification,
}