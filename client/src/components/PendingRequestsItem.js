/** @format */

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faTimesSquare,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import AcceptRequestButton from "./AcceptRequestButton";
import RejectRequestButton from "./RejectRequestButton";

const PendingRequestsItem = (props) => {
  const dispatch = useDispatch();

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
    <div className="shadow-sm p-2 mb-0 pb-0 mt-1 pt-0 rounded-1 category-header bg-color-grey">
      <div className="category-icon">
        {props.avatar !== null ? (
          <>
            <ProfilePicture
              key={props.firstname}
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

      <div className="text-end category-title m-2" style={{ fontSize: "8pt" }}>
        <Link
          to={{
            pathname: `/private/${props.id}`,
          }}
          className="p-0 m-0 fw-semibold text-dark"
        >
          {props.lastname} {props.firstname}
        </Link>

        <div
          className="p-0 m-0 text-end"
          style={{ fontSize: "9pt", fontWeight: "100" }}
        >
          {props.category + " " + "|" + " " + props.countries}
        </div>
      </div>

      <div className="category-icon">
        <AcceptRequestButton
          key={props.id}
          senderid={props.senderid}
          icon={
            <FontAwesomeIcon className="text-success" icon={faCheckSquare} />
          }
        />
        <RejectRequestButton
          key={props.firstname}
          senderid={props.senderid}
          icon={
            <FontAwesomeIcon className="text-danger" icon={faTimesSquare} />
          }
        />

        {/* <div className="spinnerDimension spinner-border text-primary"></div> */}
      </div>
    </div>
  );
};

export default PendingRequestsItem;
