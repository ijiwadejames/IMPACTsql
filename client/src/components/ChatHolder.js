/** @format */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { readMessage, reset } from "./features/message/messageSlice";
import dayjs from "dayjs";
import he from "he";
import ProfilePicture from "./ProfilePicture";
import Spinner from "./Spinner";
import { markRead } from "../components/features/markRead/mrSlice";

const ChatHolder = ({ message }) => {
  const { pid } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const decodedMessage = he.decode(message.messageBody);
  const mid = message.uniqueID;

  useEffect(() => {
    dispatch(markRead(`${mid}`));
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
          className="row col-7 p-1 mt-2 pe-0 rounded-3"
          style={{
            marginLeft: "auto",
            marginRight: "0",
            backgroundColor: "rgba(0,255,0,.09)",
          }}
        >
          <div className="col-12">
            <div className="col-12 text-end" style={{ fontSize: "9pt" }}>
              {decodedMessage}
            </div>
            <div
              className="col-12 text-end"
              style={{ fontSize: "7pt", color: "rgba(0,0,0,.6)" }}
            >
              {dayjs(message.createdAt).format("DD MMMM, YYYY hh:mm A")}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="row col-7 p-1 mt-2 rounded-3"
          style={{
            marginLeft: "0",
            marginRight: "auto",
            backgroundColor: "rgba(0,0,255,.09)",
          }}
        >
          <div className="col-10">
            <div className="col-12 text-start" style={{ fontSize: "9pt" }}>
              {decodedMessage}
            </div>
            <div
              className="col-12 text-start"
              style={{ fontSize: "7pt", color: "rgba(0,0,0,.6)" }}
            >
              {dayjs(message.createdAt).format("DD MMMM, YYYY hh:mm A")}
            </div>
          </div>
          {/* <div className="col-2">
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ChatHolder;
