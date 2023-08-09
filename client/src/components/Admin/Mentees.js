import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import AdNav from "./AdNav";
import {
  faArrowUp,
  faArrowDown,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";

const Mentees = () => {
  const [profiles, setProfiles] = useState([]);
  const [countMentees, setCountMentees] = useState([]);

  useEffect(() => {
    const getUserProfile = () => {
      axios
        .get("/api/getallprofile", {
          withCredentials: "true",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setProfiles(response.data);
        });
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    const menteeCount = () => {
      axios
        .get("/api/countMentees", {
          withCredentials: "true",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setCountMentees(response.data);
        });
    };
    menteeCount();
  }, []);

  const handlePromote = async (id) => {
    try {
      const response = await axios.put(
        `/api/handlePromote/` + id,
        JSON.stringify({ id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log("PostID:", id);
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      if (!err?.response) {
      } else if (err.response?.status === 409) {
      } else {
        // setErrMsg('Message Sent')
      }
      // errRef.current.focus();
    }
  };
  const handleDemote = async (id) => {
    try {
      const response = await axios.put(
        `/api/handleDemote/` + id,
        JSON.stringify({ id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log("PostID:", id);
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      if (!err?.response) {
      } else if (err.response?.status === 409) {
      } else {
        // setErrMsg('Message Sent')
      }
      // errRef.current.focus();
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-10 col-xs-10 col-md-10 col-lg-10 m-auto mt-4">
          <h1>Administrator's Page</h1>

          <AdNav />

          <div className="col-12 mt-2">
            <h4>MENTEES</h4>
            <div className="col-12 ps-0 p-2" style={{ fontSize: "20px" }}>
              {countMentees} Registered Mentees
            </div>
            {profiles.map(function (profile) {
              if (profile.status === "Mentee") {
                return (
                  <div className="col-12">
                    <table className="col-12">
                      <tr>
                        <th style={{ width: "50%" }}>
                          <div style={{ fontSize: "17px" }}>
                            {profile.lastname} {profile.firstname}{" "}
                            {profile.othernames}
                          </div>
                        </th>
                        <th>
                          <div style={{ fontSize: "17px" }}>
                            {profile.status}
                          </div>
                        </th>
                        <th className="col-2 m-1 p-2">
                          {profile.status === "Mentee" ? (
                            <>
                              <button
                                className="col-8 text-center bg-danger border-0 p-3 text-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => handlePromote(profile._id)}
                              >
                                <FontAwesomeIcon icon={faArrowUp} /> promote
                              </button>
                            </>
                          ) : (
                            <button
                              className="col-8 text-center bg-danger border-0 p-3 text-light"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDemote(profile._id)}
                            >
                              <FontAwesomeIcon icon={faArrowDown} /> Demote
                            </button>
                          )}
                        </th>

                        <th className="col-2 m-1 p-2">
                          <button
                            className="col-8 text-center bg-danger border-0 p-3 text-light"
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon icon={faTrashCan} /> delete
                          </button>
                        </th>
                      </tr>
                    </table>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentees;
