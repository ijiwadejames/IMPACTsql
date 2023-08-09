/** @format */

import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrivateProfileBar from "../components/PrivateProfileBar";
import RightBar from "../components/RightBar";
import AddPost from "../components/AddPost";
import {
  getPersonalPosts,
  reset,
} from "../components/features/posts/postSlice";
import PersonalDashboardPostItem from "../components/PersonalDashboardPostsItem";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { getConnectionProfile } from "../components/features/connectionProfile/connectionProfileSlice";
import Status from "../components/Status";
import { friendsBtn } from "../components/features/createConnDisconnBtns/friendSlice";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const PersonalProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const { profiles } = useSelector((state) => state.profiles);
  const { conProfiles } = useSelector((state) => state.conProfiles);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    //dispatch ID to fetch data
    dispatch(getPersonalPosts(`${pid}`));
    dispatch(getConnectionProfile(`${pid}`));
    dispatch(friendsBtn(`${pid}`));
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());
    //fetch profil from database and store in state
    // dispatch(getConnectionProfile());
  }, [pid, user, navigate, isError, message, dispatch]);

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
            {conProfiles &&
              conProfiles.map((profile) => (
                <PrivateProfileBar key={profile.id} profile={profile} />
              ))}
          </div>

          <div className="middle-bar col-5 mt-3">
            {pid !== (user && user.id) && <Status />}
            {user && user.id === pid && (
              <>
                <AddPost />
              </>
            )}
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
                    <div className="col-12 text-center bg-light alignItem">
                      <div className="col-12" style={{ fontSize: "15px" }}>
                        <div
                          className="col-12 text-primary text-center"
                          style={{ fontSize: "15pt" }}
                        >
                          <FontAwesomeIcon icon={faTriangleExclamation} />
                        </div>
                        Complete your profile!
                      </div>
                    </div>
                  );
                } else if (posts.length <= 0) {
                  return (
                    <div className="col-12 text-center bg-light alignItem">
                      <div className="col-12" style={{ fontSize: "15px" }}>
                        <div
                          className="col-12 text-primary text-center"
                          style={{ fontSize: "15pt" }}
                        >
                          <FontAwesomeIcon icon={faBookOpenReader} />
                        </div>
                        {user && user.id === pid ? (
                          <>Create your first post!</>
                        ) : (
                          <>Nothing to show!</>
                        )}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="">
                      {posts &&
                        posts.map((post) => (
                          <PersonalDashboardPostItem
                            key={post.id}
                            post={post}
                          />
                        ))}
                    </div>
                  );
                }
              })}
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
