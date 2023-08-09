/** @format */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { readMessage, reset } from "./features/message/messageSlice";
import dayjs from "dayjs";
import he from "he";
import ProfilePicture from "./ProfilePicture";
import Spinner from "./Spinner";

const ChatHolder = ({ message }) => {
  const { pid } = useParams();
  const { isSuccess } = useSelector((state) => state.chatMsgs);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const decodedMessage = he.decode(message.messageBody);

  useEffect(() => {
    if (isSuccess) {
      dispatch(readMessage(`${pid}`));
    }
    // return () => {
    //   dispatch(reset());
    // }
  }, [dispatch]);

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = message.SenderProfile?.Image.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  return (
    <div className="col-12 ">
      {message.messageSenderID === user.id ? (
        <div
          className="chat-header mb-1 pt-0 pb-0 shadow-sm"
          style={{
            backgroundColor: "rgba(0,255,0,.09)",
          }}
        >
          {/* <div className="chat-body"> */}
          <div className="col-12 text-end" style={{ fontSize: "9pt" }}>
            {decodedMessage} <br />
            <span style={{ fontSize: "7pt", color: "rgba(0,0,0,.6)" }}>
              {dayjs(message.createdAt).format("DD MMMM, YYYY hh:mm A")}
            </span>
          </div>
          {/* </div> */}
        </div>
      ) : (
        <div
          className="chat-header mb-1 pt-0 pb-0 shadow-sm"
          style={{
            backgroundColor: "rgba(0,0,255,.09)",
          }}
        >
          <div className="chat-body">
            <div className="col-12 text-start" style={{ fontSize: "9pt" }}>
              {decodedMessage} <br />
              <span style={{ fontSize: "7pt", color: "rgba(0,0,0,.6)" }}>
                {dayjs(message.createdAt).format("DD MMMM, YYYY hh:mm A")}
              </span>
            </div>
          </div>

          <div className="chat-close">
            {message.SenderProfile?.Image.avatar !== null ? (
              <>
                <ProfilePicture
                  key={message.id}
                  avatar={imageUrl}
                  height="30px"
                  width="30px"
                />
              </>
            ) : (
              <>
                {message.SenderProfile?.Image.avatar === null &&
                message.SenderProfile?.gender === "Male" ? (
                  <>
                    <FontAwesomeIcon
                      style={{ fontSize: "20pt" }}
                      className="text-success"
                      icon={faUserCircle}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      style={{ fontSize: "20pt" }}
                      className="text-primary"
                      icon={faUserCircle}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHolder;
