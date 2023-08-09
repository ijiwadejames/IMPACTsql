/** @format */
import { useState } from "react";
import SideBarIcons from "./SideBarIcons";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const {profiles} = useSelector((state) => state.profiles);

  return (
    <>
      <button
        className="p-1 text-dark border-0 rounded-0 fw-semibold"
        style={{ backgroundColor: "#ffc107" }}
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <FontAwesomeIcon icon={faCirclePlus} /> Menu{" "}
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
      </button>
      {toggleSidebar === true && (
        <div
          className="rounded-0 col-xs-11, col-sm-3 col-md-3 col-lg-2 sideBar text-light"
          style={{ borderRadius: "0 15 15 0" }}
        >
         {profiles && profiles.map((profile) => (
           <SideBarIcons key={profile.id} profile={profile} />
         ))}
        </div>
      )}
    </>
  );
};

export default Menu;
