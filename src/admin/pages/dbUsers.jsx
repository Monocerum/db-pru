import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBUsers() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5020/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <SideNav />
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
                <h2 className="db-name">Users</h2>
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
                      <th>User ID</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((u, key) => (
                      <tr key={key}>
                        <td className="data-container user-data">
                          <i className="bx bx-show-alt"></i>
                        </td>
                        <td className="data-container user-data">
                          <i className="bx bx-edit"></i>
                        </td>
                        <td className="data-container user-data">
                          <i className="bx bx-trash"></i>
                        </td>
                        <td className="data-container user-data">{u.UserID}</td>
                        <td className="data-container user-data">
                          {u.EmailAddress}
                        </td>
                        <td className="data-container user-data">
                          {u.Username}
                        </td>
                        <td className="data-container user-data">
                          {u.Password}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="info-nav">
                <ul>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbUsers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbUsers" className="user nav-label">
                      User
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbMembers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbMembers" className="applicant nav-label">
                      Member
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbBeneficiaries" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/dbBeneficiaries"
                      className="beneficiary nav-label"
                    >
                      Beneficiary
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbEmployers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbEmployers" className="employer nav-label">
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