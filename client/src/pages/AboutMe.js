/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEdit,
  faCamera,
  faCameraAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getConnectionProfile } from "../components/features/connectionProfile/connectionProfileSlice";
import PrivateProfileBar from "../components/PrivateProfileBar";
import ProfessionalProfileItem from "../components/ProfessionalProfileItem";
import PersonalProfileItem from "../components/PersonalProfileItem";
import { getMessage } from "../components/features/message/messageSlice";
import Status from "../components/Status";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
import Menu from "../components/Menu";

const AboutMe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profiles, isLoading, isError, message } = useSelector(
    (state) => state.profiles
  );
  const { pid } = useParams();
  const { conProfiles } = useSelector((state) => state.conProfiles);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    //fetch profile from database and store in state
    dispatch(getConnectionProfile(`${pid}`));
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());
  }, [pid, user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">
            {conProfiles &&
              conProfiles.map((profile) => (
                <PrivateProfileBar key={profile.id} profile={profile} />
              ))}
          </div>

          <div className="middle-bar col-5 mt-3">
            <div className="row mt-4">
              {pid !== (user && user.id) && <Status />}
              <h4>Current Profile</h4>

              {conProfiles &&
                conProfiles.map((profile) => (
                  <div className="mt-1">
                    <div
                      className="col-12 fw-bold"
                      style={{ fontSize: "14pt" }}
                    >
                      Personal Profile
                    </div>
                    <PersonalProfileItem
                      key={profile.firstname}
                      profile={profile}
                    />
                  </div>
                ))}
            </div>

            <div className="row mt-4">
              {conProfiles &&
                conProfiles.map((profile) => (
                  <div className="mt-1">
                    <div
                      className="col-12 fw-bold"
                      style={{ fontSize: "14pt" }}
                    >
                      Professional Profile
                    </div>
                    <ProfessionalProfileItem
                      key={profile.username}
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

export default AboutMe;
