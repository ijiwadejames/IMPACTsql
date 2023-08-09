/** @format */

import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../components/features/verifyUser/verifyUserSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className="col-5 mt-5 bg-light text-center border-1 shadow m-auto p-3 rounded-1">
      <div className="p-2" style={{ fontSize: "9pt" }}>
        Thank you for registering on the IMPACT Academy Mentorship Hub.
        <br />A verification link has been sent to your email.
      </div>
      <button className="btn btn-sm btn-block p-1" onClick={redirect}>
        Go Home
      </button>
    </div>
  );
};

export default RegistrationSuccess;
