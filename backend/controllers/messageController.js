/** @format */
const crypto = require("crypto");
const Message = require("../model/Message");
const Profile = require("../model/Profiles");
const ProfilePic = require("../model/ProfilePic");
const asyncHandler = require("express-async-handler");
const Readersview = require("../model/Readersview");
const { Op } = require("sequelize");

/////////////////////// handleMessaging,  receiverMessages,  sentMessages,  deleteMessages,  markAsRead,  markUnread/////////////////////////////

//----------------------------------------------------ASSOCIATIONS---------------------------------------------------------------------------//
Profile.hasMany(Message, { as: "Message", foreignKey: "messageSenderID" });

ProfilePic.belongsTo(Profile, { as: "Image", foreignKey: "id" });

Message.belongsTo(Profile, {
  as: "SenderProfile",
  foreignKey: "messageSenderID",
});

Message.belongsTo(Profile, {
  as: "ReceiverProfile",
  foreignKey: "messageReceiverID",
});

Message.belongsTo(Profile, {
  as: "Sender",
  foreignKey: "messageSenderID",
});

Message.belongsTo(Profile, {
  as: "Receiver",
  foreignKey: "messageReceiverID",
});

Message.belongsTo(Profile, { as: "MyProfile", foreignKey: "messageSenderID" });

Message.hasMany(Readersview, {
  as: "Replys",
  foreignKey: "resUniqueID",
  order: [["id", "DESC"]],
});

Readersview.belongsTo(Profile, {
  as: "RespondersProfile",
  foreignKey: "responderID",
});

//----------------------------------------------------ASSOCIATIONS END-----------------------------------------------------------------------//

//------------------------------------------------------SEND MESSAGE TO A FRIEND---------------------------------------------------------------//
const handleMessaging = asyncHandler(async (req, res) => {
  const { messageBody, receiverID } = req.body;

  if (!messageBody || !receiverID)
    return res.status(400).json({ messsage: "All fields must be completed" });

  const newSendMessage = {
    messageBody: messageBody,
    messageReceiverID: receiverID,
    messageSenderID: req.user.id,
  };
  try {
    const sendMessage = await Message.create(newSendMessage);

    res.status(201).json({ message: "Message Delivered" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
});
//------------------------------------------------------END SEND MESSAGE TO A FRIEND------------------------------------------------------------//

//--------GET A LIST OF PEOPLE I HAVE HAD A CHAT WITH----------------
const getChatMates = async (req, res) => {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { messageSenderID: req.user.id },
        { messageReceiverID: req.user.id },
      ],
    },
    include: [
      { model: Profile, as: "Sender" },
      { model: Profile, as: "Receiver" },
    ],
  });

  const userIds = new Set();

  messages.forEach((message) => {
    if (message.messageSenderID !== req.user.id) {
      userIds.add(message.messageSenderID);
    }
    if (message.messageReceiverID !== req.user.id) {
      userIds.add(message.messageReceiverID);
    }
  });

  const users = await Profile.findAll({
    where: {
      id: Array.from(userIds),
    },
  });
  res.json(users);
};

//-------------------------------------------------------------------

//---------------------------------------------------GET LAST MESSAGES
const getLastMessage = async (req, res) => {
  const pid = req.params.pid;

  console.log("THE MESSAGE ID", pid);
  const lastMessage = await Message.findAll({
    where: {
      [Op.or]: [{ messageSenderID: pid }, { messageReceiverID: pid }],
    },
    order: [["createdAt", "DESC"]],
    group: ["messageSenderID", "messageReceiverID"],
  });
  res.send(lastMessage);
  return;
};

//-----------------------------------------------------------------------------
//----------------------------------------------------------FETCH INBOX MESSAGES---------------------------------------------------------------//
const receiverMessages = async (req, res) => {
  const myMessages = await Message.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      [Op.or]: [
        { messageReceiverID: req.user.id },
        { messageSenderID: req.user.id },
      ],
    },
    include: [
      {
        model: Profile,
        as: "SenderProfile",
      },
      {
        model: Profile,
        as: "ReceiverProfile",
      },
      {
        model: Readersview,
        as: "Replys",
        include: [{ model: Profile, as: "RespondersProfile" }],
      },
    ],
    order: [[{ model: Readersview, as: "Replys" }, "createdAt", "DESC"]],
  });
  res.send(myMessages);
  return;
};
//----------------------------------------------------------END FETCH INBOX MESSAGES-----------------------------------------------------------//

//----------------------------------------------------------FETCH INBOX FOR READ PAGE----------------------------------------------------------//
const readMessage = async (req, res) => {
  const myMessages = await Message.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { messageSenderID: req.params.pid },
            { messageReceiverID: req.params.pid },
          ],
        },
        {
          [Op.or]: [
            { messageSenderID: req.user.id },
            { messageReceiverID: req.user.id },
          ],
        },
      ],
    },
    include: [
      {
        model: Profile,
        as: "SenderProfile",
        include: [
          {
            model: ProfilePic,
            as: "Image",
          },
        ],
      },

      // {
      //   model: Readersview,
      //   as: "Replys",
      //   include: [{ model: Profile, as: "RespondersProfile" }],
      // },
    ],
    // order: [[{ model: Message }, "createdAt", "ASC"]],
  });
  res.send(myMessages);
  return;
};
//----------------------------------------------------------END FETCH INBOX MESSAGES-----------------------------------------------------------//

//----------------------------------------------------------FETCH SENT MESSAGES---------------------------------------------------------------//

const sentMessages = asyncHandler(async (req, res) => {
  try {
    const response = await Message.findAll({
      order: [["id", "DESC"]],
      where: { messageSenderID: req.user.id },
      include: [
        { model: Profile, as: "MyProfile" },
        {
          model: Readersview,
          as: "Replys",
          include: [{ model: Profile, as: "RespondersProfile" }],
        },
      ],
    });
    res.send({ response });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
});

//----------------------------------------------------------END FETCH SENT MESSAGES-----------------------------------------------------------//

//----------------------------------------------------------DELETE INBOX MESSAGES---------------------------------------------------------------//
const deleteMessages = async (req, res) => {
  const uId = req.params.uId;

  if (!uId) {
    return res.status(400).json({ message: "Message no longer exists" });
  }
  try {
    const destroy = await Message.destroy({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { messageSenderID: uId },
              { messageReceiverID: req.user.id },
            ],
          },
          {
            [Op.and]: [
              { messageSenderID: req.user.id },
              { messageReceiverID: uId },
            ],
          },
        ],
      },
    });

    if (destroy) {
      res.status(200).json({ message: "messageDestroyed" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
//----------------------------------------------------------END DELET INBOX MESSAGES-----------------------------------------------------------//

//----------------------------------------------------------MARK AS READ---------------------------------------------------------------//
const markAsRead = async (req, res) => {
  const { mid } = req.body;

  console.log("CHECK ID", mid);

  if (!mid) {
    res.status(400).json("Invalid Data Gotten");
    return;
  }

  const isRead = {
    isViewed: true,
  };

  const read = await Message.update(isRead, { where: { uniqueID: mid } });

  if (read) {
    res.status(200).json({ message: "Mesage Read" });
    return;
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
};
//----------------------------------------------------------END MARK AS READ-----------------------------------------------------------//

//----------------------------------------------------------MARK AS UNREAD---------------------------------------------------------------//
const markUnread = async (req, res) => {
  const { msgID } = req.body;
  console.log(msgID);
  if (!msgID) {
    return res.status(400).json({ message: "Message no longer exists" });
  }

  const isUnread = {
    isRead: false,
  };

  try {
    const uread = await Message.update(isUnread, {
      where: { uniqueID: msgID },
    });

    if (uread) {
      res.status(200).json({ message: "Mesage Unread" });
      return;
    } else {
      res.status(400).json({ message: "Error" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
//----------------------------------------------------------END MARK AS UNREAD-----------------------------------------------------------//

///////////////////////////////////////////////-------HANDLE MESSAGE CONVERSATIONS-----------//////////////////////////////////////////////

//----------------------------------------------------------REPLY MESSAGE---------------------------------------------------------------//
const replyMessage = async (req, res) => {
  const { rep, msID } = req.body;

  if (!rep || !msID) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const idRes = await Message.findOne({ where: { uniqueID: msID } });

  const newReply = {
    resUniqueID: idRes.id,
    replyBody: rep,
    messageID: msID,
    responderID: req.user.id,
    responseReceiverID: idRes.messageSenderID,
  };

  const addReply = await Readersview.create(newReply);

  const statusData = {
    status: "inbox",
    isViewed: false,
    isRead: false,
  };

  const status = await Message.update(statusData, {
    where: { uniqueID: msID },
  });

  if (status) {
    res.status(200).json({ message: "success" });
    return;
  }
};
//----------------------------------------------------------END REPLY MESSAGE-----------------------------------------------------------//

module.exports = {
  handleMessaging,
  receiverMessages,
  sentMessages,
  deleteMessages,
  markAsRead,
  markUnread,
  replyMessage,
  readMessage,
  getChatMates,
  getLastMessage,
};
