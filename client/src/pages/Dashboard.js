/** @format */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RightBar from "../components/RightBar";
import { getPosts, reset } from "../components/features/posts/postSlice";
import { getProfile } from "../components/features/profile/profileSlice";
import DashboardPostItem from "../components/DashboardPostsItem";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faBookOpenReader,
  faArrowAltCircleRight,
  faUserCircle,
  faBell,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import LeftBar from "../components/LeftBar";
import IncompleteProfileNotification from "../components/IncompleteProfileNotification";
import AddPost from "../components/AddPost";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
import { countMyPosts } from "../components/features/countPosts/countPostsSlice";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );
  const { countPosts } = useSelector((state) => state.countPosts);
  const { profiles } = useSelector((state) => state.profiles);
  const { notifys } = useSelector((state) => state.notifys);

  // const handleLimitChange = () => {
  //   const newLimit = limit + 10;
  //   setLimit(newLimit);
  // };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    } else {
      //Fetch posts from backend an set it on posts
      dispatch(getPosts(limit));
      dispatch(countNotification());
      dispatch(getNotification());
      dispatch(countMyPosts());
      dispatch(getMessage());
      dispatch(reset());
    }

    //reset state onMount
  }, [user, limit, navigate, isError, message, dispatch]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight
      ) {
        setLimit((prev) => prev + 10);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid m-0 p-0">
      <div className="col-12">
        <Menu />
      </div>
      <div className="body-content ">
        <div className="left-bar">
          <LeftBar />
        </div>

        <div className="middle-bar col-5 mt-3">
          <IncompleteProfileNotification />

          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <AddPost />
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
                      <div
                        className="col-12 text-center alignItem"
                        style={{ backgroundColor: "rgb(240,240,240)" }}
                      >
                        <div
                          className="col-12"
                          style={{
                            fontSize: "15px",
                          }}
                        >
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
                      <div
                        className="col-12 text-center alignItem"
                        style={{
                          backgroundColor: "rgb(240,240,240)",
                        }}
                      >
                        <div
                          className="col-12"
                          style={{
                            fontSize: "15px",
                          }}
                        >
                          <div
                            className="col-12 text-primary text-center"
                            style={{ fontSize: "15pt" }}
                          >
                            <FontAwesomeIcon icon={faBookOpenReader} />
                          </div>
                          Create your first post!
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="p-2"
                        style={{
                          borderLeft: "2px solid rgba(0,0,0,.06)",
                          borderRight: "2px solid rgba(0,0,0,.06)",
                        }}
                      >
                        {posts &&
                          posts
                            .slice(0, limit)
                            .map((post) => (
                              <DashboardPostItem
                                key={post.id}
                                post={post}
                                image={post.Image?.avatar}
                                postProfile={post.Profile}
                              />
                            ))}
                      </div>
                    );
                  }
                })}
            </>
          )}
        </div>

        <div className="right-bar">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
