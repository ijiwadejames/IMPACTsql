/** @format */

import { useEffect } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import Spinner from "./Spinner";
import {
  getMenteesProfile,
  reset,
} from "./features/menteesProfile/menteesProfileSlice";
import { Link } from "react-router-dom";

const SuggestionsHolder = (props) => {
  const { role, profile } = props;
  const { mProfiles, isLoading } = useSelector((state) => state.mProfiles);
  const dispatch = useDispatch();

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const baseUrl = getBaseUrl();
  const avatarPath = "/ProfilePictures/";
  const avatarName = profile.Image.avatar;
  const imageUrl = baseUrl + avatarPath + avatarName;

  //   useEffect(() => {

  //   }, [dispatch]);

  return (
    <>
      {profile.role === role &&
        (profile.countries !== "" ||
          profile.phones !== "" ||
          profile.about !== "" ||
          profile.experience !== "" ||
          profile.category !== "") && (
          <div className="chat-header col-6">
            <div className="chat-title">
              {" "}
              <Link to={`/private/${profile.id}`} className="text-dark">
                {profile.firstname} {profile.lastname}
              </Link>{" "}
              <br />
              <span style={{ color: "rgba(0,0,0,.6)" }}>
                {profile.category + " " + role} from {profile.countries}
              </span>
            </div>
            <div className="chat-close">
              {profile.Image.avatar !== null ? (
                <>
                  <ProfilePicture
                    key={profile.id}
                    avatar={imageUrl}
                    height="30px"
                    width="30px"
                  />
                </>
              ) : (
                <>
                  {profile.Image.avatar === null && (
                    <div className="col-12 text-center">
                      <FontAwesomeIcon
                        style={{ fontSize: "30px", color: "#ffc107" }}
                        icon={faUserCircle}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default SuggestionsHolder;
