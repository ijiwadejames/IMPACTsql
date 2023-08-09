import dayjs from "dayjs";
import { useSelector } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import he from "he";

const MessageRepliesHandler = ({ reply }) => {
  const { user } = useSelector((state) => state.auth);
  dayjs.extend(relativeTime);
  const decodedReply = he.decode(reply.replyBody);
  
  return (
    <div className="col-12">
      {reply.responderID === user.id ? (
        <div
          className="col-6 text-end p-1"
          style={{
            marginLeft: "auto",
            marginRight: "0",
          }}
        >
          <div className="messageHandlerRes p-0 rounded-2 shadow-sm">
            <div className="text-primary p-0">
              {reply.RespondersProfile.lastname}{" "}
              {reply.RespondersProfile.firstname}{" "}
              {reply.RespondersProfile.othernames}{" "}
            </div>{" "}
            <span style={{ fontSize: "9pt" }} className="p-0">
              {" "}
              {decodedReply}
            </span>
          </div>
          <span style={{ color: "rgba(0,0,0,.4)", fontSize: "8pt" }}>
            {/* {reply.RespondersProfile.username}  */}
            replied {dayjs(reply.createdAt).fromNow() === "a few seconds ago" ? <>Just now</> : <>{dayjs(reply.createdAt).fromNow() === "a minute ago" ? <>1 minute ago</> : dayjs(reply.createdAt).fromNow()}</>}
          </span>
        </div>
      ) : (
        <div className="col-6 text-start p-1">
          <div className="messageHandler p-0 rounded-2 shadow-sm">
            <div className="text-primary p-0">
              {reply.RespondersProfile.lastname}{" "}
              {reply.RespondersProfile.firstname}{" "}
              {reply.RespondersProfile.othernames}{" "}
            </div>{" "}
            <span style={{ fontSize: "9pt" }} className="p-0">
              {" "}
              {reply.replyBody}
            </span>
          </div>
          <span style={{ color: "rgba(0,0,0,.4)", fontSize: "8pt" }}>
            {" "}
            {/* {reply.RespondersProfile.username}  */}
            replyed {dayjs(reply.createdAt).fromNow() === "a few seconds ago" ? <>Just now</> : <>{dayjs(reply.createdAt).fromNow() === "a minute ago" ? <>1 minute ago</> : dayjs(reply.createdAt).fromNow()}</>}
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageRepliesHandler;
