/** @format */

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const Collection = require("../model/Collection");
const errorHandler = require("../middleware/errorHandler");
const User = require("../model/User");
const Profile = require("../model/Profiles");
const Message = require("../model/Message");
const ProfilePic = require("../model/ProfilePic");
const Verificationtoken = require("../model/Verificationtoken");
const nodemailer = require("nodemailer");
const { createKey } = require("./encryption");

Profile.hasOne(User, { as: "User", foreignKey: "userID" });
User.hasOne(Profile, { as: "Profile", foreignKey: "userID" });

//Generate a random IV for the encryption algorithm
const iv = crypto.randomBytes(16);

//access: PUBLIC
const registerUser = async (req, res) => {
  const {
    username,
    password,
    lastname,
    firstname,
    // othernames,
    gender,
    email,
    dobD,
    dobM,
    dobY,
  } = req.body;

  //Check if fields are empty
  if (
    !username ||
    !password ||
    !lastname ||
    !firstname ||
    // !othernames ||
    !gender ||
    !email ||
    !dobD ||
    !dobM ||
    !dobY
  ) {
    res.status(400).json({ message: "fields cannot be empty" });
    return;
  }

  //check for duplicate username
  const duplicateUsername = await Profile.findOne({
    where: { username: username },
  });
  if (duplicateUsername) {
    res.status(400).json({ message: "Username already in use" });
    return;
  }

  //check for duplicate email
  const duplicateEmail = await Profile.findOne({ where: { email: email } });
  if (duplicateEmail) {
    res.status(400).json({ message: "Email is already in use" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username: username.toLowerCase(),
    password: hashedPassword,
    ip: "myIp",
  };

  const createUser = await User.create(newUser);

  const getUser = await User.findOne({ where: { username: username } });
  if (createUser) {
    res.status(201).json({
      id: getUser.id,
      username: getUser.username,
      password: getUser.password,
      token: generateToken(getUser.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }

  const getIv = crypto.randomBytes(16);

  const newProfile = {
    id: createUser.id,
    username: username.toLowerCase(),
    firstname: firstname,
    lastname: lastname,
    // othernames: othernames,
    userID: createUser.id,
    gender: gender,
    email: email.toLowerCase(),
    dd: dobD,
    mm: dobM,
    yyyy: dobY,
    iv: getIv,
  };

  const createProfile = await Profile.create(newProfile);

  const newProfilePic = {
    id: createUser.id,
  };

  const id = createUser.id;
  const create = createKey(id).then((key) => {
    console.log(`Created key for ${id}: ${key.toString("hex")}`);
  });

  const createProfilePic = await ProfilePic.create(newProfilePic);

  //Generate a verification token
  const key = crypto.randomBytes(20).toString("hex");
  //Generate timeStamp
  const expirationTimestamp = new Date(Date.now() + 24 * 60 * 60 * 1000); //Token expires in 24hrs
  //Generate iv
  const iv = crypto.randomBytes(16);

  const verifyUser = {
    token: key,
    userId: createUser.id,
    iv: iv.toString("hex"),
    expirationTimestamp: expirationTimestamp,
  };
  //Save the user with the verification token
  await Verificationtoken.create(verifyUser);

  //Create the verification link URL

  const verificationLink = `http://localhost:3000/verify-user/${key}`;

  //Send Mail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ijiwadejames@gmail.com",
      pass: "sofhwlspqkomchvj",
    },
  });

  const message = {
    from: "no-reply@impactacademy.com",
    to: req.body.email,
    subject: "verify account",
    html: `
    <html>
      <head>
        <style>        
         .container {
            background-color: black;
            max-width: 600px;
            margin: 0 auto;            
            font-size: 15px;  
            padding: 15px;                   
         }
         .title {
          width: 100%;
          padding: 10px;
          text-align: center;          
         }
         .text {
          width: 100%;
         }
         .linkholder {
          width: 100%;
          padding: 10px;
          text-align: center;
          color: white;
         }
         .button {
          width: auto;
          display: inline-block;      
          margin: 0 auto;
          background-color: purple;
          color: white;
          padding: 10px;
          text-align: center;
         }
         .messageBody {
            max-width: 600px;
            padding: 10px;
            color: white; 
            border-bottom: 2px solid white;             
            border-top: 2px solid white;
         }
         .footer{
          max-width: 600px;
          text-align: center;
          color: white;
          padding: 10px;
         }
        </style>
      </head>
      <body>
        <div class="container">  
        Logo      
        <div class="messageBody">
            <p>
                Dear ${firstname},
            </p>
            <p class="title">Please verify your account</p>
            <p class="text">
                Thanks for joinging the IMPACT Academy Mentorship Hub, please click the button below to verify your account.<br />
                             
            </p>
            <a href="http://localhost:3000/verify-user/${key}"><div class="button">verify account</div></a>

            <p class="linkholder">
            Your verification Link: http://localhost:3000/verify-user/${key} (single attempt and valid for 24 hours).
            </p>
            <p>
                Thanks
            </p>        
            <p>
                Kindest Regards,<br />
                I.O. James, <br />
                IMPACT Academy Dev Team
            </p>
        </div>
        <div class="footer">
          IMPACT Academy &copy; 2023
        </div>
        </div>
      </body>
    </html>
  `,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      // res.status(500).send("Email could not be sent.");
    } else {
      console.log("Email sent: " + info.response);
      // res.send("Email sent successfully!");
    }
  });

  console.log(verificationLink);
  // const verify = {
  //   token: encrypted,
  // iv: iv.toString('hex'),
  // expirationTimestamp: expirationTimestamp,
  // userId: createUser.id,
  // };

  //   const createToken = await Verificationtoken.create(verify).then(() => {
  //   console.log("Encrypted string saved");
  //   console.log("USER TOKEN IS", randomString);
  //   console.log("SECRETKEY", secretKey);
  // }).catch((err) => {
  //   console.error("Error saving string", err)
  // });
};

//access: PUBLIC
const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  //Check if fields are empty
  if (!username || !password) {
    res.status(400).json({ message: "fields cannot be empty" });
  }

  const getUser = await User.findOne({ where: { username: username } });

  if (
    getUser &&
    getUser.isVerified === true &&
    (await bcrypt.compare(password, getUser.password))
  ) {
    res.json({
      id: getUser.id,
      username: getUser.username,
      password: getUser.password,
      token: generateToken(getUser.id),
    });
  } else if (
    getUser &&
    getUser.isVerified === false &&
    (await bcrypt.compare(password, getUser.password))
  ) {
    res.status(400).json({ message: "Please verify your account" });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//GENERATE JQT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

//access: PRIVATE
const getMe = async (req, res) => {
  const { id, username, password } = await User.findByPk(req.user.id);
  res.status(200).json({
    id: id,
    username,
    password,
  });
  return;
};

const verifyUser = async (req, res) => {
  const { key } = req.params;

  try {
    const verify = await Verificationtoken.findOne({ where: { token: key } });

    if (!verify) {
      res.status(404).json({ message: "Invalid verification token" });
      return;
    }

    //Check link expiration
    const currentTime = new Date();
    if (currentTime > verify.expirationTimestamp) {
      return res.status(404).json({ message: "Token has expired" });
    } else {
      res.status(404).json({ message: "You account is now verified" });
    }

    const userData = {
      isVerified: true,
    };

    //Verify the user's account
    const verifyAccount = await User.update(userData, {
      where: { id: verify.userId },
    });
    if (verifyAccount) {
      console.log(verifyAccount);
      //Delete token after validation
      await Verificationtoken.destroy({ where: { userId: verify.userId } });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  registerUser,
  handleLogin,
  getMe,
  verifyUser,
};
