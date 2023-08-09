/** @format */

import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ComposeBox from "../components/ComposeBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getConnectionProfile } from "../components/features/connectionProfile/connectionProfileSlice";
import { useNavigate } from "react-router-dom";
import { getMessage } from "../components/features/message/messageSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const Message = () => {
  const { conProfiles } = useSelector((state) => state.conProfiles);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    //fetch profil from database and store in state
    else dispatch(getConnectionProfile());
    dispatch(getMessage());
    dispatch(getNotification());
    dispatch(countNotification());
  }, [user, dispatch, navigate]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3">
            Chatbox
            {/* {conProfiles &&
              conProfiles.map((profile) => (
                <>
                  <ComposeBox key={profile.id} profile={profile} />
                </>
              ))} */}
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
