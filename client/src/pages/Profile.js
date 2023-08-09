/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileBar from "../components/ProfileBar";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEdit,
  faCamera,
  faCameraAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import UpdateProfessionalProfileForm from "../components/UpdateProfessionalProfileForm";
import UpdatePersonalProfileForm from "../components/UpdatePersonalProfileForm";
import { getProfile, reset } from "../components/features/profile/profileSlice";
import LeftBar from "../components/LeftBar";
import UploadButton from "../components/UploadButton";
import ProfessionalProfileItem from "../components/ProfessionalProfileItem";
import PersonalProfileItem from "../components/PersonalProfileItem";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const Profile = () => {
  const [toggleProfessionalProfile, setToggleProfessionalProfile] = useState(
    false
  );
  const [togglePersonalProfile, setTogglePersonalProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profiles, isLoading, isError, message } = useSelector(
    (state) => state.profiles
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getMessage());
    //fetch profile from database and store in state
    dispatch(getProfile());
    dispatch(getNotification());
    dispatch(countNotification());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12">
          <Menu />
        </div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3">
            <div className="row">
              <h4>Current Profile</h4>
              <UploadButton />
              <div className="col-8 borderBottom">
                {togglePersonalProfile === false ? (
                  <>
                    <button
                      className="border-0  text-dark p-1 rounded-1 fw-semibold"
                      onClick={() => setTogglePersonalProfile(true)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Personal Profile{" "}
                      <FontAwesomeIcon className="text-success" icon={faPlus} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border-0 text-dark p-1 rounded-1 fw-semibold"
                      onClick={() => setTogglePersonalProfile(false)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      ...editing{" "}
                      {/* <FontAwesomeIcon className="text-danger" icon={faMinus} /> */}
                    </button>
                    <div className="col-12 messageBoxContainer">
                      <div className="col-xs-10 col-sm-6 col-md-6 col-lg-3 bg-light pt-0 rounded-2">
                        <div className="category-header col-12 bg-dark border-0 mt-0 text-light p-1">
                          <div className="category-title">Personal Profile</div>
                          <div
                            className="category-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => setTogglePersonalProfile(false)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                        </div>
                        {profiles &&
                          profiles.map((profile) => (
                            <>
                              <UpdatePersonalProfileForm
                                key={profile.id}
                                profile={profile}
                              />
                            </>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {profiles &&
                profiles.map((profile) => (
                  <div className="mt-1">
                    <PersonalProfileItem
                      key={profile.firstname}
                      profile={profile}
                    />
                  </div>
                ))}
            </div>
            <div className="row mt-4">
              <div className="col-8 borderBottom">
                {toggleProfessionalProfile === false ? (
                  <>
                    <button
                      className="border-0 text-dark p-1 rounded-1 fw-semibold"
                      onClick={() => setToggleProfessionalProfile(true)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Professional Profile{" "}
                      <FontAwesomeIcon className="text-success" icon={faPlus} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border-0 text-dark p-1 rounded-1 fw-semibold"
                      onClick={() => setToggleProfessionalProfile(false)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      ...editing{" "}
                      {/* <FontAwesomeIcon className="text-danger" icon={faMinus} /> */}
                    </button>
                    <div className="col-12 messageBoxContainer">
                      <div className="col-xs-10 col-sm-6 col-md-6 col-lg-3 bg-light pt-0 rounded-2">
                        <div className="category-header col-12 bg-dark border-0 mt-0 text-light p-1">
                          <div className="category-title">
                            Professional Profile
                          </div>
                          <div
                            className="category-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => setToggleProfessionalProfile(false)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                        </div>

                        <UpdateProfessionalProfileForm />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {profiles &&
                profiles.map((profile) => (
                  <div className="mt-1">
                    <ProfessionalProfileItem
                      key={profile.id}
                      category={profile.category}
                      experience={profile.experience}
                      about={profile.about}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
