/** @format */

import React from "react";
import globe from "./images/social.jpg";
import icon from "./images/background2.png";
const Features = () => {
  return (
    <div className="features">
      <div className="container bg-white border-1 rounded-1">
        <h2 className="text-center p-2 text-primary">Key Features</h2>
        <div className="row">
          <div className="col-lg-4">
            <img
              src={globe}
              className="img-fluid features_image"
              alt="Feature Icon 1"
            />
            <h3 className="features_subheadings">Connect with Mentors</h3>
            <p>
              Awesome opportunity to connect with individuals who are
              professionals in your area of interest.
            </p>
          </div>

          <div className="col-lg-4">
            <img
              src={icon}
              className="img-fluid features_image"
              alt="Feature Icon 2"
            />
            <h3 className="features_subheadings">
              Fing who shares your interest
            </h3>
            <p>
              Build meaningful connections with people who share your interests
              and passion for making a positive impact.
            </p>
          </div>

          <div className="col-lg-4">
            <img
              src={globe}
              className="img-fluid features_image"
              alt="Feature Icon 3"
            />
            <h3 className="features_subheadings">Explore inspiring content</h3>
            <p>
              Discover uplifting stories, projects, and initiatives that are
              driving positive change around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
