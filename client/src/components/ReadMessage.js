/** @format */

import { Link } from "react-router-dom";
import { faInbox, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessageReplyBox from "./MessageReplyBox";
import MessageRepliesHandler from "./MessageRepliesHandler";
import he from "he";

const ReadMessage = ({ message }) => {
  dayjs.extend(relativeTime);
  const decodedMessage = he.decode(message.messageBody);

  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-12 mt-4">
      <div className="row p-0 m-0">
        <Link
          to="/inbox"
          className="col-md-2 mt-3 btn btn-white text-dark border bg-light rounded-0 p-2 shadow-sm fw-bold me-2"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faInbox} /> Inbox
        </Link>
      </div>

      <div className="col-md-12 bg-dark text-white border rounded-0 p-3">
        <div className="col-12 fw-bold">
          <h3>DM Box</h3>
        </div>
      </div>
      <div className="col-12 bg-white shadow border rounded-1 p-3 text-dark">
        <span className="text-primary">Received from </span>
        <span className="fw-semibold">
          {message.SenderProfile.lastname} {message.SenderProfile.firstname}{" "}
        </span>
        <span className="col-12">
          <FontAwesomeIcon icon={faClock} />{" "}
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
          )}{" "}
        </span>

        <div
          className="col-12 rounded-3 p-2"
          style={{ backgroundColor: "rgba(255,0,0,.09)" }}
        >
          {decodedMessage}
        </div>
        {message.Replys &&
          message.Replys.map((reply) => (
            <MessageRepliesHandler key={reply.id} reply={reply} />
          ))}
        <MessageReplyBox key={message.uniqueID} message={message} />
      </div>
    </div>
  );
};

export default ReadMessage;
