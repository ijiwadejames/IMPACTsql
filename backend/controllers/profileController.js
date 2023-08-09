/** @format */

const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const { Op, Sequelize } = require("sequelize");
const Profile = require("../model/Profiles");
const Connection = require("../model/Connection");
const Friend = require("../model/Friend");
const ProfilePic = require("../model/ProfilePic");
const User = require("../model/User");

Profile.hasMany(Connection, {
  as: "PendingRequests",
  foreignKey: "receiverID",
});
Profile.hasMany(Connection, {
  as: "SenderPendingRequests",
  foreignKey: "senderID",
});
Profile.belongsTo(ProfilePic, {
  as: "Image",
  foreignKey: "userID",
});
Connection.belongsTo(Profile, {
  as: "FriendsProfile",
  foreignKey: "senderID",
});
Profile.belongsTo(User, {
  as: "UserProfile",
  foreignKey: "id",
});
User.belongsTo(Profile, {
  as: "ProfileOwner",
  foreignKey: "id",
});
Profile.hasMany(Connection, {
  as: "iReceivedRequest",
  foreignKey: "senderID",
});
Connection.belongsTo(Profile, {
  as: "SeeProfile",
  foreignKey: "receiverID",
});
Profile.hasMany(Connection, {
  as: "iSentRequest",
  foreignKey: "senderID",
});
Connection.belongsTo(Profile, {
  as: "SeeSenderProfile",
  foreignKey: "receiverID",
});

//GET ME
const getMe = async (req, res) => {
  try {
    const records = await Profile.findAll({
      where: { id: req.user.id },
      // attributes: ['countries', 'email'],
      include: [
        { model: User, as: "UserProfile" },
        {
          model: ProfilePic,
          as: "Image",
        },
      ],
    }).then((result) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
  }
};

//GET PERSONAL PROFILE //DECRYPT
// const getMe = async (req, res) => {
//   try {
//     const records = await Profile.findAll({
//     where: { id: req.user.id },
//     // attributes: ['countries', 'email'],
//     include: [
//       { model: User, as: "UserProfile" },
//       {
//         model: ProfilePic,
//         as: "Image",
//       },
//     ],
//   });

//     const decryptedData = await Promise.all(records.map(async (record) => {
//       const data = await decrypt(record.countries, record.email);
//       const decryptedRecord = {data, ...record.toJSON()};
//       return decryptedRecord;
//     }));
// // console.log("THE RESPONSE", decryptedData);
// res.status(200).json(decryptedData);

//   } catch (error) {
//     console.log(error);
//   }

// };

//GET ALL MENTEES PROFILE
const menteesProfile = async (req, res) => {
  //----------------MAKE AN ARRAY OF CONNECTIONS ID------------------------------//
  try {
    const connections = await Connection.findAll({
      where: {
        isAccepted: true,
        [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
      },
    });

    const friendsIds = connections.map((connection) =>
      connection.senderID ? connection.receiverID : connection.senderID
    );
    const friendsId = connections.map((connection) =>
      connection.receiverID ? connection.senderID : connection.receiverID
    );

    const profile = await Profile.findAll({
      where: {
        userID: {
          [Op.and]: [
            {
              [Op.not]: friendsIds,
            },
            {
              [Op.not]: req.user.id,
            },
            {
              [Op.not]: friendsId,
            },
          ],
        },
      },
      include: [
        {
          model: ProfilePic,
          as: "Image",
        },
        {
          model: Connection,
          as: "PendingRequests",
        },
        {
          model: Connection,
          as: "SenderPendingRequests",
        },
      ],
    }).then((profile) => res.status(200).json(profile));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
  // .then((response) => {
  //   const ConnectionList = response.map((result) => result.senderID);
  //   // const filterReceiver = response.map((result) => result.receiverID);
  //   const Main = req.user.id;
  //   // return res.send({ ConnectionList, Main });
  //   Friend.findAll({
  //     where: {
  //       [Op.or]: [{ senderID: req.user.id }, { receiverID: req.user.id }],
  //     },
  //   }).then((result) => {
  //     const FriendsList = result.map((results) => results.senderID);
  //     const SecondFriendsList = result.map((results) => results.receiverID);

  //     Profile.findAll({
  //       where: {
  //         userID: {
  //           [Op.and]: [
  //             {
  //               [Op.not]: ConnectionList,
  //             },
  //             {
  //               [Op.not]: Main,
  //             },
  //             {
  //               [Op.not]: FriendsList,
  //             },
  //             {
  //               [Op.not]: SecondFriendsList,
  //             },
  //           ],
  //         },
  //       },
  //       include: [
  //         {
  //           model: Connection,
  //           as: "PendingRequests",
  //           include: [
  //             {
  //               model: Profile,
  //               as: "FriendsProfile",
  //             },
  //           ],
  //         },
  //         {
  //           model: ProfilePic,
  //           as: "Image",
  //         },
  //         // {
  //         //   model: Connection,
  //         //   as: "iReceivedRequest",
  //         //   include: [
  //         //     {
  //         //       model: Profile,
  //         //       as: "SeeProfile",
  //         //     },
  //         //   ],
  //         // },
  //         {
  //           model: Connection,
  //           as: "iSentRequest",
  //           include: [
  //             {
  //               model: Profile,
  //               as: "SeeProfile",
  //             },
  //           ],
  //         },
  //       ],
  //       // limit: 2,
  //       // order: [Sequelize.literal("RAND()")],
  //     }).then((result) => res.status(200).json(result));
  //   });
  // });
};

const storage = multer.diskStorage({
  destination: path.join(
    __dirname,
    "../.././client/public/" + "ProfilePictures"
  ),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProfilePicture = async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedadd = {
        avatar: req.file.filename,
        id: req.user.id,
      };

      const response = ProfilePic.update(classifiedadd, {
        where: { id: req.user.id },
      });
      if (response) {
        res.send("Profile Picture uploaded");
        return;
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

//GET PROFILE PICTURE
const getProfilePicture = async (req, res) => {
  const imageId = req.params.imageId;
  try {
    const base64Data = await ProfilePic.findByPk(imageId);
    res.send(base64Data);
    return;
  } catch (error) {
    res.status(500).send("error.message");
    return;
  }
};

// //------------------------------------------------------------------------ENDS HERE---------------------------------------------------------------------//
//UPDATE PERSONAL PROFILE
const updateProfile = async (req, res) => {
  const { country, phone } = req.body;
  const pid = req.user.id;

  //Check if fields are empty
  if (!country || !phone) {
    res.status(400).json({ message: "One or more fields are empty" });
    return;
  }

  //Get the email address of the logged in User for ENCRYPTION
  // const user = await Profile.findOne({where: {id: req.user.id}})
  // const UserProfile = {
  //   countries: country,
  //   phones: phone
  // }

  //ENCRYPT AAND DECRYPT
  // const encryptedCountry = await encrypt(UserProfile, user.email);
  // const decryptedCountry = await decrypt(encryptedCountry, user.email);

  if (pid !== req.user.id) {
    res.status(401).json({ message: "you are not authorized" });
    return;
  }

  const newProfileUpdate = {
    countries: country,
    phones: phone,
    // email: email,
  };

  const response = await Profile.update(newProfileUpdate, {
    where: { id: pid },
  });
  if (response) {
    res.status(200).json({ message: "...profile has been updated" });
    return;
  } else {
    res.status(400).json({ message: "update request failed" });
    return;
  }
};

//UPDATE PROFESSIONAL PROFILE
const updateProfessionalProfile = async (req, res) => {
  const { about, experience, category } = req.body;
  const pid = req.user.id;

  //Check if fields are empty
  if (!about || !experience || !category) {
    res.status(400).json({ message: "One or more fields are empty" });
    return;
  }

  // const duplicate = await Profile.findByPk(pid);
  // if (
  //   duplicate.about === about &&
  //   duplicate.experience === experience &&
  //   duplicate.category === category
  // ) {
  //   res
  //     .status(401)
  //     .json({ message: "details match exactly as already on profile" });
  // }

  if (pid !== req.user.id) {
    res.status(401).json({ message: "you are not authorized" });
    return;
  }

  const newProUpdate = {
    about: about,
    experience: experience,
    category: category,
  };

  const response = await Profile.update(newProUpdate, {
    where: { id: pid },
  });
  if (response) {
    res.status(200).json({ message: "...profile has been updated" });
    return;
  } else {
    res.status(400).json({ message: "update request failed" });
    return;
  }
};

//UPDATE LASTSEEN
const lastseen = async (req, res) => {
  const { date } = req.body;
  const pid = req.user.id;

  const newLastSeen = {
    lastseen: date,
  };

  const response = await Profile.update(newLastSeen, {
    where: { id: pid },
  });
  if (response) {
    res.status(200).json({ message: "...lastseen has been updated" });
    return;
  } else {
    res.status(400).json({ message: "update request failed" });
    return;
  }
};

//GET CONNECTION PROFILE
const connectionProfile = async (req, res) => {
  const pid = req.params.pid;
  const response = await Profile.findAll({
    where: { id: pid },
    include: [
      {
        model: ProfilePic,
        as: "Image",
      },
    ],
  });

  if (response) {
    res.status(200).json(response);
    return;
  } else {
    res.status(400).json({ message: "could not complete" });
    return;
  }
};

module.exports = {
  updateProfile,
  updateProfessionalProfile,
  getMe,
  connectionProfile,
  menteesProfile,
  lastseen,
  uploadProfilePicture,
  getProfilePicture,
};
