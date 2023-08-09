/** @format */

import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConnectBox from "../components/ConnectBox";
import { getPosts, reset } from "../components/features/posts/postSlice";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const Connection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const { myFriends, isLoading } = useSelector((state) => state.myFriends);

  useEffect(() => {
    //fetch posts
    if (!user) {
      navigate("/");
    } else dispatch(getPosts());
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">            
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3">
            <ConnectBox />
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Connection;
