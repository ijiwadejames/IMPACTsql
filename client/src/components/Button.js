/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCon, reset } from "./features/removeCon/removeConSlice";
import { friends } from "./features/friend/friendSlice";
import { getMenteesProfile } from "./features/menteesProfile/menteesProfileSlice";

import {
  faTriangleExclamation,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "./Spinner";

const Button = (props) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.removeCons);
  const { profiles } = useSelector((state) => state.profiles);

  const [toggleAlertBox, setToggleAlertBox] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      //fetch from DB
      dispatch(friends());
      dispatch(getMenteesProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div
      style={{ color: "rgba(0,0,0,.3)" }}
      onClick={() => setToggleAlertBox(!toggleAlertBox)}
    >
      <span>
        {" "}
        {toggleAlertBox === true ? (
          <>
            <FontAwesomeIcon icon={faTrashAlt} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faTrashAlt} />
          </>
        )}
      </span>

      {toggleAlertBox && (
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
              {profiles &&
                profiles.map((profile) => <strong>{profile.firstname}</strong>)}
              , do you really want to disconnect from{" "}
              <strong>{props.lastname + " " + props.firstname}</strong>?
            </div>
            <div className="row col-7 p-auto m-auto">
              <button
                className="col-5 inline bg-danger btn btn-sm p-0 border-0"
                onClick={() => {
                  dispatch(removeCon(props.id));
                  setToggleAlertBox(false);
                }}
              >
                Yes
              </button>
              <button
                className="col-5 inline bg-success btn btn-sm ms-2 p-0 border-0"
                style={{ display: "inline" }}
                onClick={() => setToggleAlertBox(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
