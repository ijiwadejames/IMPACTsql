/** @format */

import { Link, useNavigate } from "react-router-dom";
import {
  faInbox,
  faTriangleExclamation,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMessage } from "./features/message/messageSlice";
import { markRead } from "./features/markRead/mrSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Spinner from "./Spinner";

const DMOutBoxItems = ({ message }) => {
  const { messages, isLoading } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mid = message.uniqueID;

  const lastReplyCreatedAt = useMemo(() => {
    // return messages.map((message) => {
    const replies = message?.Replys || [];

    if (!replies.length) {
      return null;
    }

    const lastReply = replies[0];
    return lastReply.createdAt;
    // });
  }, [message]);

  const handleLink = () => {
    navigate(`/read/${mid}`);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {messages && messages.length === 0 ? (
            <div
              className="col-12 text-center alignItem"
              style={{ fontSize: "14pt" }}
            >
              <FontAwesomeIcon icon={faTriangleExclamation} /> No messages to
              show!
            </div>
          ) : (
            <>
              <tbody>
                <>
                  {message.messageSenderID === (user && user.id) && (
                    <>
                      {message.isRead === false && message.status === "outbox" && (
                        <tr
                          style={{
                            fontSize: "9pt",
                          }}
                          className="p-0"
                        >
                          <td className="p-auto">
                            {message.SenderProfile.lastname}{" "}
                            {message.SenderProfile.firstname}
                          </td>
                          <td className="p-auto">
                            <button
                              className="border-0 p-0"
                              style={{ background: "none", fontSize: "9pt" }}
                              onClick={handleLink}
                            >
                              {message.messageSubject.length >= 30
                                ? message.messageSubject.slice(0, 30) + "..."
                                : message.messageSubject}{" "}
                              {/* <FontAwesomeIcon icon={faCheck} /> */}
                            </button>
                          </td>
                          <td className="p-auto" style={{ fontSize: "9pt" }}>
                            {message.Replys.length === 0 ? (
                              <>{dayjs(message.createdAt).fromNow()}</>
                            ) : (
                              <>{dayjs(lastReplyCreatedAt).fromNow()}</>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </>
              </tbody>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DMOutBoxItems;
