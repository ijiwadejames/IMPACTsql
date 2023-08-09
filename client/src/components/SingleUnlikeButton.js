/** @format */

import { useState, useEffect } from "react";
import { unlike, reset } from "./features/unlikeReaction/unlikeSlice";
import { singlePost } from "../components/features/singlePost/singlePostSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";

const UnlikeButton = ({ post }) => {
  const [delPstId, setDelPstId] = useState("");
  const { isSuccess } = useSelector((state) => state.unlikes);
  const dispatch = useDispatch();
  const {pstId} = useParams();
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(singlePost(`${pstId}`)); 

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
        className="col-12 border-0 m-1 font-twelve"
        onClick={(e) => setDelPstId(post.id)}
      >
        {post.likedBy && <>{post.likedBy.length}</>}{" "}
        <FontAwesomeIcon icon={faHeartBroken} />
      </button>
    </form>
  );
};

export default UnlikeButton;
