/** @format */

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCheckCircle,
  faArrowAltCircleDown,
  faArrowAltCircleRight,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getConnectionList,
  reset,
} from "./features/getConnectionRequest/getConnectionRequestSlice";
import { friends } from "./features/friend/friendSlice";
import ProfilePicture from "./ProfilePicture";
import PendingRequestsHolder from "./PendingRequestsHolder";
import dayjs from "dayjs";

const ProfileBar = ({ profile }) => {
  const { user } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } else {
      dispatch(getConnectionList());
      dispatch(friends());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate]);

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
          <div className="col-12 text-center">
            {profile.role === "Mentor" ? (
              <>
                {profiles &&
                  profiles.map(function (profile) {
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
                <span style={{ fontSize: "15pt" }}> Welcome,</span> <br />
                <span style={{ fontSize: "13pt" }}>
                  {profile.firstname + " " + profile.lastname}
                </span>{" "}
                <span className="text-light" style={{ fontSize: "10pt" }}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              </>
            ) : (
              <>
                {profiles &&
                  profiles.map(function (profile) {
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
                    } else if (
                      profile.Image.avatar === null &&
                      profile.gender === "Male"
                    ) {
                      return (
                        <div className="col-12 text-center">
                          <FontAwesomeIcon
                            style={{ fontSize: "40pt" }}
                            className="text-light"
                            icon={faUserCircle}
                          />
                        </div>
                      );
                    } else if (
                      profile.Image.avatar === null &&
                      profile.gender === "Female"
                    ) {
                      return (
                        <div className="col-12 text-center">
                          <FontAwesomeIcon
                            style={{ fontSize: "40pt" }}
                            className="text-light"
                            icon={faUserCircle}
                          />
                        </div>
                      );
                    }
                  })}
                <span style={{ fontSize: "15pt" }}> Welcome,</span>
                <br />
                <span style={{ fontSize: "13pt" }}>
                  {profile.firstname + " " + profile.lastname}
                </span>
              </>
            )}
          </div>
          <div
            className="text-center p-0 m-0"
            style={{
              color: "rgba(0,0,0,.6)",
              fontSize: "10pt",
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            {profile.category + " " + profile.role}{" "}
          </div>
        </div>
      </div>
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

export default ProfileBar;
