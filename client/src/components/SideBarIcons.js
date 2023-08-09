/** @format */

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBell,
  faTimesCircle,
  faCheckCircle,
  faSearch,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePicture from "./ProfilePicture";

const SideBarIcons = (props) => {
  const { profile } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const { profiles } = useSelector((state) => state.profiles);
  const { mProfiles } = useSelector((state) => state.mProfiles);

  const filteredProfile = mProfiles.filter((profile) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      profile.firstname.toLowerCase().includes(searchQueryLowerCase) ||
      profile.lastname.toLowerCase().includes(searchQueryLowerCase)
    );
  });

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  const avatarImage = profile.Image.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath + avatarImage;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const scrollableClass = isHovering ? "scrollable" : "scrollable hover";

  return (
    <>
      <div className="col-12 p-2">
        <input
          type="search"
          className="col-11 form-control text-dark m-auto p-1"
          placeholder="Search..."
          style={{
            fontSize: "10pt",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {searchQuery.trim() === "" ? (
        <div className="col-11 m-auto rounded-1 text-center p-1 text-danger">
          {/* No search request! */}
        </div>
      ) : filteredProfile.length > 0 ? (
        <div className="col-11 m-auto" style={{ fontSize: "8pt" }}>
          <div className="chat-header bg-dark text-light p-0 rounded-0">
            <div className="chat-body" style={{ padding: "3px" }}>
              <FontAwesomeIcon icon={faSearch} /> Search Result
            </div>
            <div
              className="chat-body"
              style={{ padding: "3px", cursor: "pointer" }}
              onClick={() => setSearchQuery("")}
            >
              X
            </div>
          </div>

          <div className="searchResult">
            <ul
              className={scrollableClass}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {filteredProfile.map((item) => (
                <li key={item}>
                  {item.category === profile.category &&
                    item.countries !== "" &&
                    item.phones !== "" &&
                    item.about !== "" &&
                    item.experience !== "" &&
                    item.category !== "" && (
                      <>
                        <Link
                          className="p-0 mentnames"
                          to={{
                            pathname: `/private/${item.id}`,
                          }}
                        >
                          {item.lastname} {item.firstname}{" "}
                          {item.role === "Mentor" && (
                            <FontAwesomeIcon
                              className="text-primary"
                              style={{ fontSize: "80%" }}
                              icon={faCheckCircle}
                            />
                          )}{" "}
                          (
                          <span
                            style={{
                              color: "rgba(0,0,0,.7)",
                              fontStyle: "italic",
                            }}
                          >
                            {item.countries}
                          </span>
                          )
                        </Link>
                      </>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="col-11 m-auto bg-white rounded-1 text-center p-1 text-danger alignItem">
          <button
            onClick={() => setSearchQuery("")}
            className="border-0 p-0 m-0 bg-white"
          >
            <FontAwesomeIcon icon={faTimesCircle} className="text-primary" />
          </button>{" "}
          No results found
        </div>
      )}
      {/* <div className="side-bar-content ps-3 p-2">
        <div className="right-bar text-light">Notification</div>
        <div className="left-bar">
          <FontAwesomeIcon className="bell-icon" icon={faBell} />
        </div>
      </div> */}
      <div className="side-bar-content ps-3 p-2">
        <div className="link-title-icon">
          <Link to="/profile" className="text-light">
            Profile
          </Link>
        </div>
        <div className="link-title-icon">
          {profiles &&
            profiles.map(function (profile) {
              if (profile.Image.avatar !== null) {
                return (
                  <>
                    <ProfilePicture
                      key={profile.firstname}
                      avatar={imageUrl}
                      height="20px"
                      width="20px"
                    />
                  </>
                );
              } else {
                return (
                  <div className="col-12 text-center">
                    <FontAwesomeIcon
                      style={{ fontSize: "15pt", color: "#ffc107" }}
                      icon={faUserCircle}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="side-bar-content ps-3 p-2">
        <div className="link-title-icon">
          <Link to="/suggestions/Mentor" className="text-light">
            Mentors List
          </Link>
        </div>
        <div className="link-title-icon">
          <FontAwesomeIcon
            className="bell-icon"
            style={{ fontSize: "15pt" }}
            icon={faUserCircle}
          />
        </div>
      </div>
      <div className="side-bar-content ps-3 p-2">
        <div className="link-title-icon">
          <Link to="/suggestions/Mentee" className="text-light">
            Mentees List
          </Link>
        </div>
        <div className="link-title-icon">
          <FontAwesomeIcon
            className="bell-icon"
            style={{ fontSize: "15pt" }}
            icon={faUserCircle}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarIcons;
