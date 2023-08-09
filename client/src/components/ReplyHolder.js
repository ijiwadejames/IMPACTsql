/** @format */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheckCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import he from "he";

const ReplyHolder = ({ comm }) => {
  const dispatch = useDispatch();
  const decodedReply = he.decode(comm.reply);
  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = comm.Image.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}>
      <div className="text-dark bg-light rounded-2 p-1 m-1" key={comm.id}>
        <div className="col-12">
          <Link
            to={{
              pathname: `/private/${comm.CommenterProfile.id}`,
            }}
            className=""
          >
            <div className="row col-10 p-1 ps-2">
              <div className="col-auto p-0 m-0">
                {comm.Image.avatar !== null ? (
                  <>
                    <ProfilePicture
                      key={comm.CommenterProfile.firstname}
                      avatar={imageUrl}
                      height="30px"
                      width="30px"
                    />
                  </>
                ) : (
                  <>
                    {comm.Image.avatar === null &&
                    comm.CommenterProfile.gender === "Male" ? (
                      <>
                        <div className="col-12 text-center">
                          <FontAwesomeIcon
                            style={{ fontSize: "20pt" }}
                            className="text-success"
                            icon={faUserCircle}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-12 text-center">
                          <FontAwesomeIcon
                            style={{ fontSize: "20pt" }}
                            className="text-primary"
                            icon={faUserCircle}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                {/* <ProfilePicture
                  avatar={imageUrl}
                  key={comm.CommenterProfile.firstname}
                  height="20px"
                  width="20px"
                />{" "} */}
              </div>
              <div className="col-auto m-0 ps-2" style={{ fontSize: "8pt" }}>
                {comm.CommenterProfile.lastname}{" "}
                {comm.CommenterProfile.firstname}
                {comm.CommenterProfile.role === "Mentor" && (
                  <span className="text-primary" style={{ fontSize: "8pt" }}>
                    {" "}
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div
          className="col-12 p-1"
          style={{
            backgroundColor: "rgba(0,0,0,.03)",
            fontSize: "8pt",
            borderLeft: "5px solid rgba(255, 0,0,.1)",
          }}
        >
          {decodedReply}
        </div>

        <div
          className="col-12"
          style={{ color: "rgba(0,0,0, .8)", fontSize: "7pt" }}
        >
          <FontAwesomeIcon icon={faClock} /> {comm.CommenterProfile.username}{" "}
          replied{" "}
          {dayjs(comm.createdAt).fromNow() === "a few seconds ago" ? (
            <>Just now</>
          ) : (
            <>
              {dayjs(comm.createdAt).fromNow() === "a minute ago" ? (
                <>1 minute ago</>
              ) : (
                dayjs(comm.createdAt).fromNow()
              )}
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ReplyHolder;
