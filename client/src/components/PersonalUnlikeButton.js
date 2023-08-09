/** @format */

import { useState, useEffect } from "react";
import { unlike, reset } from "./features/unlikeReaction/unlikeSlice";
import { getPosts } from "./features/posts/postSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
// import { getConnectionProfile } from "./features/connectionProfile/connectionProfileSlice";
import { getPersonalPosts } from "./features/posts/postSlice";
import { friendsBtn } from "./features/createConnDisconnBtns/friendSlice";

const UnlikeButton = ({ post }) => {
  const [delPstId, setDelPstId] = useState("");
  const { isSuccess } = useSelector((state) => state.unlikes);
  const dispatch = useDispatch();
  const { pid } = useParams();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPersonalPosts(`${pid}`));
      // dispatch(getConnectionProfile(`${pid}`));
      dispatch(friendsBtn(`${pid}`));
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(unlike({ delPstId }));
  };

  return (
    <form onSubmit={onSubmit} className="col-12">
      <button
        className="col-12 p-1 border-0 m-1 font-twelve"
        onClick={(e) => setDelPstId(post.id)}
      >
        {post.likedBy && <>{post.likedBy.length}</>}{" "}
        <FontAwesomeIcon icon={faHeartBroken} />
      </button>
    </form>
  );
};

export default UnlikeButton;
