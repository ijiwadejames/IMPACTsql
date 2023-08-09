/** @format */

const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const Userpost = require("../model/Userpost");
const Profile = require("../model/Profiles");
const Comment = require("../model/Comment");
const User = require("../model/User");
const Like = require("../model/Like");
const Connection = require("../model/Connection");
const Notification = require("../model/Notification");
const Notify = require("../model/Notify");
const ProfilePic = require("../model/ProfilePic");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Engage = require("../model/Engage");
const { faLinkSlash } = require("@fortawesome/free-solid-svg-icons");

//----------------------------------------ASSOCIATIONS START HERE-----------------------------------------------------------//
Userpost.hasMany(Comment, { as: "comment", foreignKey: "postID" });
Userpost.belongsTo(Profile, { as: "Profile", foreignKey: "userID" });
Notify.belongsTo(Profile, { as: "NotifyGenerator", foreignKey: "NotifyGen" });
Notify.belongsTo(Profile, { as: "NotifyReceiver", foreignKey: "NotifyRec" });
Userpost.hasMany(Like, { as: "likedBy", foreignKey: "postID" });
Comment.belongsTo(Profile, { as: "CommenterProfile", foreignKey: "userID" });
Like.belongsTo(Profile, { as: "responserProfile", foreignKey: "userID" });
Userpost.belongsTo(ProfilePic, { as: "Image", foreignKey: "userID" });
Comment.belongsTo(ProfilePic, { as: "Image", foreignKey: "userID" });
Userpost.hasMany(Engage, { as: "Engages", foreignKey: "postID" });

//----------------------------------------ASSOCIATIONS END HERE-------------------------------------------------------------//

//-------------------------------------------------------------------------------//
// const getConnections = await Connection.findAll({
//   where: {
//     [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
//   },
//   attributes: {
//     exclude: ["createdAt", "receiverID", "updatedAt", "id"], //exclude some data from being sent to the client
//   },
// });
// res.json({ getConnections });
//-------------------------------------------------------------------------------//

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../.././client/public/" + "PostImages"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const handleNewPost = async (req, res) => {
  try {
    let upload = multer({
      storage: storage,
      limits: {
        fileSize: 1000000, // 1000000 Bytes = 1MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
          //upload only png, jpg and jpeg
          return cb(new Error("Please upload an Image"));
        }
        cb(undefined, true);
      },
    }).single("avatar");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Empty");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedadd = {
        post: req.body.pst,
        avatar: req.file.filename,
        userID: req.user.id,
      };

      const response = Userpost.create(classifiedadd);
      if (response) {
        res.send("Successful");
        return;
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const textOnlyPost = async (req, res) => {
  const pst = req.body.pst;

  if (!pst) {
    res.status(400).json("Field cannot be empty");
    return;
  }

  const postData = {
    post: pst,
    userID: req.user.id,
  };

  const createPost = await Userpost.create(postData);
  res.status(200).json(createPost);

  // const result = await Connection.findAll({
  //   where: {
  //     [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
  //   },
  //   attributes: ["senderID", "receiverID"],
  // })
  //   .then((rows) => {
  //     const recepients = rows
  //       .map((row) => {
  //         const id =
  //           row.senderID === req.user.id ? row.receiverID : row.senderID;
  //         return { userID: id };
  //       })
  //       .filter((recepient) => recepient.userID !== req.user.id);

  //     Notification.bulkCreate(recepients)
  //       .then(() => {
  //         console.log("Notification sent");
  //       })
  //       .catch((error) => {
  //         console.error("Error sending notification", error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching ID:", error);
  //   });

  // ;
  //   const ConnectionsList = result.map((results) => results.senderID);
  //   const SecondConnectionsList = result.map((results) => results.receiverID);
  //   const Mine = req.user.id;
  //   let idToSend = [...ConnectionsList, ...SecondConnectionsList].filter(id => id !== Mine);

  // if(FriendsList.includes(req.user.id)) {
  //   idToSend = FriendsList;
  // } else if(SecondFriendsList.includes(req.user.id)) {
  //   idToSend = SecondFriendsList;
  // };

  // console.log("FRIENDS LIST", idToSend)

  // const addNotification = {
  //   userID: JSON.stringify(idToSend),
  // }
  // const newNotification = await Notification.bulkCreate(addNotification);

  // console.log(newNotification)
};

const countNotify = async (req, res) => {
  const logged_in_user_id = req.user.id;

  const responses = await Notification.count({
    where: {
      notifyGen: {
        [Op.ne]: logged_in_user_id,
      },
      notifyRec: logged_in_user_id,
    },
  }).then((responses) => res.status(200).json(responses));
};

//GET NOTIFICATION DATA
const getNotify = async (req, res) => {
  const logged_in_user_id = req.user.id;

  const responses = await Notify.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      notifyRec: logged_in_user_id,
    },
    include: [
      { model: Profile, as: "NotifyGenerator" },
      { model: Profile, as: "NotifyReceiver" },
    ],
  }).then((responses) => res.status(200).json(responses));
};

//-------------------------------------------------------------------------------------------------------------------//
//GET PERSONAL POSTS ON MY PROFILE
const getPersonalPost = asyncHandler(async (req, res) => {
  const post = await Userpost.findAll({
    order: [["createdAt", "DESC"]],
    where: { userID: req.params.pid },
    include: [
      { model: Profile, as: "Profile" },
      { model: ProfilePic, as: "Image" },
      {
        model: Comment,
        as: "comment",
        include: [
          {
            model: Profile,
            as: "CommenterProfile",
          },
          {
            model: ProfilePic,
            as: "Image",
          },
        ],
      },
      {
        model: Like,
        as: "likedBy",
        include: {
          model: Profile,
          as: "responserProfile",
        },
      },
      {
        model: Engage,
        as: "Engages",
      },
    ],
  });

  res.status(200).json(post);
  return;
});

//-------------------------------------------------------------------------------------------------------------------//

//GET SINGLE POST CONVERSATION
const singlePost = asyncHandler(async (req, res) => {
  const post = await Userpost.findAll({
    where: { id: req.params.pstId },
    include: [
      { model: Profile, as: "Profile" },
      { model: ProfilePic, as: "Image" },
      {
        model: Comment,
        as: "comment",
        include: [
          {
            model: Profile,
            as: "CommenterProfile",
          },
          {
            model: ProfilePic,
            as: "Image",
          },
        ],
      },
      {
        model: Like,
        as: "likedBy",
        include: {
          model: Profile,
          as: "responserProfile",
        },
      },
      {
        model: Engage,
        as: "Engages",
      },
    ],
  });

  res.status(200).json(post);
  return;
});

//GET MY POSTS AND FRIENDS POSTS ON MY DASHBOARD
const getPost = async (req, res) => {
  //--------------------THESE CODES FILTERS A USER'S FRIENDS ID AND PLACES THEM IN AN ARRAY AND THEN USED TO QUERY THE "USERPOST" TABLE----------------------
  await Connection.findAll({
    where: {
      requestStatus: true,
      [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
    },
  }).then((connects) => {
    const limit = parseInt(req.params.limit, 10) || 10;

    const Friends = connects.map((connect) => connect.receiverID);
    const Connections = connects.map((connect) => connect.senderID);
    const Mine = [req.user.id];
    // return res.send({ Friends, Mine }); //returns Friends' and logged in user's IDs in an array and used to query the DB
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    Userpost.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userID: {
          [Op.or]: [
            {
              [Op.in]: Friends,
            },
            {
              [Op.in]: Mine,
            },
            {
              [Op.in]: Connections,
            },
          ],
        },
      },

      include: [
        { model: Profile, as: "Profile" },
        { model: ProfilePic, as: "Image" },
        {
          model: Comment,
          as: "comment",
          include: [
            {
              model: Profile,
              as: "CommenterProfile",
            },
            {
              model: ProfilePic,
              as: "Image",
            },
          ],
        },
        {
          model: Like,
          as: "likedBy",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "postID"],
          },
          include: {
            model: Profile,
            as: "responserProfile",
          },
        },
        {
          model: Engage,
          as: "Engages",
        },
      ],
      order: [[{ model: Comment, as: "comment" }, "createdAt", "ASC"]],
      limit: limit,
    }).then((post) => res.status(200).json(post));
  });
};

//COUNT MY POSTS AND FRIENDS POSTS ON MY DASHBOARD
const countGetPost = async (req, res) => {
  //--------------------THESE CODES FILTERS A USER'S FRIENDS ID AND PLACES THEM IN AN ARRAY AND THEN USED TO QUERY THE "USERPOST" TABLE----------------------
  await Connection.findAll({
    where: {
      [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
    },
  }).then((connects) => {
    const Friends = connects.map((connect) => connect.receiverID);
    const Connections = connects.map((connect) => connect.senderID);
    const Mine = [req.user.id];
    // return res.send({ Friends, Mine }); //returns Friends' and logged in user's IDs in an array and used to query the DB
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    Userpost.count({
      where: {
        userID: {
          [Op.or]: [
            {
              [Op.in]: Friends,
            },
            {
              [Op.in]: Mine,
            },
            {
              [Op.in]: Connections,
            },
          ],
        },
      },

      include: [
        { model: Profile, as: "Profile" },
        {
          model: Comment,
          as: "comment",
          include: [
            {
              model: Profile,
              as: "CommenterProfile",
            },
            {
              model: ProfilePic,
              as: "Image",
            },
          ],
        },
        {
          model: Like,
          as: "likedBy",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "postID"],
          },
          include: {
            model: Profile,
            as: "responserProfile",
          },
        },
        {
          model: Engage,
          as: "Engages",
        },
      ],
      order: [[{ model: Comment, as: "comment" }, "createdAt", "DESC"]],
    }).then((post) => res.status(200).json(post));
  });
};

//EDIT POST
const editPost = async (req, res) => {
  const { pid, editData } = req.body;

  if (!editPost) {
    res.status(400).send({ messsage: "empty request" });
    return;
  }

  const newUpdate = {
    post: editData,
  };

  const response = Userpost.update(newUpdate, { where: { id: pid } });

  if (response) {
    res.status(201).send({ message: "edited successfully" });
    return;
  } else {
    res.status(400).send({ message: "error" });
    return;
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  const pstID = req.params.pstID;
  const { roles, id } = await User.findByPk(req.user.id);
  const { userID } = await Userpost.findByPk(pstID);

  //Check if an empty form was sent
  // if (!pstID) {
  //   return res.status(401).json({ message: "Field cannot be empty" });
  // }

  //Check if user is an admin or the author of the post
  if (roles !== "Admin" && id !== userID) {
    return res.status(404).json({ message: "Unauthorized!" });
  }

  const response = await Userpost.destroy({ where: { id: pstID } });

  if (response) {
    res.status(200).json({ message: "...deleted successfully" });

    await Comment.destroy({
      where: {
        postID: pstID,
      },
    });
    await Notification.destroy({ where: { pstId: pstID } });

    await Notify.destroy({ where: { pstId: pstID } });
  } else {
    res.status(400).json({ message: "not deleted" });
    return;
  }
};

//DELETE POST
const deleteNotification = async (req, res) => {
  const logged_in_user_id = req.user.id;

  //Check if an empty form was sent
  if (!logged_in_user_id) {
    res.status(401).json({ message: "Field cannot be empty" });
    return;
  }

  const response = await Notification.destroy({
    where: {
      notifyRec: {
        [Op.like]: `%${logged_in_user_id}%`,
      },
    },
  });

  if (response) {
    res.status(200).json({ message: "notification cleared" });
    return;
  } else {
    res.status(400).json({ message: "not deleted" });
  }
};

module.exports = {
  handleNewPost,
  textOnlyPost,
  getPost,
  countGetPost,
  countNotify,
  getNotify,
  getPersonalPost,
  editPost,
  deletePost,
  singlePost,
  deleteNotification,
};
