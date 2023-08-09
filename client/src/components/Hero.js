/** @format */

import React from "react";
import slider from "../components/images/lady.jpeg";
import slider1 from "../components/images/socialbg.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slider} className="d-block w-100" alt="Slider Image 1" />
          </div>
        </div>
      </div>
      <div className="hero-content text-center">
        <h1 className="text-primary">Welcome to ImpactVerse</h1>
        <p className="text-dark fw-semibold">
          Connect, inspire, and make an impact!
        </p>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#DA3E10" }}
          onClick={() => navigate("/login")}
        >
          Login Now
        </button>{" "}
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#DA3E10" }}
          onClick={() => navigate("/register")}
        >
          Join Now
        </button>{" "}
      </div>
    </div>
  );
};

export default Hero;
