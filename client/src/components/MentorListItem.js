/** @format */

import {
  faUserCircle,
  faPlusSquare,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { friends } from "./features/friend/friendSlice";
import ProfilePicture from "./ProfilePicture";
import RequestButton from "./RequestButton";
import CancelRequestButton from "./CancelRequestButton";

const MentorListItem = ({ profile, userCategory }) => {
  const { user } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.mProfiles);
  const { isLoading } = useSelector((state) => state.connRequests);
  const { myFriends } = useSelector((state) => state.myFriends);

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
      {profile.role === "Mentor" && (
        <div className="shadow-sm p-2 mb-0 pb-0 mt-1 pt-0 rounded-1 category-header bg-color-grey">
          <div className="category-icon">
            {profile.Image.avatar !== null ? (
              <>
                <ProfilePicture
                  key={profile.firstname}
                  avatar={imageUrl}
                  height="30px"
                  width="30px"
                />
              </>
            ) : (
              <div className="col-12 text-center">
                <FontAwesomeIcon
                  style={{ fontSize: "18pt", color: "#ffc107" }}
                  icon={faUserCircle}
                />
              </div>
            )}
          </div>

          <div className="text-end category-title m-2">
            <Link
              to={{
                pathname: `/private/${profile.id}`,
              }}
              className="p-0 m-0 fw-semibold text-dark"
            >
              {profile.lastname} {profile.firstname}
            </Link>

            <div
              className="text-end p-0 m-0"
              style={{ fontSize: "9pt", fontWeight: "100" }}
            >
              {profile.category + " " + "|" + " " + profile.countries}
            </div>
          </div>

          <div className="category-icon" style={{ display: "none" }}>
            {profile.PendingRequests?.some(
              (conn) => conn.senderID === (user && user.id)
            ) ? (
              <>
                <CancelRequestButton
                  key={profile.id}
                  icon={
                    <FontAwesomeIcon
                      icon={faTimesSquare}
                      className="text-danger"
                    />
                  }
                  profileID={profile.id}
                  // onSubmit={onSubmit()}
                />
              </>
            ) : (
              <>
                <RequestButton
                  key={profile.userID}
                  icon={
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-success"
                    />
                  }
                  profileID={profile.id}
                  // onSubmit={onSubmit()}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MentorListItem;
