/** @format */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faTimesCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  readMessage,
  reset,
} from "./features/getChatMessage/getChatMessageSlice";
import { getConnectionProfile } from "./features/connectionProfile/connectionProfileSlice";
import ChatBoxColumn from "./ChatBoxColumn";
import IconChatHolder from "./IconChatHolder";
import ChatBoxHeader from "./ChatBoxHeader";

const ChatBoxHead = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { chatMsgs, isLoading } = useSelector((state) => state.chatMsgs);
  const { conProfiles } = useSelector((state) => state.conProfiles);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const { pid } = useParams();
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const scrollableClass = isHovering ? "scrollable" : "scrollable hover";

  useEffect(() => {
    //fetch profil from database and store in state
    dispatch(getConnectionProfile(`${pid}`));
    dispatch(readMessage(`${pid}`));
    // return () => {
    //   dispatch(reset());
    // };
  }, [dispatch]);

  return (
    <>
      <div className="chat-icon" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComment} />
      </div>
      <div className={`chat-box ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header bg-dark text-light shadow">
          <div className="chat-title">
            {conProfiles &&
              conProfiles.map((profile) => (
                <>
                  <ChatBoxHeader key={profile.id} profile={profile} />
                </>
              ))}
          </div>
          <div className="chat-close" onClick={toggleChat}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </div>
        <div
          //   className="chat-holder"
          className={scrollableClass}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading ? (
            <div className="col-2 ms-auto me-auto mt-1 mb-1">
              <div className="spinner-border text-center text-primary m-auto"></div>
            </div>
          ) : (
            <>
              {chatMsgs && chatMsgs.length >= 1 ? (
                <>
                  {chatMsgs &&
                    chatMsgs.map((message) => (
                      <IconChatHolder key={message.id} message={message} />
                    ))}
                </>
              ) : (
                <div className="col-12 text-center alignItem">
                  <FontAwesomeIcon icon={faTriangleExclamation} /> No messages
                  to show!
                </div>
              )}
            </>
          )}
        </div>
        <ChatBoxColumn
          className="bg-dark"
          style={{ marginTop: "auto", marginBottom: "0" }}
        />
      </div>
    </>
  );
};

export default ChatBoxHead;
