/** @format */

import { useState, useEffect } from "react";
import { likes, reset } from "./features/reaction/reactionSlice";
import { getPosts } from "./features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ post }) => {
  const { isSuccess } = useSelector((state) => state.reacts);
  const [pstId, setPstId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPosts());

      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(likes({ pstId }));
  };

  return (
    <form onSubmit={onSubmit} className="col-12">
      <button
        className="col-12 border-0 m-1 font-twelve"
        onClick={(e) => setPstId(post.id)}
      >
        {post.likedBy && <>{post.likedBy.length}</>}{" "}
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </form>
  );
};

export default LikeButton;
