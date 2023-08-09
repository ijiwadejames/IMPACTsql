import {
  faPlus,
  faGlobe,
  faPlusSquare,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelReq, reset } from "./features/cancelConnection/connectionSlice";
import { Link, useNavigate } from "react-router-dom";
import { getMenteesProfile } from "./features/menteesProfile/menteesProfileSlice";

const CancelRequestButton = (props) => {
  const { isSuccess, isLoading } = useSelector((state) => state.cancelReqs);
  const [cId, setCId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getMenteesProfile());
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(cancelReq({ cId }));
  // };

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <button
        className="border-0 p-0"
        // onClick={(e) => setCId(props.profileID)}
        onClick={() => dispatch(cancelReq(props.profileID))}
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

export default CancelRequestButton;
