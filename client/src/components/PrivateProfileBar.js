/** @format */

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  faMessage,
  faPenFancy,
  faPhone,
  faCheckCircle,
  faUserAlt,
  faArrowAltCircleDown,
  faArrowAltCircleRight,
  faTriangleExclamation,
  faTimesCircle,
  faUserCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ComposeBox from "./ComposeBox";
import ProfilePicture from "./ProfilePicture";
import ChatBoxHead from "./ChatBoxHead";
import {
  readMessage,
  reset,
} from "./features/getChatMessage/getChatMessageSlice";
import { getConnectionProfile } from "./features/connectionProfile/connectionProfileSlice";
import PendingRequestsHolder from "./PendingRequestsHolder";
import { getConnectionList } from "./features/getConnectionRequest/getConnectionRequestSlice";

const PrivateProfileBar = ({ profile }) => {
  const { user } = useSelector((state) => state.auth);
  const [toggleMessageBox, setToggleMessageBox] = useState(false);
  const { conProfiles } = useSelector((state) => state.conProfiles);
  const { pid } = useParams();
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { chatMsgs, isLoading } = useSelector((state) => state.chatMsgs);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = profile.Image.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //fetch profil from database and store in state
    dispatch(getConnectionList());
    dispatch(getConnectionProfile(`${pid}`));
    dispatch(readMessage(`${pid}`));
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, dispatch, navigate]);

  return (
    <div className="col-12 p-3 m-0">
      <div className="hide">
        <div
          className="col-12 border-1 rounded-1 p-3 pb-1 text-light notification shadow-sm"
          style={{
            borderBottom: "1px solid rgba(0,0,0,.2)",
            backgroundColor: "#DA3E10",
          }}
        >
          <div className="col-12 text-center ">
            {conProfiles &&
              conProfiles.map(function (profile) {
                if (profile.Image.avatar !== null) {
                  return (
                    <>
                      <ProfilePicture
                        key={profile.firstname}
                        avatar={imageUrl}
                        height="130px"
                        width="130px"
                      />
                    </>
                  );
                } else {
                  return (
                    <div className="col-12 text-center">
                      <FontAwesomeIcon
                        style={{ fontSize: "40pt", color: "#ffc107" }}
                        className="text-light"
                        icon={faUserCircle}
                      />
                    </div>
                  );
                }
              })}
            {profile.firstname} {profile.lastname}
          </div>
          <div
            className="col-12 text-center p-0 m-0"
            style={{
              color: "rgba(0,0,0,.6)",
              fontSize: "9pt",
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            {profile.category + " " + profile.role}{" "}
            {profile.role === "Mentor" && (
              <span className="text-light" style={{ fontSize: "8pt" }}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="category-header mt-3" style={{ cursor: "pointer" }}>
        <div
          className="category-title"
          onClick={() => navigate(`/my-profile/${pid}`)}
        >
          View Profile
        </div>

        <div className="category-icon">
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>

      {(user && user.id) !== pid && (
        <>
          <ChatBoxHead key={pid} />
        </>
      )}
      <div className="category-header mt-3">
        <div className="category-title">Pending requests</div>
        <div className="category-icon">
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </div>
      </div>
      <PendingRequestsHolder />
    </div>
  );
};

export default PrivateProfileBar;
