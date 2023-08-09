/** @format */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfilePicture } from "./features/profilePicture/profilePictureSlice";
import { getProfile, reset } from "./features/profile/profileSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCameraAlt,
} from "@fortawesome/free-solid-svg-icons";

const UploadButton = () => {
  const [avatar, setAvatar] = useState();
  const [toggleUploadButton, setToggleUploadButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.profilePics);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProfile());

      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const handleImage = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);

    dispatch(updateProfilePicture(formData));
    setToggleUploadButton(false);
  };

  return (
    <>
      <button
        className="rounded-0 bg-dark text-light fw-semibold border-0 p-1 m-1"
        onClick={() => setToggleUploadButton(!toggleUploadButton)}
      >
        {toggleUploadButton === true ? (
          <>...in progress</>
        ) : (
          <>
            <FontAwesomeIcon icon={faCameraAlt} />{" "}
            {isLoading ? <i>this may take a few secs...</i> : <>Add Picture</>}
          </>
        )}
      </button>
      {toggleUploadButton && (
        <div className="messageBoxContainer">
          <div
            className="col-xs-10 col-sm-6 col-md-6 col-lg-3 bg-light text-dark rounded-2 shadow-sm"
            style={{ fontSize: "9pt" }}
          >
            <div className="col-12 bg-dark text-light p-1 rounded-2">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Select Image
            </div>
            <div className="col-12 text-light p-2">
              <form className="bg-light" onSubmit={handleImage}>
                <input
                  // filename={file}
                  onChange={(e) => setAvatar(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  className="p-1 text-dark col-12"
                  style={{ backgroundColor: "rgba(0,0,0,.1)" }}
                ></input>
                <div className="row col-12 mt-1 m-auto p-auto">
                  <button className="col-auto btn bg-primary p-1 border-0">
                    Upload
                  </button>
                  <button
                    className="col-auto btn bg-danger p-1 ms-1 border-0"
                    onClick={() => setToggleUploadButton(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadButton;
