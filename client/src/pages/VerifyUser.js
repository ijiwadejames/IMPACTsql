/** @format */

import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../components/features/verifyUser/verifyUserSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VerifyUser = () => {
  
  const { key } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.verifys
  );

  useEffect(() => {
    dispatch(verifyUser(`${key}`));
  }, [key, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="col-5 mt-5 bg-light border-1 shadow m-auto p-3 rounded-1">
      {isSuccess ? (
        <div className="col-12 text-success text-center">
          Your account has been verified!
          <Link to="/" className="m-2 btn-block border-0">
            Proceed to Login
          </Link>
        </div>
      ) : (
        <div className="col-12 text-dark text-center">
          {isError && (
            <>
              {message === "Network Error" ? (
                <>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-danger"
                  />{" "}
                  Check your verification code
                  <Link to="/" className="m-2 btn-block border-0">
                    Home
                  </Link>
                </>
              ) : (
                <>
                  {message}{" "}
                  <Link to="/" className="m-2 btn-block border-0">
                    Home
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
