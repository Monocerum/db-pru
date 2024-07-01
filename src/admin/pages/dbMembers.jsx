import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles.css";
import PruLogo from "../../assets/pru-logo.svg";
import PruLogoWhite from "../../assets/pru-logo-white.png";

function DBMembers() {
  const [isActive, setActive] = useState(false);

  const toggleSidebar = () => {
    setActive(!isActive);
  };

  const activePage = useLocation();

  return (
    <>
      <div>
        <main className="cont">
          <div className={`nav-sidebar ${isActive ? "active" : ""}`}>
            <div className="nav-sidebar-content">
              <div className="top">
                <div className="logo">
                  <img
                    src={PruLogoWhite}
                    alt="Pru Life Logo"
                    className="sidenav-logo"
                  />
                  <span>PRU LIFE U.K.</span>
                </div>
              </div>
              <ul className="nav-list">
                <li>
                  <i
                    className="bx bx-menu-alt-left"
                    id="btnMenu"
                    onClick={toggleSidebar}
                  ></i>
                </li>
                <li>
                  <Link to="/home">
                    <i className="bx bx-grid-alt"></i>
                    <span className="nav-item">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dbMembers">
                    <i className="bx bx-user"></i>
                    <span className="nav-item">Members</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="bx bx-file"></i>
                    <span className="nav-item">Employers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="bx bx-user-check"></i>
                    <span className="nav-item">Beneficiaries</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <i className="bx bx-log-out-circle"></i>
                    <span className="nav-item">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
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
                </div>
              </div>
            </div>
            <div className="db-container">
              <div className="db-header">
                <h2 className="db-name">Members</h2>
                <div className="action-buttons">
                  <ul>
                    <Link to="/apply" className="upload-button action-btn">
                      Upload
                    </Link>
                    <Link to="/apply" className="add-button action-btn">
                      Add
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    placeholder="Search Employee, Beneficiary, Employee"
                  />
                  <button className="search-button">Search</button>
                </div>
                <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>ID</th>
                      <th>Employer or Business Code</th>
                      <th>Name</th>
                      <th>Salutation</th>
                      <th>Alias</th>
                      <th>Age</th>
                      <th>Birthdate</th>
                      <th>Birthplace</th>
                      <th>Civil Status</th>
                      <th>Nationality</th>
                      <th>Height</th>
                      <th>Weight</th>
                      <th>Sex</th>
                      <th>Present Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
                      <th>Permanent Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
                      <th>Occupation</th>
                      <th>Position</th>
                      <th>Nature of Work/Business</th>
                      <th>Source of Funds</th>
                      <th>Gross Annual Income</th>
                      <th>Net Worth</th>
                      <th>Date Hired</th>
                      <th>Date of Regularization</th>
                      <th>Monthly Income</th>
                      <th>SSS ID</th>
                      <th>TIN ID</th>
                      <th>Other ID</th>
                      <th>Other ID Number</th>
                      <th>Other ID #2</th>
                      <th>Other ID #2 Number</th>
                      <th>Mobile Number</th>
                      <th>Telephone Number</th>
                      <th>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="data-container"></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div className="page">
                  <span className="page-num">Page 1/5</span>
                  <div className="page-linkto">
                    <span className="prev-page">Previous</span>
                    <span className="next-page">Next</span>
                  </div>
                </div>
              </div>
              <div className="info-nav">
                <ul>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbMembers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbMembers" className="user">
                      Member
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/beneficiaryProfile"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link to="/" className="b1">
                      Beneficiary
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/employerProfile" ? "active" : ""
                    }`}
                  >
                    <Link to="/" className="employer">
                      Employer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DBMembers;
