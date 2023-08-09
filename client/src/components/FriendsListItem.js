/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "./Button";
import ProfilePicture from "./ProfilePicture";
import { faCheckCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FriendsListItem = (props) => {
  dayjs.extend(relativeTime);

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = props.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  return (
    <>
      {props.role === "Mentee" && (
        <div className="bg-white border-0 category-header">
          <div className="category-icon">
            {props.avatar !== null ? (
              <>
                <ProfilePicture
                  key={props.id}
                  avatar={imageUrl}
                  height="25px"
                  width="25px"
                />
              </>
            ) : (
              <>
                {props.avatar === null && props.gender === "Male" ? (
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
                pathname: `/private/${props.id}`,
              }}
              style={{ fontWeight: "500" }}
            >
              {props.lastname} {props.firstname}
            </Link>
          </div>
          <div className="category-icon">
            {/* friends since {dayjs(props.date).fromNow()} */}

            <Button
              key={props.id}
              firstname={props.firstname}
              lastname={props.lastname}
              othernames={props.othernames}
              id={props.id}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsListItem;
