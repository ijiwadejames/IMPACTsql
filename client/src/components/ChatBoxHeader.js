/** @format */

import { memo } from "react";
import ProfilePicture from "./ProfilePicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ChatBoxHeader = (props) => {
  const { profile } = props;
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

  return (
    <>
      <div className="chat-header">
        <div className="chat-title me-1">
          {profile.lastname + " " + profile.firstname}
        </div>
        <div className="chat-close">
          {profile.Image.avatar !== null ? (
            <>
              <ProfilePicture
                key={profile.firstname}
                avatar={imageUrl}
                height="25px"
                width="25px"
              />
            </>
          ) : (
            <>
              {profile.Image.avatar === null && profile.gender === "Male" ? (
                <div className="col-12 text-center">
                  <FontAwesomeIcon
                    style={{ fontSize: "25px" }}
                    className="text-light"
                    icon={faUserCircle}
                  />
                </div>
              ) : (
                <div className="col-12 text-center">
                  <FontAwesomeIcon
                    style={{ fontSize: "25px" }}
                    className="text-light"
                    icon={faUserCircle}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ChatBoxHeader);
