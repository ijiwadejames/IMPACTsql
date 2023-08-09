/** @format */

import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import DMBox from "../components/DMBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getChatsTitle } from "../components/features/getChatForInbox/getChatForInboxSlice";
import { useNavigate } from "react-router-dom";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const Message = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading } = useSelector((state) => state.messages);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //fetch posts
    // else dispatch(getChatsTitle());
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, dispatch]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3">
            <DMBox />
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
