/** @format */

import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import { getProfile, reset } from "./features/profile/profileSlice";

const LeftBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } else {
      //fetch Mentees Profiles from Database
      dispatch(getProfile());
    }

    dispatch(reset());
  }, [dispatch, navigate]);

  return (
    <div>
      {profiles &&
        profiles.map((profile) => (
          <ProfileBar key={profile.id} profile={profile} />
        ))}
    </div>
  );
};

export default memo(LeftBar);
