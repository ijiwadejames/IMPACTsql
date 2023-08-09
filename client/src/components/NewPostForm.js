import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "./features/posts/postSlice";
import UploadImageButton from "./UploadImageButton";

const NewPostForm = () => {
  const [pst, setPst] = useState("");
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("pst", pst);

    dispatch(createPost(formData));
    setPst("");
    dispatch(getPosts());
  };

  return (
    <div className="col-12 mt-1 mb-1">
      <div className="form col-12 mb-0">
        <form onSubmit={onSubmit}>
          <div
            className="form-group col-auto p-0 m-0"
            style={{
              display: "inline",
              marginLeft: "auto",
              marginRight: "0",
              fontSize: "10pt",
            }}
          >
            <input
              type="file"
              className="m-0 text-light border-0 pb-1"
              style={{ backgroundColor: "rgba(0,0,0,.2)" }}
              onChange={(e) => setAvatar(e.target.files[0])}
            ></input>
          </div>

          <div className="form-group mb-0 pb-1">
            <input
              type="text"
              id="pst"
              name="pst"
              value={pst}
              placeholder="photo description"
              onChange={(e) => setPst(e.target.value)}
              className="col-12 m-0"
              style={{ backgroundColor: "rgba(0,0,0,.2)" }}
            ></input>
          </div>

          <div className="form-group">
            <button
              className="col-auto btn btn-sm rounded-1 p-1"
              type="submit"
              style={{
                marginLeft: "auto",
                marginRight: "0",
              }}
            >
              Add Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
