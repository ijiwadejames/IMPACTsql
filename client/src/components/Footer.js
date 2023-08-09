/** @format */

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="col-12 text-center">
      {!user && (
        <div
          className="col-12 bg-light text-dark text-center mt-5 mb-0"
          style={{
            fontSize: "8pt",
            position: "fixed",
            bottom: "0px",
            borderTop: "2px solid rgba(0,0,0,.08)",
          }}
        >
          Policies | <Link to="/about">About Us</Link> | Career <br />
          <strong>&copy; 2023, IMPACTVerse. All Rights Reserved</strong>
        </div>
      )}
    </div>
  );
};

export default Footer;
