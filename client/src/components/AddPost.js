/** @format */

import { useState } from "react";
import {
  faCirclePlus,
  faTimesCircle,
  faArrowAltCircleDown,
  faCameraAlt,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserpostBar from "./UserpostBar";
import UserpostTextBar from "./UserpostTextBar";

import { useSelector } from "react-redux";

const AddPost = () => {
  const [toggleNewPost, setToggleNewPost] = useState(false);
  const [toggleUText, setToggleUText] = useState(false);
  const [toggleUPhoto, setToggleUPhoto] = useState(false);
  const { profiles } = useSelector((state) => state.profiles);
  return (
    <>
      {profiles &&
        profiles.map(function (profile) {
          if (
            profile.countries !== "" &&
            profile.phones !== "" &&
            profile.about !== "" &&
            profile.experience !== "" &&
            profile.category !== ""
          ) {
            return (
              <>
                <FontAwesomeIcon
                  className="p-1 bg-light m-1 shadow-sm"
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    // position: "fixed",
                    // bottom: "30px",
                    // right: "200px",
                    color: "#DA3E10",
                    borderRadius: "100%",
                  }}
                  icon={faCirclePlus}
                  onClick={() => setToggleNewPost(!toggleNewPost)}
                />

                {toggleNewPost === true && (
                  <div className="row col-auto m-auto p-auto">
                    <div
                      className="bg-primary col-auto border-0 btn p-1 shadow-sm text-center fw-semibold text-light rounded-2"
                      onClick={() => setToggleUText(!toggleUText)}
                      style={{ cursor: "pointer" }}
                    >
                      Compose New Post <FontAwesomeIcon icon={faPenAlt} />
                    </div>
                    {/* <div
                      className="col-auto border-0 btn p-1 shadow-sm text-center fw-semibold text-light rounded-0 ms-1"
                      onClick={() => setToggleUPhoto(!toggleUPhoto)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faCameraAlt} />
                      Upload Photo
                    </div> */}
                  </div>
                )}
                {/* {toggleUPhoto === true && (
                  <div className="messageBoxContainer">
                    <div className="col-xs-12 col-sm-7 col-md- 5 col-lg-4 bg-light p-2 rounded-1 shadow-sm">
                      <div className="col-12 text-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-primary"
                          style={{
                            fontSize: "25px",
                            position: "relative",
                            cursor: "pointer",
                          }}
                          onClick={() => setToggleUPhoto(false)}
                        />
                      </div>
                      <div className="col-12 text-center">
                        <span className="fw-semibold">
                          What should we discuss?{" "}
                          <FontAwesomeIcon icon={faArrowAltCircleDown} />
                        </span>
                        <UserpostBar />
                      </div>
                    </div>
                  </div>
                )} */}
                {toggleUText === true && (
                  <div className="messageBoxContainer">
                    <div className="col-xs-12 col-sm-10 col-md-5 col-lg-4 bg-light p-2 rounded-1 shadow-sm">
                      <div className="col-12 text-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-primary"
                          style={{
                            fontSize: "25px",
                            position: "relative",
                            cursor: "pointer",
                          }}
                          onClick={() => setToggleUText(false)}
                        />
                      </div>
                      <div className="col-12 text-center">
                        <span className="fw-semibold">
                          What should we discuss?{" "}
                          <FontAwesomeIcon icon={faArrowAltCircleDown} />
                        </span>
                        <UserpostTextBar />
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          }
        })}
    </>
  );
};

export default AddPost;
