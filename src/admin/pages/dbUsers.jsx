import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles.css";
import PruLogo from "../../assets/pru-logo.svg";
import PruLogoWhite from "../../assets/pru-logo-white.png";
import API from 'axios';
import axios from 'axios';


function DBUsers() {
  const [user, setUser] = useState([]);

  useEffect(() => {
      // axios.get('http://localhost:5020/applicants')
      // .then(response => {
      //   console.log('Response data:', response.data);
      // })
      // .then(applicant => setApplicant(applicant))
      // .catch(error => {
      //   console.error('There was an error!', error);
      // });
      fetch('http://localhost:5020/users')
      .then(response => response.json())
      .then(user => setUser(user))
      .catch(error => console.error(error));
    });
    
  //   getUserData();
  // })

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
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((u, key) =>
                      <tr key={key}>
                        <td className="data-container"></td>
                        <td className="data-container"></td>
                        <td className="data-container"></td>
                        <td className="data-container">{u.UserID}</td>
                      </tr>
                    )}
                    
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
                      activePage.pathname === "/dbUsers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbUsers" className="user">
                      User
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbMembers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbMembers" className="applicant">
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

export default DBUsers;
