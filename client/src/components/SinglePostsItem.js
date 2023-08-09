/** @format */
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SinglePostStatusBar from "./SinglePostStatusBar";
import {
  faCheckCircle,
  faUserCircle,
  faUserClock,
  faEdit,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import ProfilePicture from "./ProfilePicture";
import LastCommenterTag from "./LastCommenterTag";
import SingleDeleteButton from "./SingleDeleteButton";
import SingleEditPost from "./SingleEditPost";

const SinglePostsItem = (props) => {
  const { post, image, profile } = props;
  const [triggerDrop, setTriggerDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);

  dayjs.extend(relativeTime);
  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const port = window.location.port;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const baseUrl = getBaseUrl();
  const imagePath = "/PostImages/";
  const imageUrl = baseUrl + imagePath + post.avatar;
  const decodedText = he.decode(post.post);

  const getImage = image;
  const postBaseUrl = getBaseUrl();
  const postImagePath = "/ProfilePictures/";
  const postImageUrl = postBaseUrl + postImagePath + getImage;

  return (
    <div
      className="col-12 shadow-sm p-1 mb-2 bg-color-grey"
      style={{
        borderBottom: "3px solid rgba(0,0,0,.09)",
      }}
    >
      <div className="col-12">
        <div className="border-0 chat-header">
          <div className="chat-close">
            {image !== null ? (
              <>
                <ProfilePicture
                  key={profile?.id}
                  avatar={postImageUrl}
                  height="25px"
                  width="25px"
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
          <div className="chat-title text-start">
            <div className="col-12 color">
              <Link
                className="text-dark fw-semibold"
                style={{ fontSize: "10pt" }}
                to={{
                  pathname: `/private/${post.userID}`,
                }}
              >
                <>
                  {profile?.lastname} {profile?.firstname}{" "}
                  {profile?.role === "Mentor" && (
                    <span className="text-primary" style={{ fontSize: "10pt" }}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  )}{" "}
                  <span className="usernameTag">(@{profile?.username})</span>
                </>
              </Link>{" "}
              {post.userID === (user && user.id) && (
                <>
                  <button
                    className="border-0 p-0 m-0 bg-white fw-semibold"
                    onClick={() => setTriggerDrop(!triggerDrop)}
                  >
                    {triggerDrop === false ? (
                      <>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </>
                    )}
                  </button>
                </>
              )}
              {triggerDrop === true && (
                <div className="dropButton">
                  <div className="menu">
                    <div claassName="items">
                      <button
                        className="btn-bg border-0 p-0 m-1 font-twelve"
                        onClick={() => setEdit(!edit)}
                      >
                        {edit === false ? (
                          <>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </>
                        )}
                      </button>
                    </div>
                    <div claassName="items font-twelve">
                      <SingleDeleteButton key={post.id} post={post} />
                    </div>
                  </div>
                </div>
              )}
              <div
                className="col-12 text-black"
                style={{ fontSize: "8pt", fontWeight: "10" }}
              >
                <FontAwesomeIcon icon={faUserClock} />{" "}
                {dayjs(post.createdAt).fromNow() === "a few seconds ago" ? (
                  <>Just now</>
                ) : (
                  <>
                    {dayjs(post.createdAt).fromNow() === "a minute ago" ? (
                      <>1 minute ago</>
                    ) : (
                      dayjs(post.createdAt).fromNow()
                    )}{" "}
                    from {profile?.countries}
                  </>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
        {edit === true ? (
          <>
            <SingleEditPost key={post.id} post={post} />
          </>
        ) : (
          <div
            className="col-12 p-1 mt-2 mb-2 rounded-1"
            style={{
              backgroundColor: "rgba(0,0,0,.03)",
              borderLeft: "2px solid rgba(255, 0,0,.1)",
            }}
          >
            <div className="col-12">{decodedText}</div>
            {post.avatar && (
              <img
                src={imageUrl}
                className="img-fluid"
                style={{ maxHeight: "50vh" }}
              />
            )}

            {/* {post.post.length >= 200
              ? post.post.slice(0, 200) + "..."
              : post.post} */}
          </div>
        )}

        <LastCommenterTag key={post.createdAt} post={post} />
      </div>
      <SinglePostStatusBar key={post.id} post={post} />
    </div>
  );
};

export default memo(SinglePostsItem);
