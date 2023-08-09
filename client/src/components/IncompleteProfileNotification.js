/** @format */

import { Link } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const IncompleteProfileNotification = () => {
  const { profiles } = useSelector((state) => state.profiles);

  return (
    <>
      {profiles &&
        profiles.map(function (profile) {
          if (
            profile.countries === "" ||
            profile.phones === "" ||
            profile.about === "" ||
            profile.experience === "" ||
            profile.category === ""
          ) {
            return (
              <div className="col-12 notmsg mt-3" key={profile.id}>
                <div className="notSpinnerDimension spinner-grow" role="status">
                  <span className="sr-only">Loading...</span>
                </div>{" "}
                <FontAwesomeIcon icon={faTriangleExclamation} /> Dear{" "}
                {profile.firstname}, click{" "}
                <Link to="/profile" className="text-danger">
                  HERE
                </Link>{" "}
                to complete
              </div>
            );
          }
        })}
    </>
  );
};

export default IncompleteProfileNotification;
