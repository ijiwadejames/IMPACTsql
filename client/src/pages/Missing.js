/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  return (
    <div>
      You seem to be on a wrong route.
      <br />
      If you feel this is in error, please contact the admin.{" "}
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Missing;
