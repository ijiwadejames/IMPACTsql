/** @format */

const { Sequelize, Op } = require("sequelize");
const Profile = require("../model/Profiles");
const Connection = require("../model/Connection");
const Friend = require("../model/Friend");
const asyncHandler = require("express-async-handler");
const ProfilePic = require("../model/ProfilePic");

Profile.hasMany(Connection, {
  as: "pendingRequests",
  foreignKey: "receiverID",
});
Connection.belongsTo(Profile, { as: "senderProfile", foreignKey: "senderID" });
Profile.hasMany(Friend, { as: "SeeMyFriends", foreignKey: "receiverID" });
Friend.belongsTo(Profile, { as: "seeProfile", foreignKey: "senderID" });
Friend.belongsTo(ProfilePic, { as: "Image", foreignKey: "senderID" });

//SEND CONNECTION REQUEST
const handleConnection = asyncHandler(async (req, res) => {
  const { hId } = req.body;
  const userID = req.user.id;

  //check for blank fields
  if (!hId || !userID) {
    res.status(400).json({ message: "blank fields" });
    return;
  }

  //check for duplicate
  const duplicate = await Connection.findOne({
    where: {
      senderID: userID,
      receiverID: hId,
    },
  });
  if (duplicate) {
    console.log("Duplicate request");
    return;
  }

  const newConnection = {
    senderID: userID,
    receiverID: hId,
  };
  //create connection
  const createConnection = await Connection.create(newConnection);

  const updateIsSent = {
    isSent: true,
  };
  const response = await Connection.update(updateIsSent, {
    where: {
      senderID: userID,
      receiverID: hId,
    },
  });
  res.status(201).json(createConnection);
  return;
});

//CANCEL SENT REQUEST
const cancelSentRequest = async (req, res) => {
  const cId = req.params.cId;

  try {
    const cancelRequest = await Connection.destroy({
      where: { senderID: req.user.id, receiverID: cId },
    });
    res.status(200).json({ cancelRequest });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

//RECEIVE PENDING REQUESTS FROM CONNECTION
const getRequest = async (req, res) => {
  try {
    const seeConnection = await Profile.findAll({
      where: { userID: req.user.id },
      include: [
        {
          model: Connection,
          as: "pendingRequests",
          where: { requestStatus: false },
          include: {
            model: Profile,
            as: "senderProfile",
            include: {
              model: ProfilePic,
              as: "Image",
            },
          },
        },
        {
          model: ProfilePic,
          as: "Image",
        },
      ],
      limit: 1,
      order: [Sequelize.literal("RAND()")],
    });

    res.send(seeConnection);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

//ACCEPT REQUEST AND ADD TO FRIENDS LIST
//first add userID to Friends Model
//second, delete requestion from Connection Model
const handleConnectionRequest = asyncHandler(async (req, res) => {
  const { fId } = req.body; //dId = delete Id
  const uId = req.user.id; //logged in user id

  if (!fId || !uId) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  const newAddConnection = {
    requestStatus: true,
    isAccepted: true,
  };

  //Add to Friends Model
  //Delete from Pending Connection List
  const addConnection = await Connection.update(newAddConnection, {
    where: { senderID: fId, receiverID: uId },
  });

  // await Connection.destroy({
  //   where: { senderID: fId, receiverID: uId },
  // });

  res.status(201).json(addConnection);
  return;
});

//RECEIVE MY FRIENDS
//GET FRINEDS ID IN AN ARRAY
const getFriends = async (req, res) => {
  try {
    const connections = await Connection.findAll({
      where: {
        requestStatus: true,
        [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
      },
    });

    const friendsIds = connections.map((connection) =>
      connection.senderID === req.user.id
        ? connection.receiverID
        : connection.senderID
    );

    const friends = await Profile.findAll({
      where: { id: { [Op.in]: friendsIds } },
      include: {
        model: ProfilePic,
        as: "Image",
      },
    }).then((friends) => res.json(friends));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "We could not get your friends list" });
  }
  // await Friend.findAll({
  //   where: {
  //     [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
  //   },
  // }).then((connects) => {
  //   const RequestReceiver = connects.map((connect) => connect.receiverID);
  //   const RequestSender = connects.map((connect) => connect.senderID);
  //   // return res.send({ RequestReceiver, RequestSender });

  //   Profile.findAll({
  //     where: {
  //       [Op.or]: [{ userID: RequestReceiver }, { userID: RequestSender }],
  //     },
  //     include: [
  //       {
  //         model: Friend,
  //         as: "SeeMyFriends",
  //         where: {
  //           [Op.or]: [
  //             { senderID: RequestSender },
  //             { receiverID: RequestReceiver },
  //           ],
  //         },
  //         include: {
  //           model: Profile,
  //           as: "seeProfile",
  //           include: {
  //             model: ProfilePic,
  //             as: "Image",
  //           },
  //         },
  //       },
  //       {
  //         model: ProfilePic,
  //         as: "Image",
  //       },
  //     ],
  //   }).then((friends) => res.status(200).json(friends));
  // });
};

//FOR CREATING THE CONNECT/DISCONNECT BUTTONS
const getMyFriends = async (req, res) => {
  const pid = req.params.pid;

  const response = await Connection.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [{ senderID: req.user.id }, { receiverID: pid }],
        },
        {
          [Op.and]: [{ senderID: pid }, { receiverID: req.user.id }],
        },
      ],
    },
  }).then((results) => {
    if (results.length === 0) {
      res.send("Connect");
    } else {
      let responseSent = false;
      results.forEach((result) => {
        if (result.isSent && !result.isAccepted) {
          res.send("Request Sent");
          responseSent = true;
        } else if (result.isAccepted && result.isSent) {
          res.send("Disconnect");
          responseSent = true;
        }
      });
      if (!responseSent) {
        res.send("Connect");
      }
    }
  });
};

//REJECT FRIEND REQUEST
const rejectRequest = async (req, res) => {
  const dId = req.params.dId;

  try {
    const deleteRequest = await Connection.destroy({
      where: { senderID: dId, receiverID: req.user.id },
    });
    res.status(200).json({ deleteRequest });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

//REMOVE  A FRIEND
const removeFriend = async (req, res) => {
  const id = req.params.id;
  const userID = req.user.id;

  //CHECK IF NO ID throw Error
  // if (!id) {
  //   res.status(401).json("Unauthorized");
  // }

  const removeFrnd = await Connection.destroy({
    where: {
      [Op.or]: [
        { senderID: id, receiverID: userID },
        { senderID: userID, receiverID: id },
      ],
    },
  });
  if (removeFrnd) {
    res.status(200).json({ message: "friend removed" });
    return;
  } else {
    res.status(400).json({ message: "something went wrong" });
    return;
  }
};

//SUSPEND A FRIEND
const suspendFriend = async (req, res) => {
  const { friendID } = req.body;
  if (!friendID)
    return res.status(401).json({ message: "Invalid Credentials!" });
  try {
    const response = await Friend.update(
      { isActive: false },
      {
        where: {
          [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
        },
      }
    );

    if (response) {
      res.status(200).json({ message: "User has been suspended" });
      return;
    } else {
      res.status(400).json({ message: "something went wrong" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

//REACTIVATE FRIEND
const reactivateFriend = async (req, res) => {
  const { friendID } = req.body;
  if (!friendID)
    return res.status(401).json({ message: "Invalid Credentials!" });
  try {
    const response = await Friend.update(
      { isActive: true },
      {
        where: {
          [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
        },
      }
    );

    if (response) {
      res.status(200).json({ message: "User has been reactivated" });
      return;
    } else {
      res.status(400).json({ message: "something went wrong" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

module.exports = {
  handleConnection, //SEND A CONNECTION REQUEST
  getRequest, //RECEIVE CONNECTION REQUEST NOTIFICATION
  handleConnectionRequest, //ACCEPT REQUEST::: ADDS FRIEND TO FRIENDS LIST AND REMOVE SAME FROM CONNECTION REQUEST LIST
  getFriends, // GET FRIENDS
  getMyFriends, //CREATE CONNECT BUTTON
  rejectRequest, //DELETE CONNECTION REQUEST
  removeFriend, //REMOVE FRIEND FROM FRIENDS LIST
  cancelSentRequest, //CANCEL A SENT REQUEST
  suspendFriend, //TEMPORAL SUSPENSION - AN ALTERNATIVE TO REMOVING A FRIEND
  reactivateFriend, //REACTIVATE SUSPENDED FRIEND
};
