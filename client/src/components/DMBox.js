/** @format */

import { useNavigate, useParams } from "react-router-dom";
import {
  faInbox,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DMBoxItems from "./DMBoxItems";
import { getChatsTitle } from "./features/getChatForInbox/getChatForInboxSlice";
import { readMessage } from "./features/getChatMessage/getChatMessageSlice";
import { getMessage } from "./features/message/messageSlice";
import { lastMessage } from "./features/getLastMessage/getLastMessageSlice";
import DMChatsTitle from "./DMChatsTitle";
import Spinner from "./Spinner";
import TitleLinkHolder from "./TitleLinkHolder";

const DMBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { chatsTitles, isLoading } = useSelector((state) => state.chatsTitles);
  const { pid } = useParams();
  const { messages } = useSelector((state) => state.messages);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMsgs = mostRecenetMessages.filter((message) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return (
      message?.SenderProfile.firstname
        .toLowerCase()
        .includes(searchQueryLowerCase) ||
      message?.SenderProfile.lastname
        .toLowerCase()
        .includes(searchQueryLowerCase)
      // message?.ReceiverProfile?.firstname
      //   .toLowerCase()
      //   .includes(searchQueryLowerCase) ||
      // message?.ReceiverProfile?.lastname
      //   .toLowerCase()
      //   .includes(searchQueryLowerCase)
    );
  });
  useEffect(() => {
    dispatch(getChatsTitle());
    dispatch(getMessage());
    dispatch(lastMessage(`${pid}`));
  }, [dispatch]);

  dayjs.extend(relativeTime);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="col-12 mt-4">
      <div className="col-md-12 bg-dark text-white border rounded-0 p-3">
        <div className="col-12 fw-bold">
          <h3>DM Box</h3>
        </div>
        <div className="col-12 fw-bold">
          Search message by sender's name and manage your DM Box
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          className="col-12 rounded-4 border-light text-light mt-3 p-1 shadow fw-semibold"
          placeholder="Search for messages..."
          style={{ backgroundColor: "rgba(0,0,0,0.2)", fontSize: "10pt" }}
        />
      </div>
      <div className="col-12 bg-white shadow-sm border rounded-1 p-3 text-dark">
        <>
          {filteredMsgs && filteredMsgs.length > 0 ? (
            <>
              <>
                {filteredMsgs.map((message) => (
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
              <FontAwesomeIcon icon={faTriangleExclamation} /> Nothing to show!
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default DMBox;
