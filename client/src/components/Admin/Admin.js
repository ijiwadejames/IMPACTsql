// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"
import AdNav from "./AdNav";
// import {
//   faArrowUp,
//   faArrowDown,
//   faTrashCan,
// } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";

const Admin = () => {
  const [profiles, setProfiles] = useState([]);
  const [countMentees, setCountMentees] = useState([]);
  const [countMentors, setCountMentors] = useState([]);

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
  useEffect(() => {
    getUserProfile();
  }, []);

  const countMentrs = () => {
    axios
      .get("/api/countMentors", {
        withCredentials: "true",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCountMentors(response.data);
      });
  };
  useEffect(() => {
    countMentrs();
  }, []);

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
  useEffect(() => {
    menteeCount();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-10 col-xs-10 col-md-10 col-lg-10 m-auto mt-4">
          <h1>Administrator's Page</h1>

          <AdNav />

          <div className="row">
            <div
              className="card col-2 bg-success p-5 me-5 text-light text-center shadow-sm"
              style={{ fontSize: "20px" }}
            >
              Mentors
              <span style={{ fontSize: "30px" }}>{countMentors}</span>
            </div>
            <div
              className="card col-2 bg-danger p-5 me-5 text-light text-center shadow-sm"
              style={{ fontSize: "20px" }}
            >
              Mentees
              <span style={{ fontSize: "30px" }}>{countMentees}</span>
            </div>
            <div
              className="card col-2 bg-info p-5 me-5 text-light text-center shadow-sm"
              style={{ fontSize: "20px" }}
            >
              Reports
              <span style={{ fontSize: "30px" }}>0</span>
            </div>
            <div
              className="card col-2 bg-primary p-5 text-light text-center shadow-sm"
              style={{ fontSize: "20px" }}
            >
              Messages
              <span style={{ fontSize: "30px" }}>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
