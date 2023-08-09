/** @format */

import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  readMessage,
  reset,
} from "../components/features/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadMessage from "../components/ReadMessage";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const Message = () => {
  const { mid } = useParams();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //dispatch message ID
    else dispatch(readMessage(`${mid}`));
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());    
    //fetch message
    // dispatch(readMessage());

    return () => {
      dispatch(reset());
    };
  }, [mid, user, navigate, dispatch]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3">
            {messages &&
              messages.map((message) => (
                <ReadMessage key={message.id} message={message} />
              ))}
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
