/** @format */

import PrivateProfileBar from "../components/PrivateProfileBar";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ChatBoxColumn from "../components/ChatBoxColumn";
import {
  readMessage,
  reset,
} from "../components/features/getChatMessage/getChatMessageSlice";
import { getConnectionProfile } from "../components/features/connectionProfile/connectionProfileSlice";
import ChatHolder from "../components/ChatHolder";
import ChatBoxHeader from "../components/ChatBoxHeader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMessage } from "../components/features/message/messageSlice";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
// import { markRead } from "../components/features/markRead/mrSlice";

const ChatBox = () => {
  const { conProfiles } = useSelector((state) => state.conProfiles);
  const { chatMsgs, isLoading } = useSelector((state) => state.chatMsgs);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pid } = useParams();
  // const mid = pid;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //fetch profil from database and store in state
    dispatch(getConnectionProfile(`${pid}`));
    dispatch(getMessage());
    // dispatch(markRead({ mid }));
    dispatch(getNotification());
    dispatch(countNotification());
    dispatch(readMessage(`${pid}`));
    // return () => {
    //   dispatch(reset());
    // };
  }, [pid, user, dispatch, navigate]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12">
          <Menu />
        </div>
        <div className="body-content">
          <div className="left-bar">
            {conProfiles &&
              conProfiles.map((profile) => (
                <PrivateProfileBar key={profile.id} profile={profile} />
              ))}
            {/* <LeftBar /> */}
          </div>

          <div className="middle-bar col-5 mt-3">
            <div className="col-12 bg-dark text-light p-2">
              {conProfiles &&
                conProfiles.map((profile) => (
                  <>
                    <ChatBoxHeader profile={profile} key={profile.username} />
                  </>
                ))}
            </div>

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
                        <ChatHolder key={message.id} message={message} />
                      ))}
                  </>
                ) : (
                  <div
                    className="col-12 text-center alignItem"
                    // style={{ fontSize: "12pt" }}
                  >
                    <FontAwesomeIcon icon={faTriangleExclamation} /> No messages
                    to show!
                  </div>
                )}
              </>
            )}

            <ChatBoxColumn />
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
