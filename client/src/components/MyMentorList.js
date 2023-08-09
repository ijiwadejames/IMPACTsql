/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import { faCheckCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyMentorList = (props) => {
  const {
    avatar,
    firstname,
    lastname,
    othernames,
    role,
    gender,
    date,
    id,
  } = props;
  dayjs.extend(relativeTime);

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  return (
    <div>
      {role === "Mentor" && (
        <div className="bg-white border-0 category-header">
          <div className="category-icon">
            {avatar !== null ? (
              <>
                <ProfilePicture
                  key={id}
                  avatar={imageUrl}
                  height="25px"
                  width="25px"
                />
              </>
            ) : (
              <>
                {avatar === null && gender === "Male" ? (
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
          </div>
          <div className="category-title text-start col-10">
            <Link
              to={{
                pathname: `/private/${id}`,
              }}
            >
              {lastname} {firstname}{" "}
              <FontAwesomeIcon
                className="text-primary"
                style={{ fontSize: "8px" }}
                icon={faCheckCircle}
              />
            </Link>
          </div>
          <div className="category-icon">
            {/* friends since {dayjs(date).fromNow()} */}

            <Button
              key={id}
              firstname={firstname}
              lastname={lastname}
              othernames={othernames}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMentorList;
