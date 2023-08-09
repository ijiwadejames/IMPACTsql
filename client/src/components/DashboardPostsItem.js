/** @format */
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostStatusBar from "./PostStatusBar";
import {
  faCheckCircle,
  faUserCircle,
  faUserClock,
  faEdit,
  faEllipsis,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import ProfilePicture from "./ProfilePicture";
import LastCommenterTag from "./LastCommenterTag";
import DeleteButton from "./DeleteButton";
import EditPost from "./EditPost";

const DashboardPostsItem = (props) => {
  const { post, image, postProfile } = props;
  const [triggerDrop, setTriggerDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { profiles } = useSelector((state) => state.profiles);

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
  const getMyImage = profiles[0].Image.avatar;
  const postBaseUrl = getBaseUrl();
  const postImagePath = "/ProfilePictures/";
  const postImageUrl = postBaseUrl + postImagePath + getImage;
  const myImageUrl = postBaseUrl + postImagePath + getMyImage;

  return (
    <div
      className="col-12 shadow-sm p-2 mb-3 bg-color-grey"
      style={{
        borderBottom: "3px solid rgba(0,0,0,.09)",
      }}
    >
      <div className="col-12">
        {post.userID === (user && user.id) ? (
          <div className="border-0 chat-header">
            {profiles &&
              profiles.map((pro) => (
                <>
                  <div className="chat-close">
                    {image !== null ? (
                      <>
                        <ProfilePicture
                          key={pro.id}
                          avatar={myImageUrl}
                          height="40px"
                          width="40px"
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
                    <div className="col-12 text-end">
                      <Link
                        className="text-dark fw-semibold"
                        style={{ fontSize: "10pt" }}
                        to={{
                          pathname: `/private/${post.userID}`,
                        }}
                      >
                        {pro.lastname} {pro.firstname}{" "}
                        <span className="usernameTag">(@{pro.username})</span>
                      </Link>{" "}
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
                    </div>
                    <div
                      className="col-12 text-black"
                      style={{ fontSize: "8pt", fontWeight: "10" }}
                    >
                      <FontAwesomeIcon icon={faUserClock} />{" "}
                      {dayjs(post.createdAt).fromNow() ===
                      "a few seconds ago" ? (
                        <>Just now</>
                      ) : (
                        <>
                          {dayjs(post.createdAt).fromNow() ===
                          "a minute ago" ? (
                            <>1 minute ago</>
                          ) : (
                            dayjs(post.createdAt).fromNow()
                          )}{" "}
                          from {pro.countries}
                        </>
                      )}{" "}
                    </div>
                  </div>
                </>
              ))}
          </div>
        ) : (
          <div className="border-0 chat-header">
            <div className="chat-close">
              {image !== null ? (
                <>
                  <ProfilePicture
                    key={postProfile?.id}
                    avatar={postImageUrl}
                    height="40px"
                    width="40px"
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
                <>
                  <Link
                    className="text-dark fw-semibold"
                    style={{ fontSize: "10pt" }}
                    to={{
                      pathname: `/private/${post.userID}`,
                    }}
                  >
                    {postProfile?.lastname} {postProfile?.firstname}{" "}
                    {postProfile?.role === "Mentor" && (
                      <span
                        className="text-primary"
                        style={{ fontSize: "10pt" }}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                    )}{" "}
                    <span className="usernameTag">
                      (@{postProfile?.username})
                    </span>
                  </Link>
                </>

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
                      from {postProfile?.countries}
                    </>
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        )}

        {edit === true ? (
          <>
            <EditPost key={post.id} post={post} />
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
        <div>
          {triggerDrop === true && (
            <>
              <button
                className="btn-bg border-0 p-0 m-1 font-twelve"
                onClick={() => setEdit(!edit)}
              >
                {edit === false ? (
                  <div className="text-dark">
                    <FontAwesomeIcon icon={faEdit} /> Edit this post
                  </div>
                ) : (
                  <div className="text-danger">
                    <FontAwesomeIcon icon={faEdit} /> Open to editing
                  </div>
                )}
              </button>
              <DeleteButton color="black" key={post.id} post={post} />
              <button
                className="btn-bg border-0 p-0 m-1 font-twelve"
                onClick={() => (setTriggerDrop(!triggerDrop), setEdit(false))}
              >
                {triggerDrop === true && (
                  <div className="text-dark">
                    <FontAwesomeIcon icon={faTimes} /> Close Tab
                  </div>
                )}
              </button>
            </>
          )}
        </div>
        <LastCommenterTag key={post.createdAt} post={post} />
      </div>
      <PostStatusBar key={post.id} post={post} />
    </div>
  );
};

export default memo(DashboardPostsItem);
