/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/images/CVerseW.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  faSignOutAlt,
  faBell,
  faSearch,
  faHome,
  faUserFriends,
  faEnvelope,
  faCheckCircle,
  faTimesCircle,
  faCog,
  faUserCircle,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout, revertAll } from "./features/auth/authSlice";
import { countNotification } from "./features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
import { emptyNotify, reset } from "./features/emptyNotify/emptyNotifySlice";
import NotificationHolder from "./NotificationHolder";
import { getMessage } from "./features/message/messageSlice";
import CountMessage from "./CountMessage";
const Navigate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mProfiles } = useSelector((state) => state.mProfiles);

  const [isHovering, setIsHovering] = useState(false);
  const { notifys } = useSelector((state) => state.notifys);
  const { isSuccess } = useSelector((state) => state.emptyNotifys);
  const { messages } = useSelector((state) => state.messages);
  const { profiles } = useSelector((state) => state.profiles);
  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  };

  // const avatarImage = profile.Image.avatar;
  const baseUrl = getBaseUrl();
  const imagePath = "/ProfilePictures/";
  const imageUrl = baseUrl + imagePath;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfile = mProfiles.filter((profile) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      profile.firstname.toLowerCase().includes(searchQueryLowerCase) ||
      profile.lastname.toLowerCase().includes(searchQueryLowerCase)
    );
  });

  // const senderIDs = new Set();
  const myId = user && user.id;

  // Get a list of all sender IDs who have sent messages to the current user
  const senderIDs = [
    ...new Set(
      messages
        .filter((message) => message.messageReceiverID === myId)
        .map((message) => message.messageSenderID)
    ),
  ];

  const filteredMessages = messages.filter(
    (message) =>
      message.messageReceiverID === myId &&
      message.isViewed === false &&
      senderIDs.includes(message.messageSenderID)
  );

  const lastMessagesCount = filteredMessages.reduce((count, message) => {
    if (
      !count[message.messageSenderID] ||
      count[message.messageSenderID].lastMessageDate < message.createdAt
    ) {
      count[message.messageSenderID] = {
        lastMessageDate: message.createdAt,
        count: 1,
      };
    } else if (
      count[message.messageSenderID].lastMessageDate === message.createdAt
    ) {
      count[message.messageSenderID].count++;
    }
    return count;
  }, {});

  const totalLastMessagesCount = Object.values(lastMessagesCount).reduce(
    (total, { count }) => total + count,
    0
  );

  useEffect(() => {
    dispatch(countNotification());
    dispatch(getNotification());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      dispatch(getMessage());
    }
  }, [dispatch, isSuccess]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(revertAll());
    navigate("/");
  };
  return (
    <>
      {user && user ? (
        <nav>
          <div className="logo-container">
            <img
              src={logo}
              // style={{ maxHeight: "30px" }}
              alt="Impact_Academy_Logo"
            />
          </div>
          <div className="icons-container">
            <Link to="/dashboard">
              <FontAwesomeIcon className="text-light" icon={faHome} />
            </Link>
            <Link to="/connect">
              <FontAwesomeIcon className="text-light" icon={faUserFriends} />
              <CountMessage />
            </Link>
            <Link to="/inbox">
              <FontAwesomeIcon className="text-light" icon={faEnvelope} />

              {totalLastMessagesCount > 0 && (
                <span className="badge" style={{ fontSize: "5pt" }}>
                  {totalLastMessagesCount}
                </span>
              )}
            </Link>
            <div className="dropdown">
              <Link onMouseOver={() => dispatch(emptyNotify())}>
                <FontAwesomeIcon className="text-light" icon={faBell} />
                <span className="badge" style={{ fontSize: "5pt" }}>
                  {notifys >= 1 && notifys}
                </span>
              </Link>
              <div className="dropdown-content bg-dark rounded-2 shadow text-light">
                <NotificationHolder />
              </div>
            </div>
            <div className="dropdown">
              <span
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgb(0,0,0)",
                }}
                className="pe-3 ps-3 fw-semibold name"
              >
                {profiles &&
                  profiles.map((profile) => (
                    <>
                      {profile.lastname.slice(0, 1) +
                        profile.firstname.slice(0, 1)}
                    </>
                  ))}
              </span>

              <div className="dropdown-content bg-light rounded-2 p-1 shadow text-light">
                {profiles &&
                  profiles.map((profile) => (
                    <div
                      className="menu-bar-content"
                      onClick={() => navigate(`/private/${profile.id}`)}
                    >
                      <div className="link-title-icon">Collection</div>
                      <div className="link-title-icon">
                        <FontAwesomeIcon
                          className="bell-icon"
                          icon={faPencilAlt}
                        />
                      </div>
                    </div>
                  ))}

                <div className="menu-bar-content">
                  <div className="link-title-icon">Settings</div>
                  <div className="link-title-icon">
                    <FontAwesomeIcon className="bell-icon" icon={faCog} />
                  </div>
                </div>

                <div className="menu-bar-content" onClick={onLogout}>
                  <div className="link-title-icon">Logout</div>
                  <div className="link-title-icon">
                    <FontAwesomeIcon
                      className="bell-icon"
                      icon={faSignOutAlt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <a href="/dashboard" style={{ cursor: "pointer" }}>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
            <div className="container-fluid">
              <img
                src={logo}
                style={{ maxHeight: "30px" }}
                alt="Impact_Academy_Logo"
              />
            </div>
          </nav>
        </a>
      )}
    </>
  );
};

export default Navigate;

{
  /* <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
  <div className="container-fluid">
    <img src={logo} style={{ maxHeight: "30px" }} alt="Impact_Academy_Logo" />

    <button
      className="navbar-toggler  p-0 m-1"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span
        className="navbar-toggler-icon m-1"
        style={{ fontSize: "10pt" }}
      ></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className="nav-link active text-underline-hover text-light fw-bold"
            aria-current="page"
            to="/dashboard"
          >
            {" "}
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active text-light fw-bold"
            aria-current="page"
            to="/connect"
          >
            <FontAwesomeIcon icon={faUserFriends} />
            <CountMessage />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active text-light notification fw-bold"
            aria-current="page"
            to="/inbox"
          >
            <FontAwesomeIcon icon={faEnvelope} />

            {totalLastMessagesCount > 0 && (
              <span className="badge" style={{ fontSize: "5pt" }}>
                {totalLastMessagesCount}
              </span>
            )}
          </Link>
        </li>

        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle text-light notification"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => dispatch(emptyNotify())}
          >
            <FontAwesomeIcon icon={faBell} />
            <span className="badge" style={{ fontSize: "5pt" }}>
              {notifys >= 1 && notifys}
            </span>
          </Link>

          <ul
            className="dropdown-menu dropdown-menu-end text-primary p-1 shadow"
            aria-labelledby="navbarDropdown"
            style={{ fontSize: "8pt" }}
          >
            <NotificationHolder />
          </ul>
        </li>

        <li className="nav-item dropdown text-goldenyellow">
          <Link
            className="nav-link dropdown-toggle fw-bold text-goldenyellow"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              className="text-goldenyellow m-0 p-0"
              style={{ fontWeight: "400", fontSize: "9pt" }}
            >
              {user && user.username}
            </span>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end text-dark p-0 shadow bg-dark"
            aria-labelledby="navbarDropdown"
            style={{ fontSize: "8pt" }}
          >
            <div
              className="side-bar-content ps-3 p-2 text-light"
              onClick={() => navigate("/profile")}
            >
              <div className="link-title-icon">Profile</div>
              <div className="link-title-icon">
                <FontAwesomeIcon
                  className="text-light bell-icon"
                  style={{ fontSize: "15pt" }}
                  icon={faUserCircle}
                />
              </div>
            </div>

            {profiles &&
              profiles.map((profile) => (
                <div
                  className="side-bar-content ps-3 p-2 text-light"
                  onClick={() => navigate(`/private/${profile.id}`)}
                >
                  <div className="link-title-icon">Post</div>
                  <div className="link-title-icon">
                    <FontAwesomeIcon
                      className="text-light bell-icon"
                      style={{ fontSize: "15pt" }}
                      icon={faPencilAlt}
                    />
                  </div>
                </div>
              ))}

            <div className="side-bar-content ps-3 p-2 text-light">
              <div className="link-title-icon">Settings</div>
              <div className="link-title-icon">
                <FontAwesomeIcon
                  className="text-light bell-icon"
                  style={{ fontSize: "15pt" }}
                  icon={faCog}
                />
              </div>
            </div>

            <div className="side-bar-content ps-3 p-2" onClick={onLogout}>
              <div className="link-title-icon text-light">Logout</div>
              <div className="link-title-icon">
                <FontAwesomeIcon
                  className="text-light bell-icon"
                  style={{ fontSize: "15pt" }}
                  icon={faSignOutAlt}
                />
              </div>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>; */
}
