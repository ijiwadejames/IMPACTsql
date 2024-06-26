/** @format */
import { useEffect, useState } from "react";
import { deletePost, reset } from "./features/delPosts/delPostSlice";
import { useParams } from "react-router-dom";
import { getPersonalPosts } from "./features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const PersonalDeleteButton = (props) => {
  const { post, color } = props;

  const { isSuccess, isLoading } = useSelector((state) => state.delPosts);
  const [togglePostDelete, setTogglePostDelete] = useState(false);
  const { pid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPersonalPosts(`${pid}`));
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);
  return (
    <>
      <button
        className="btn-bg border-0 p-0 m-1 font-twelve"
        onClick={() => setTogglePostDelete(!togglePostDelete)}
        style={{ color: color }}
      >
        {togglePostDelete === true ? (
          <>
            {isLoading ? (
              <>please wait...</>
            ) : (
              <>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete post
              </>
            )}
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete post
          </>
        )}
      </button>
      {togglePostDelete === true && (
        <div className="messageBoxContainer">
          <div
            className="col-3 text-dark p-0 pb-2 shadow-sm bg-light rounded-2"
            style={{
              border: "1px solid white",
              // backgroundColor: "rgba(255, 255, 255, .5)",
            }}
          >
            <div className="col-12 bg-dark text-light p-1 rounded-2">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Confirm
            </div>
            <div className="col-12 text-center text-dark mb-1 p-2">
              Do you really want to delete this post?
            </div>
            <div className="row col-7 p-auto m-auto">
              <button
                className="col-5 inline bg-dark btn btn-sm p-0 border-0"
                onClick={() => {
                  dispatch(deletePost(post.id));
                  setTogglePostDelete(false);
                }}
              >
                Yes
              </button>
              <button
                className="col-5 inline bg-primary btn btn-sm ms-2 p-0 border-0"
                style={{ display: "inline" }}
                onClick={() => setTogglePostDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalDeleteButton;
