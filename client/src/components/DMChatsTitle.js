/** @format */

import { getMessage } from "./features/message/messageSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleLinkHolder from "./TitleLinkHolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

const DMChatsTitle = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { messages, isLoading } = useSelector((state) => state.messages);
  const uniqueUserIds = [
    ...new Set(
      messages.map((message) =>
        message.messageSenderID === (user && user.id)
          ? message.messageReceiverID
          : message.messageSenderID
      )
    ),
  ]; //Get a list of all the unique user IDs that you have interacted with

  const mostRecenetMessages = uniqueUserIds.map((userId) => {
    const filteredMessages = messages.filter(
      (message) =>
        (message.messageSenderID === (user && user.id) &&
          message.messageReceiverID === userId) ||
        (message.messageSenderID === userId &&
          message.messageReceiverID === (user && user.id))
    ); //Filter the messages for the current user ID and the spefified user ID

    const sortedMessages = filteredMessages.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ); //Sort the messages by createdAt timestamp

    return sortedMessages[0]; //Return the most recent message
  });

  useEffect(() => {
    dispatch(getMessage());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {messages && messages.length >= 1 ? (
        <>
          <>
            {mostRecenetMessages.map((message) => (
              <>
                <TitleLinkHolder key={message.id} message={message} />
              </>
            ))}
          </>
        </>
      ) : (
        <div
          className="col-12 text-center alignItem"
          // style={{ fontSize: "12pt" }}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} /> No messages to show!
        </div>
      )}
    </>
  );
};

export default DMChatsTitle;
