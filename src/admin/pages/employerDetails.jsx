import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const EmployerProfile = () => {
  const [employer, setEmployer] = useState({});

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const EmployerCode = searchParams.get("employerCode");

    if (EmployerCode) {
      axios
        .get(`http://localhost:5020/employers/${EmployerCode}`)
        .then((response) => {
          setEmployer(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  const [editActive, setEditStatus] = useState(false);

  const EditProfile = () => {
    if (
      window.confirm("Do you want to edit the employer/work/business profile?")
    ) {
      setEditStatus(true);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setEditStatus(false);
      setState(initialState);
    }
  };

  const saveEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setEditStatus(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const newInput = (label, name, value) => (
    <div className="info" key={name}>
      <label htmlFor={name} className="info-label">
        {label}
      </label>
      <br />
      <input
        className="info-input"
        type="text"
        id={name}
        name={name}
        value={value}
        disabled={!editActive}
      />
    </div>
  );

  const activePage = useLocation();

  return (
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
              </div>
            </div>
          </div>
          <div className="information">
            <div className="company-info">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-name">{employer.EmpOrBusName}</span>
                  </h2>
                </div>
                <div className="edit">
                  <button
                    className={`edit-btn ${editActive ? "active" : ""}`}
                    id="employerEdit"
                    onClick={EditProfile}
                    hidden={editActive}
                  >
                    EDIT
                  </button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Employer Details</h3>
                </div>
                <div className="employer-info">
                  {newInput(
                    "Employer Number",
                    "employerNum",
                    employer.EmployerCode
                  )}
                  {newInput("Name", "employerName", employer.EmpOrBusName)}
                  {newInput(
                    "Nature of Work/Business",
                    "employerNature",
                    employer.EmpOrBusNature
                  )}
                  {newInput(
                    "Telephone Number",
                    "employerTelno",
                    employer.EmpOrBusTelNo
                  )}
                  {newInput(
                    "Present Address",
                    "employerPsAdrs",
                    employer.EmpOrBusAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "employerPsCountry",
                    employer.EmpOrBusCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "employerPsZip",
                    employer.EmpOrBusZIP
                  )}
                  <div className="btns">
                    <div className="cancel">
                      <button
                        className="cancel-btn"
                        id="userCancel"
                        onClick={cancelEdit}
                        hidden={!editActive}
                      >
                        CANCEL EDITING
                      </button>
                    </div>
                    <div className="save">
                      <button
                        className="save-btn"
                        id="userSave"
                        onClick={saveEdit}
                        hidden={!editActive}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="info-nav">
              <ul>
                <li
                  className={`display-nav ${
                    activePage.pathname === "/userProfile" ? "active" : ""
                  }`}
                >
                  <Link
                    to={`/userProfile`}
                    className={`user nav-label ${
                      activePage.pathname === "/employerDetails"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (activePage.pathname === "/employerDetails") {
                        e.preventDefault();
                      }
                    }}
                  >
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
                  <Link
                    to={`/beneficiaryProfile`}
                    className={`beneficiary nav-label ${
                      activePage.pathname === "/employerDetails"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (activePage.pathname === "/employerDetails") {
                        e.preventDefault();
                      }
                    }}
                  >
                    Beneficiary
                  </Link>
                </li>
                <li
                  className={`display-nav ${
                    activePage.pathname === "/employerDetails" ? "active" : ""
                  }`}
                >
                  <Link
                    to={`/employerDetails?employerCode=${employer.EmployerCode}`}
                    className="employer nav-label"
                  >
                    Employer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="return-db">
              <Link to="/dbEmployers" className="return-profile">
                Return to database.
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default EmployerProfile;
