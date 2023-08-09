/** @format */

import { Link, useParams, useNavigate } from "react-router-dom";
import {
  faInbox,
  faTriangleExclamation,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMessage } from "./features/message/messageSlice";
import { markRead } from "./features/markRead/mrSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  readMessage
} from "./features/getChatMessage/getChatMessageSlice";


const DMBoxItems = ({ chatsTitle }) => {
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const pid = chatsTitle.userID;

  useEffect(() => {
    dispatch(getMessage());
    // dispatch(lastMessage(chatsTitle.userID))
  }, [dispatch])
  // const lastReplyCreatedAt = useMemo(() => {
  //   const replies = message?.Replys || [];

  //   if (!replies.length) {
  //     return null;
  //   }

  //   const lastReply = replies[0];
  //   return lastReply.createdAt;
  // }, [message]);

  // const lastResponderID = useMemo(() => {
  //   const replies = message?.Replys || [];

  //   if (!replies.length) {
  //     return null;
  //   }

  //   const lastReply = replies[0];
  //   return lastReply.responderID;
  // }, [message]);

  // const getIsViewed = useMemo(() => {
  //   const replies = message?.Replys || [];

  //   if (!replies.length) {
  //     return null;
  //   }

  //   const viewStatus = replies[0];
  //   return viewStatus.isViewed;
  // }, [message]);

  // const handleSubmit = () => {
  //   dispatch(markRead({ mid }));
  //   navigate(`/read/${mid}`);
  // };

  // const handleLink = () => {
  //   navigate(`/read/${mid}`);
  // };

  return (
    <>
    {messages && messages.map((message) => (
      <>{(message.messageSenderID === chatsTitle.userID) || (message.messageReceiverID === chatsTitle.userID) && (<>{message.messageBody}</>)}</>
    ))}
    </>
  );
};

export default DMBoxItems;
