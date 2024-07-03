import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

function Home() {
  return (
    <>
      <div>
        <main>
          <div className="main">
            <div className="header">
              <div className="profile-hero">
                <div className="hero-img">
                  <img
                    src={PruLogo}
                    alt="Pru Life U.K."
                    className="profile-img"
                  />
                </div>
                <div className="hero-text">
                  <h1>PRU LIFE U.K.</h1>
                  <h2>Group Term Life Insurance</h2>
                  <h3>Individual Application</h3>
                  <input
                    className="search"
                    type="text"
                    placeholder="Search Employee, Beneficiary, Employee"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-rectangle">
              <div className="dashboard">
                <h2 className="text">DASHBOARD</h2>
                <hr />
                <div className="dashboard-container">
                  <div className="num-container" id="numContainer1">
                    <div className="memberNum total-container">
                      <h2>40</h2>
                      <p>Total Number of Members</p>
                    </div>
                  </div>
                  <div className="num-container" id="numContainer2">
                    <div className="beneficiaryNum total-container">
                      <h2>40</h2>
                      <p>Total Number of Beneficiaries</p>
                    </div>
                  </div>
                  <div className="num-container" id="numContainer3">
                    <div className="employernum total-container">
                      <h2>40</h2>
                      <p>Total Number of Employers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-container">
              <div className="recent-rectangle">
                <h3 className="recent-text">Recent Members</h3>
                <hr />
              </div>
              <div className="recent-rectangle">
                <h3 className="recent-text">Recent Beneficiaries</h3>
                <hr />
              </div>
              <div className="recent-rectangle">
                <h3 className="recent-text">Top Employers</h3>
                <hr />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;