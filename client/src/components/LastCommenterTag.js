/** @format */

import dayjs from "dayjs";
import {useSelector} from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import { faCheckCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "./ProfilePicture";

const LastCommenterTag = (props) => {
  const { post } = props;
  dayjs.extend(relativeTime);
  const {user} = useSelector((state) => state.auth);

  return (
    <div
      className="col-auto rounded-3"
      style={{
        fontSize: "9pt",
        color: "rgba(0,0,0,.8)",
        backgroundColor: "rgba(255,0,0,0.08)",
        padding: "4px",
        fontWeight: "500",
      }}
    >
      {post && post.comment && post.comment.length > 0 ? (
        <>
          {post.comment[post.comment.length - 1].CommenterProfile.userID === (user && user.id) ? 
          <>You</> : <>{post.comment[post.comment.length - 1].CommenterProfile.firstname}</>}
          {post.comment[post.comment.length - 1].CommenterProfile.role ===
            "Mentor" && (
            <span className="text-primary" style={{ fontSize: "7pt" }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          )}{" "}
          last replied to this post{" "}
          {dayjs(post.comment[post.comment.length - 1].createdAt).fromNow() ===
          "a few seconds ago" ? (
            <>Just now</>
          ) : (
            <>
              {dayjs(
                post.comment[post.comment.length - 1].createdAt
              ).fromNow() === "a minute ago" ? (
                <>1 minute ago</>
              ) : (
                dayjs(post.comment[post.comment.length - 1].createdAt).fromNow()
              )}
            </>
          )}
        </>
      ) : (
        <div>Be the first to comment</div>
      )}
    </div>
  );
};

export default LastCommenterTag;
