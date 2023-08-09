// const Verificationtoken = require("../model/Verificationtoken");
// const User = require("../model/User");

// const verifyUser = async(req, res) => {
//   const {token} = req.params;
  
//   try {
//     const verify = await Verificationtoken.findOne({token: token})

//     if(!verify) {
//         return res.status(404).json({message: "Invalid verificationtoken"});
//     }

//     const userData = {
//         isVerified: true,
//     };

//     //Verify the user's account
//     const verifyAccount = await User.update(userData, {where: id: verify.userId})

//     res.json({message: "User has been verified"})

//   } catch (error) {
//     console.error(error);
//     res.status(500)json({message: "Internal Server Error"});
//   }
// };

// module.exports = {
//     verifyUser,
// }