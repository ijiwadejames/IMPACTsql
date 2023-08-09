/** @format */

import {
  faPlus,
  faGlobe,
  faPlusSquare,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendConnectionRequest,
  cancelReq,
  reset,
} from "./features/connection/connectionSlice";
import { Link, useNavigate } from "react-router-dom";
import { getMenteesProfile } from "./features/menteesProfile/menteesProfileSlice";

const RequestButton = (props) => {
  const { isSuccess, isLoading } = useSelector((state) => state.connRequests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hId = props.hId;

  useEffect(() => {
    if (isSuccess) {
      dispatch(getMenteesProfile());

      // toast.success("Request Sent")

      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(sendConnectionRequest({ hId }));
  // };

  return (
    <>
      {/* <form onSubmit={onSubmit} key={props.userID}> */}
      <button
        className="border-0 p-0"
        onClick={(e) => dispatch(sendConnectionRequest({ hId }))}
      >
        {isLoading ? (
          <div className="spinnerDimension spinner-border text-primary"></div>
        ) : (
          <>{props.icon}</>
        )}
      </button>
      {/* </form> */}
    </>
  );
};

export default RequestButton;
