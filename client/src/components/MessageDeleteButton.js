/** @format */

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  reset,
} from "./features/deleteMessage/deleteMessageSlice";
import { getMessage } from "./features/message/messageSlice";

const MessageDeleteButton = (props) => {
  const { message } = props;
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.delMessages);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getMessage());
    }

    return () => {
      dispatch(reset());
    };
  });
  return (
    <>
      <div onClick={() => setToggleConfirm(!toggleConfirm)}>
        <FontAwesomeIcon
          style={{ color: "rgba(0,0,0,.3)" }}
          icon={faTrashAlt}
        />
      </div>
      {toggleConfirm === true && (
        <div className="messageBoxContainer">
          <div
            className="col-3 text-dark p-0 pb-2 shadow-sm bg-light rounded-2"
            style={{
              border: "1px solid white",
              fontSize: "9pt",
              // backgroundColor: "rgba(255, 255, 255, .5)",
            }}
          >
            <div className="col-12 text-start bg-dark text-light p-1 rounded-2">
              <FontAwesomeIcon icon={faTriangleExclamation} /> Confirm
            </div>
            <div className="col-12 text-center text-dark mb-1 p-2">
              Do you really want to delete this message?
            </div>
            <div className="row col-7 p-auto m-auto">
              <button
                className="col-5 inline bg-dark btn btn-sm p-0 border-0"
                onClick={() => {
                  dispatch(
                    deleteMessage(
                      message.messageReceiverID === (user && user.id)
                        ? message.messageSenderID
                        : message.messageReceiverID
                    )
                  );
                  setToggleConfirm(false);
                }}
              >
                Yes
              </button>
              <button
                className="col-5 inline bg-primary btn btn-sm ms-2 p-0 border-0"
                style={{ display: "inline" }}
                onClick={() => setToggleConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageDeleteButton;
