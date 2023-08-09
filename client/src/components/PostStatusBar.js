/** @format */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faComment,
  faMinusCircle,
  faPlusCircle,
  faTriangleExclamation,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ReplyHolder from "./ReplyHolder";
import CommentBox from "./CommentBox";
import EditPost from "./EditPost";
import UnlikeButton from "./UnlikeButton";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { postEngagement } from "./features/engagement/engagementSlice";
import he from "he";

const PostStatusBar = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [toggleDiscussion, setToggleDiscussion] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const decodedPost = he.decode(post.post);

  const onSubmit = (pstID) => {
    dispatch(postEngagement({ pstID }));
  };

  return (
    <>
      <div className="status-bar-items">
        <div className="items">
          {post.likedBy?.some((likes) => likes.userID === (user && user.id)) ? (
            <>
              <UnlikeButton key={post.id} post={post} />
            </>
          ) : (
            <>
              <LikeButton key={post.id} post={post} />
            </>
          )}
        </div>
        <div className="items">
          <button className="col-12 border-0 font-twelve">
            {" "}
            {post.Engages && post.Engages.length}{" "}
            <FontAwesomeIcon icon={faChartSimple} />
          </button>
        </div>
        <div className="items">
          <button
            onClick={() => {
              onSubmit(post.id);
              setToggleDiscussion(!toggleDiscussion);
            }}
            className="col-12 border-0 font-twelve"
          >
            {toggleDiscussion === false ? (
              <>
                {post.comment && (
                  <>
                    {post.comment.length >= 100 ? (
                      <>99+</>
                    ) : (
                      <>{post.comment.length}</>
                    )}
                  </>
                )}{" "}
                <FontAwesomeIcon icon={faComment} />             
              </>
            ) : (
              <>
                {post.comment && (
                  <>
                    {post.comment.length >= 100 ? (
                      <>99+</>
                    ) : (
                      <>{post.comment.length}</>
                    )}
                  </>
                )}{" "}
                <FontAwesomeIcon icon={faComment} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-0 m-0">
        {toggleDiscussion && (
          <div className="col-11 mt-3 m-auto">
            <div className="col-12 fw-bold p-0 m-0">Join Discussion</div>
            {/* <div className="text-primary">{decodedPost}</div> */}

            {post.comment && post.comment.length <= 0 ? (
              <div className="text-grey fw-bold text-center">
                <FontAwesomeIcon icon={faTriangleExclamation} /> Be the first to
                comment
              </div>
            ) : (
              <>
                {post.comment &&
                  post.comment.map((comm) => (
                    <>
                      <ReplyHolder key={comm.id} comm={comm} />
                    </>
                  ))}
              </>
            )}

            <div>
              <CommentBox key={post.id} post={post} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostStatusBar;
