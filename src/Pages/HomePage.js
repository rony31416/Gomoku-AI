import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import gomuko from "../Images/gom4.jpeg";

const Homepage = () => {
  return (
    <div className="body" style={{ height: "100vh" }}>
      <div className="container">
        <div>
          <div style={{ marginTop: "20px" }}>
            <h1 style={{ color: "white" }}>Welcome to Play</h1>
            <img
              className="img-responsive"
              src={gomuko}
              alt="Gomukoo"
              id="logo"
            />
            <div className="center-container">
              <h2 style={{ color: "white", margin: "20px 0" }}>
                Choose Game Mode
              </h2>
              <Link to="/board?mode=man-vs-man">
                <button className="btnd" style={{ marginRight: "10px" }}>
                  Man vs Man
                </button>
              </Link>
              <Link to="/board?mode=man-vs-ai">
                <button className="btnd">Man vs AI</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
