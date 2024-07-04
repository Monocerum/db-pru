import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const EmployerProfile = () => {
  const [employer, setEmployer] = useState({});
  const [initialState, setInitialState] = useState({});
  const [editActive, setEditStatus] = useState(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const ApplicantID = searchParams.get("applicantID");
  const EmployerCode = searchParams.get("employerCode");

  useEffect(() => {
    if (ApplicantID && EmployerCode) {
      axios
        .get(`http://localhost:5020/employers/${ApplicantID}/${EmployerCode}`)
        .then((response) => {
          setEmployer(response.data);
          setInitialState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ApplicantID, EmployerCode, location.search]);

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
      setEmployer(initialState);
    }
  };

  const saveEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setEditStatus(false);
      axios
        .put(`http://localhost:5020/employers/${EmployerCode}`, employer)
        .then((response) => {
          setEmployer(employer);
          console.log("Save successful");
        })
        .catch((error) => {
          setEmployer(initialState);
          console.error("Error saving changes: ", error.response ? error.response.data : error.message);
          alert("Please input appropriate values");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployer((prevState) => ({ ...prevState, [name]: value }));
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
        value={value || ""}
        onChange={handleChange}
        disabled={!editActive}
        onClick={e => console.log(name + value)}
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
                <div className="info" key={EmployerCode}>
                  <label htmlFor={EmployerCode} className="info-label">
                    {"Employer Code"}
                  </label>
                  <br />
                  <input
                    className="info-input"
                    type="text"
                    id={EmployerCode}
                    name={EmployerCode}
                    value={employer.EmployerCode}
                    disabled
                  />
                </div>
                  {newInput(
                    "Name", 
                    "EmpOrBusName", 
                    employer.EmpOrBusName
                  )}
                  {newInput(
                    "Nature of Work/Business",
                    "EmpOrBusNature",
                    employer.EmpOrBusNature
                  )}
                  {newInput(
                    "Telephone Number",
                    "EmpOrBusTelNo",
                    employer.EmpOrBusTelNo
                  )}
                  {newInput(
                    "Present Address",
                    "EmpOrBusAdrs",
                    employer.EmpOrBusAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "EmpOrBusCountry",
                    employer.EmpOrBusCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "EmpOrBusZIP",
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
                    to={`/userProfile?applicantID=${ApplicantID}&employerCode=${employer.EmployerCode}`}
                    className="user nav-label"
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
                    to={`/beneficiaryProfile?applicantID=${employer.ApplicantID}`}
                    className={`beneficiary nav-label ${
                      activePage.pathname === "/employerProfile"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (activePage.pathname === "/employerProfile") {
                        e.preventDefault();
                      }
                    }}
                  >
                    Beneficiary
                  </Link>
                </li>
                <li
                  className={`display-nav ${
                    activePage.pathname === "/employerProfile" ? "active" : ""
                  }`}
                >
                  <Link
                    to={`/employerProfile?applicantID=${ApplicantID}&employerCode=${employer.EmployerCode}`}
                    className="employer nav-label"
                  >
                    Employer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="return-db">
              <Link to="/dbMembers" className="return-profile">
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
