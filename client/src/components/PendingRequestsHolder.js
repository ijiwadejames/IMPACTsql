/** @format */

import { useState } from "react";
import { useSelector } from "react-redux";
import PendingRequestsItem from "./PendingRequestsItem";
import MorePendingRequests from "./MorePendingRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const PendingRequestsHolder = () => {
  const { connLists } = useSelector((state) => state.connLists);
  const [toggleMoreRequests, setToggleMoreRequests] = useState(false);

  return (
    <>
      <div className="col-12">
        {connLists && connLists.length === 0 ? (
          <div
            className="col-12 text-center p-3 pb-0 mb-0 alignItem"
            style={{ fontSize: "9.5pt" }}
          >
            No pending requests!
          </div>
        ) : (
          <>
            {connLists &&
              connLists.map((list) => (
                <>
                  {list.pendingRequests.map((requests) => (
                    <PendingRequestsItem
                      key={requests.id}
                      id={requests.senderID}
                      lastname={requests.senderProfile.lastname}
                      firstname={requests.senderProfile.firstname}
                      senderid={requests.senderID}
                      countries={requests.senderProfile.countries}
                      category={requests.senderProfile.category}
                      avatar={requests.senderProfile.Image.avatar}
                    />
                  ))}
                </>
              ))}
          </>
        )}
      </div>
      {connLists && connLists.length >= 2 && (
        <>
          <div
            className="col-12 text-primary text-end p-1 pe-0"
            style={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() => setToggleMoreRequests(!toggleMoreRequests)}
          >
            more requests <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </div>

          {toggleMoreRequests === true && (
            <div className="messageBoxContainer">
              <div className="col-2 bg-light text-dark p-0 shadow-sm">
                <div className="col-12 bg-dark text-light p-2">
                  <div>
                    <span
                      className="bg-danger text-light fw-semibold p-1"
                      onClick={() => setToggleMoreRequests(false)}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </span>{" "}
                    Pending Requests
                  </div>
                </div>
                <div className="col-12 bg-light text-light p-2">
                  {connLists &&
                    connLists.map((list) => (
                      <>
                        {list.pendingRequests.map((requests) => (
                          <MorePendingRequests
                            key={requests.id}
                            requests={requests}
                          />
                        ))}
                      </>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PendingRequestsHolder;
