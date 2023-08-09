/** @format */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { markRead } from "./features/markRead/mrSlice";
import { getMessage } from "./features/message/messageSlice";
import MessageDeleteButton from "./MessageDeleteButton";

const TitleLinkHolder = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mid = message.uniqueID;
  dayjs.extend(relativeTime);

  const handleSubmit = () => {
    dispatch(markRead({ mid }));
    dispatch(getMessage());
    navigate(
      `/chatBox/${
        message.messageSenderID === (user && user.id)
          ? message.messageReceiverID
          : message.messageReceiverID === (user && user.id) &&
            message.messageSenderID
      }`
    );
  };

  const handleLink = () => {
    navigate(
      `/chatBox/${
        message.messageSenderID === (user && user.id)
          ? message.messageReceiverID
          : message.messageReceiverID === (user && user.id) &&
            message.messageSenderID
      }`
    );
  };

  return (
    <>
      {message.isViewed === false &&
      message.messageSenderID !== (user && user.id) ? (
        <div
          className="category-header bg-light col-12 text-primary p-0"
          style={{
            fontSize: "9pt",
            cursor: "pointer",
            backgroundColor: "rgba(0,0,255,.1)",
            fontWeight: "530",
          }}
        >
          <div className="col-8" onClick={handleSubmit}>
            {message.messageSenderID === (user && user.id) ? (
              <>
                <span
                  className="fw-semibold text-dark ps-1"
                  style={{ borderLeft: "2px solid green" }}
                >
                  {message.ReceiverProfile?.lastname}{" "}
                  {message.ReceiverProfile?.firstname}{" "}
                  <span style={{ fontStyle: "italic" }}>(You)</span>
                </span>
              </>
            ) : (
              <span
                className="fw-semibold text-dark ps-1"
                style={{ borderLeft: "2px solid red" }}
              >
                {message.SenderProfile.lastname}{" "}
                {message.SenderProfile.firstname}
              </span>
            )}
            :{" "}
            {message.messageBody.length >= 30 ? (
              <>{message.messageBody.slice(0, 30) + "..."}</>
            ) : (
              <>{message.messageBody}</>
            )}
          </div>
          <div className="col-3">
            {dayjs(message.createdAt).fromNow() === "a few seconds ago" ? (
              <>Just now</>
            ) : (
              <>
                {dayjs(message.createdAt).fromNow() === "a minute ago" ? (
                  <>1 minute ago</>
                ) : (
                  dayjs(message.createdAt).fromNow()
                )}
              </>
            )}
          </div>
          <div className="col-1 text-end">
            <MessageDeleteButton message={message} key={message.id} />
          </div>
        </div>
      ) : (
        <div
          className="category-header bg-light col-12 text-primary p-0"
          style={{ fontSize: "9pt", cursor: "pointer" }}
        >
          <div className="col-8" onClick={handleLink}>
            {message.messageSenderID === (user && user.id) ? (
              <span
                className="fw-semibold text-dark ps-1"
                style={{ borderLeft: "2px solid green" }}
              >
                {message.ReceiverProfile?.lastname}{" "}
                {message.ReceiverProfile?.firstname}{" "}
                <span style={{ fontStyle: "italic" }}>(You)</span>
              </span>
            ) : (
              <span
                className="fw-semibold text-dark ps-1"
                style={{ borderLeft: "2px solid red" }}
              >
                {message.SenderProfile.lastname}{" "}
                {message.SenderProfile.firstname}
              </span>
            )}
            :{" "}
            {message.messageBody.length >= 30 ? (
              <>{message.messageBody.slice(0, 30) + "..."}</>
            ) : (
              <>{message.messageBody}</>
            )}
          </div>
          <div className="col-3">
            {dayjs(message.createdAt).fromNow() === "a few seconds ago" ? (
              <>Just now</>
            ) : (
              <>
                {dayjs(message.createdAt).fromNow() === "a minute ago" ? (
                  <>1 minute ago</>
                ) : (
                  dayjs(message.createdAt).fromNow()
                )}
              </>
            )}
          </div>
          <div className="col-1 text-end">
            <MessageDeleteButton
              message={message}
              key={message.messageSenderID}
            />
          </div>
        </div>
      )}
      {/* </Link> */}
    </>
  );
};

export default TitleLinkHolder;
