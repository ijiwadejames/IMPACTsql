/** @format */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../components/features/auth/authSlice";
import postReducer from "../components/features/posts/postSlice";
import notifyReducer from "../components/features/countNotify/countNotifySlice";
import emptyNotifyReducer from "../components/features/emptyNotify/emptyNotifySlice";
import countPostReducer from "../components/features/countPosts/countPostsSlice";
import profileReducer from "../components/features/profile/profileSlice";
import proProfileReducer from "../components/features/proProfile/proProfileSlice";
import perProfileReducer from "../components/features/perProfile/perProfileSlice";
import replyReducer from "../components/features/reply/replySlice";
import messageReducer from "../components/features/message/messageSlice";
import connectionProfilesReducer from "../components/features/connectionProfile/connectionProfileSlice";
import menteesProfileReducer from "../components/features/menteesProfile/menteesProfileSlice";
import connectionReducer from "../components/features/connection/connectionSlice";
import connListReducer from "../components/features/getConnectionRequest/getConnectionRequestSlice";
import acceptfrndReducer from "../components/features/acceptFriend/acceptFriendSlice";
import friendReducer from "../components/features/friend/friendSlice";
import editPostReducer from "../components/features/editpost/editPostSlice";
import reactReducer from "../components/features/reaction/reactionSlice";
import unlikeReducer from "../components/features/unlikeReaction/unlikeSlice";
import delPostReducer from "../components/features/delPosts/delPostSlice";
import lastseenReducer from "../components/features/lastseen/lastseenSlice";
import removeConReducer from "../components/features/removeCon/removeConSlice";
import isReadReducer from "../components/features/markRead/mrSlice";
import msgReplyReducer from "../components/features/messageReply/messageReplySlice";
import profilePicReducer from "../components/features/profilePicture/profilePictureSlice";
import postEngReducer from "../components/features/engagement/engagementSlice";
import cancelReqReducer from "../components/features/cancelConnection/connectionSlice";
import rejectFrndReducer from "../components/features/rejectFriend/rejectFriendSlice";
import chatMsgReducer from "../components/features/getChatMessage/getChatMessageSlice";
import chatsTitleReducer from "../components/features/getChatForInbox/getChatForInboxSlice";
import lastMsgReducer from "../components/features/getLastMessage/getLastMessageSlice";
import verifyReducer from "../components/features/verifyUser/verifyUserSlice";
import getFriendReducer from "../components/features/createConnDisconnBtns/friendSlice";
import delMessageReducer from "../components/features/deleteMessage/deleteMessageSlice";
import getNotifyReducer from "../components/features/getNotify/getNotifySlice";
import singlePostReducer from "../components/features/singlePost/singlePostSlice";
// import fetchReducer from "../components/features/fetchData/fetchSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  // fetchs: fetchReducer,
  verifys: verifyReducer,
  singlePosts: singlePostReducer,
  delMessages: delMessageReducer,
  posts: postReducer,
  countPosts: countPostReducer,
  notifys: notifyReducer,
  getNotifys: getNotifyReducer,
  getFriends: getFriendReducer,
  emptyNotifys: emptyNotifyReducer,
  profiles: profileReducer,
  profilePics: profilePicReducer,
  proProfiles: proProfileReducer,
  perProfiles: perProfileReducer,
  replys: replyReducer,
  messages: messageReducer,
  lastMsgs: lastMsgReducer,
  chatMsgs: chatMsgReducer,
  chatsTitles: chatsTitleReducer,
  conProfiles: connectionProfilesReducer,
  mProfiles: menteesProfileReducer,
  connRequests: connectionReducer,
  cancelReqs: cancelReqReducer,
  connLists: connListReducer,
  acceptFrnds: acceptfrndReducer,
  rejectFrnds: rejectFrndReducer,
  myFriends: friendReducer,
  editPosts: editPostReducer,
  reacts: reactReducer,
  unlikes: unlikeReducer,
  delPosts: delPostReducer,
  lastseens: lastseenReducer,
  removeCons: removeConReducer,
  isReads: isReadReducer,
  msgReplys: msgReplyReducer,
  postEngs: postEngReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/userLogginOut") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  preloadedState: undefined,
  devTools: true,
  immutableCheck: false,
});
