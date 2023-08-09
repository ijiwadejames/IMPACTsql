/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  friendsBtn,
  reset,
} from "./features/createConnDisconnBtns/friendSlice";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisconnectButtons from "./DisconnectButtons";
import ConnectButton from "./ConnectButton";
import Spinner from "./Spinner";

const Status = () => {
  const dispatch = useDispatch();
  const { getFriends, isSuccess, isLoading } = useSelector(
    (state) => state.getFriends
  );
  const { conProfiles } = useSelector((state) => state.conProfiles);
  const { user } = useSelector((state) => state.auth);
  const { pid } = useParams();

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (isSuccess) {
      dispatch(friendsBtn(`${pid}`));
    }

    return () => {
      dispatch(reset());
    };
  }, [pid, dispatch]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(sendConnectionRequest({ hId }));
  // };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {getFriends && getFriends === "Request Sent" ? (
        <div
          className="bg-light rounded-0 category-header"
          style={{ backgroundColor: "none" }}
        >
          <div className="category-title">Pending request</div>
          <div className="category-icon">
            ...awaiting approval{" "}
            <FontAwesomeIcon className="text-danger" icon={faTimesCircle} />
          </div>
        </div>
      ) : (
        <>
          {getFriends && getFriends === "Disconnect" ? (
            <div
              className="bg-light rounded-0 category-header"
              style={{ backgroundColor: "none" }}
            >
              <div className="category-title">
                <DisconnectButtons />
              </div>
              <div className="category-icon">
                ...already in connection{" "}
                <FontAwesomeIcon
                  className="text-success"
                  icon={faCheckCircle}
                />
              </div>
            </div>
          ) : (
            <div
              className="bg-light rounded-0 category-header"
              style={{ backgroundColor: "none" }}
            >
              <div className="category-title">
                <ConnectButton />
              </div>
              <div className="category-icon">
                not in connection{" "}
                <FontAwesomeIcon className="text-danger" icon={faTimesCircle} />
              </div>
            </div>
          )}
        </>
      )}

      {/* <div className="mb-1" style={{ fontSize: "8pt" }}>
        {getFriends && getFriends.length === 0 ? (
          <>
            <div
              className="bg-light rounded-0 category-header"
              style={{ backgroundColor: "none" }}
            >
              <div className="category-title">
                <ConnectButton />
              </div>
              <div className="category-icon">
                not in connection{" "}
                <FontAwesomeIcon className="text-danger" icon={faTimesCircle} />
              </div>
            </div>
          </>
        ) : (
          <>
            {getFriends &&
              getFriends.map(function (friend) {
                if (friend.isSent === true && friend.isAccepted === false) {
                  return (
                    <>
                      {friend.senderID === (user && user.id) ? (
                        <div
                          className="bg-light rounded-0 category-header"
                          style={{ backgroundColor: "none" }}
                        >
                          <div className="category-title">Request Sent</div>
                          <div className="category-icon">
                            ...awaiting approval{" "}
                            <FontAwesomeIcon
                              className="text-danger"
                              icon={faTimesCircle}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="bg-light rounded-0 category-header"
                          style={{ backgroundColor: "none" }}
                        >
                          <div className="category-title">Request Received</div>
                          <div className="category-icon">
                            ...awaiting your approval{" "}
                            <FontAwesomeIcon
                              className="text-danger"
                              icon={faTimesCircle}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (
                  friend.isSent === true &&
                  friend.isAccepted === true
                ) {
                  return (
                    <div
                      className="bg-light rounded-0 category-header"
                      style={{ backgroundColor: "none" }}
                    >
                      <div className="category-title">
                        <DisconnectButtons />
                      </div>
                      <div className="category-icon">
                        ...already in connection{" "}
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCheckCircle}
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </>
        )} */}
      {/* {getFriends &&
          getFriends.map(function (friend) {
            if (
              getFriends.length === 0 ||
              (friend.isSent === false && friend.isAccepted === false)
            ) {
              return (
                <div
                  className="bg-light rounded-0 category-header"
                  style={{ backgroundColor: "none" }}
                >
                  <div className="category-title">
                    <ConnectButton />
                  </div>
                  <div className="category-icon">
                    not in connection
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faTimesCircle}
                    />
                  </div>
                </div>
              );
            } else if (friend.isSent === true && friend.isAccepted === false) {
              return (
                <div
                  className="bg-light rounded-0 category-header"
                  style={{ backgroundColor: "none" }}
                >
                  <div className="category-title">Request Sent</div>
                  <div className="category-icon">
                    already in connection
                    <FontAwesomeIcon
                      className="text-success"
                      icon={faCheckCircle}
                    />
                  </div>
                </div>
              );
            } else if (friend.isSent === true && friend.isAccepted === true) {
              return (
                <>
                  <div
                    className="bg-light rounded-0 category-header"
                    style={{ backgroundColor: "none" }}
                  >
                    <div className="category-title">
                      <DisconnectButtons />
                    </div>
                    <div className="category-icon">
                      already in connection
                      <FontAwesomeIcon
                        className="text-success"
                        icon={faCheckCircle}
                      />
                    </div>
                  </div>
                </>
              );
            } else {
              return (<div
                  className="bg-light rounded-0 category-header"
                  style={{ backgroundColor: "none" }}
                >
                  <div className="category-title">
                    <ConnectButton />
                  </div>
                  <div className="category-icon">
                    not in connection
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faTimesCircle}
                    />
                  </div>
                </div>)
            }
          })} */}
      {/* </div> */}
    </>
  );
};

export default Status;
