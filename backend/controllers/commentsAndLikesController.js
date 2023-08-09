/** @format */

const Userpost = require("../model/Userpost");
const User = require("../model/User");
const Profile = require("../model/Profiles");
const Comment = require("../model/Comment");
const Likes = require("../model/Like");
const Notification = require("../model/Notification");
const Notify = require("../model/Notify");
const nodemailer = require("nodemailer");

Comment.belongsTo(Profile, { as: "Responder", foreignKey: "userID" });
Profile.hasMany(Comment, { as: "CommentedBy", foreignKey: "userID" });

//GET REPLIES
const getReply = async (req, res) => {
  const getReplies = await Comment.findAll({
    include: [{ model: Profile, as: "Responder" }],
  });
  res.status(200).json(getReplies);
};

//NEW COMMENT
const handleNewComment = async (req, res) => {
  const { comment, psId } = req.body;

  if (!comment || !psId) {
    res.status(400).json("invalid credentials");
    return;
  }

  const newComment = {
    reply: comment,
    postID: psId,
    userID: req.user.id,
  };
  const createComment = await Comment.create(newComment);

  res.status(200).json(createComment);

  //Send notification
  const findUser = await Userpost.findOne({ where: { id: psId } });
  const { email, firstname } = await Profile.findByPk(findUser.userID);

  const newNotification = {
    notifyGen: req.user.id,
    notifyRec: findUser.userID,
    pstId: psId,
    purpose: "comment",
  };

  const createNotify = await Notification.create(newNotification);
  const newNotify = await Notify.create(newNotification);

  //SEND NOTIFICATION EMAIL
  const postLink = `http://localhost:3000/discussion/${psId}`;

  // //Send Mail
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
    to: email,
    subject: "New response",
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
            <p class="title">NEW RESPONSE NOTIFICATION</p>
            <p class="text">
                You have a new response to your post. Click the link below to view.<br />
                             
            </p>
            <a href="http://localhost:3000/discussion/${psId}"><div class="button">View Post</div></a>

            <p class="linkholder">
            Your Post Link: http://localhost:3000/discussion/${psId}.
            </p>
            <p>
                Thanks
            </p>        
            <p>
                Kindest Regards,<br />
                James from IMPACTVerse.
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
  return;
  // return res.status(200).json({ message: "notification created" });
};

//GET MY POSTS
const getComment = async (req, res) => {
  const postComments = await Userpost.findAll({
    where: { userID: req.user.id },
    include: [{ model: Comment, as: "Comment" }],
  });
  res.status(200).json(postComments);
  return;
};

//HANDLE POST LIKES
const handleLikes = async (req, res) => {
  const { pstId } = req.body;
  if (!pstId) {
    res.status(400).json({ message: "no credentials" });
    return;
  }

  const newLikes = {
    postID: pstId,
    userID: req.user.id,
  };
  const addLikes = await Likes.create(newLikes);
  res.json(addLikes);
  // return;

  const findUser = await Userpost.findOne({ where: { id: pstId } });

  const newNotification = {
    notifyGen: req.user.id,
    notifyRec: findUser.userID,
    pstId: pstId,
    purpose: "like",
  };

  const createNotify = await Notification.create(newNotification);
  const newNotify = await Notify.create(newNotification);

  return;
};

//HANDLE POST UNLIKES
const handleUnikes = async (req, res) => {
  const { delPstId } = req.body;

  if (!delPstId) {
    res.status(400).json({ message: "no credentials" });
    return;
  }

  const destroyLikes = await Likes.destroy({
    where: { postID: delPstId, userID: req.user.id },
  });

  res.json(destroyLikes);
  return;
};

//DELETE POST
const deletePost = async (req, res) => {
  const { pstID } = req.body;

  //Check if an empty form was sent
  if (!pstID) {
    return res.status(401).json({ message: "Field cannot be empty" });
  }

  const { roles, id } = await User.findByPk(req.user.id);
  const { userID } = await Comment.findOne({ where: { id: pstID } });

  //Check if user is an admin or the author of the post
  if (roles !== "Admin" && id !== userID) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const response = await Comment.destroy({ where: { id: pstID } });

  if (response) {
    res.status(200).json({ message: "Deleted Successfully" });
    return;
  } else {
    res.status(400).json({ message: "not deleted" });
    return;
  }
};

module.exports = {
  handleNewComment,
  getComment,
  handleLikes,
  handleUnikes,
  getReply,
  deletePost,
};
