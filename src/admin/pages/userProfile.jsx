import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const UserProfile = () => {
  const [initialState, setInitialState] = useState({});
  const [applicant, setApplicant] = useState([]);
  const [editActive, setEditStatus] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ApplicantID = searchParams.get("applicantID");
  const autoEdit = searchParams.get("autoEdit");

  useEffect(() => {
    if (ApplicantID) {
      axios
        .get(`http://localhost:5020/applicants/${ApplicantID}`)
        .then((response) => {
          setApplicant(response.data);
          setInitialState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (autoEdit === "true") {
      setEditStatus(true);
    }
  }, [ApplicantID, location.search]);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the user profile?")) {
      setEditStatus(true);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setEditStatus(false);
      setApplicant(initialState);
    }
  };

  const saveEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setEditStatus(false);
      axios
        .put(`http://localhost:5020/applicants/${ApplicantID}`, applicant)
        .then((response) => {
          setApplicant(applicant);
          console.log("Save successful");
        })
        .catch((error) => {
          setApplicant(initialState);
          console.error("Error saving changes: ", error.response ? error.response.data : error.message);
          alert("Please input appropriate values");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prevState) => ({ ...prevState, [name]: value }));
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
        onChange={handleChange}
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
            <div className="member-info">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-salutation">{applicant.Salutation}</span>{" "}
                    <span id="main-name">{applicant.ApplicantName}</span>
                  </h2>
                  <h3>Company Name</h3>
                </div>
                <div className="edit">
                  <button
                    className={`edit-btn ${editActive ? "active" : ""}`}
                    id="userEdit"
                    onClick={EditProfile}
                    hidden={editActive}
                  >
                    EDIT
                  </button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Applicant Details</h3>
                </div>
                <div className="user-info">
                  {newInput(
                    "Membership Number",
                    "ApplicantID",
                    applicant.ApplicantID
                  )}
                  {newInput("Name", 
                    "ApplicantName", 
                    applicant.ApplicantName
                  )}
                  {newInput(
                    "Salutation",
                    "Salutation",
                    applicant.Salutation
                  )}
                  {newInput(
                    "Other Legal Name/Alias",
                    "Alias",
                    applicant.Alias
                  )}
                  {newInput(
                    "Age", 
                    "Age", 
                    applicant.Age
                  )}
                  {newInput(
                    "Sex", 
                    "Sex", 
                    applicant.Sex
                  )}
                  {newInput(
                    "Date of Birth", 
                    "Birthdate", 
                    applicant.Birthdate
                  )}
                  {newInput(
                    "Place of Birth",
                    "Birthplace",
                    applicant.Birthplace
                  )}
                  {newInput("Civil Status", "memberCS", applicant.CivilStatus)}
                  {newInput(
                    "Nationality",
                    "Nationality",
                    applicant.Nationality
                  )}
                  {newInput(
                    "Height", 
                    "Height", 
                    applicant.Height
                  )}
                  {newInput(
                    "Weight", 
                    "Weight", 
                    applicant.Weight
                  )}
                  {newInput(
                    "Mobile Number",
                    "MobileNumber",
                    applicant.MobileNumber
                  )}
                  {newInput(
                    "Telephone Number", 
                    "TelNo", 
                    applicant.TelNo
                  )}
                  {newInput(
                    "Email Address",
                    "EmailAddress",
                    applicant.EmailAddress
                  )}
                  {newInput(
                    "Present Address",
                    "PresentAddress",
                    applicant.PresentAddress
                  )}
                  {newInput(
                    "Present Country",
                    "PrsntAdrsCountry",
                    applicant.PrsntAdrsCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "PrsntAdrsZIP",
                    applicant.PrsntAdrsZIP
                  )}
                  {newInput(
                    "Permanent Address",
                    "PermanentAddress",
                    applicant.PermanentAddress
                  )}
                  {newInput(
                    "Permanent Country",
                    "PermntAdrsCountry",
                    applicant.PermntAdrsCountry
                  )}
                  {newInput(
                    "Permanent ZIP Code",
                    "PermntAdrsZIP",
                    applicant.PermntAdrsZIP
                  )}
                  {newInput(
                    "Occupation",
                    "Occupation",
                    applicant.Occupation
                  )}
                  {newInput(
                    "Position", 
                    "Position", 
                    applicant.Position
                  )}
                  {newInput(
                    "Nature of Work/Business",
                    "ApplicantWorkNature",
                    applicant.ApplicantWorkNature
                  )}
                  {newInput(
                    "Source of Funds",
                    "SourceOfFunds",
                    applicant.SourceOfFunds
                  )}
                  {newInput(
                    "Gross Annual Income",
                    "GrossAnnualIncome",
                    applicant.GrossAnnualIncome
                  )}
                  {newInput(
                    "Net Worth", 
                    "NetWorth", 
                    applicant.NetWorth
                  )}
                  {newInput(
                    "Date Hired", 
                    "DateHired", 
                    applicant.DateHired
                  )}
                  {newInput(
                    "Date of Regularization",
                    "DateOfRegularization",
                    applicant.DateOfRegularization
                  )}
                  {newInput(
                    "Monthly Income",
                    "MonthlyIncome",
                    applicant.MonthlyIncome
                  )}
                  {newInput(
                    "SSS/GSIS Number", 
                    "SSSID", 
                    applicant.SSSID
                  )}
                  {newInput(
                    "TIN ID", 
                    "memberTIN", 
                    applicant.TINID
                  )}
                  {newInput(
                    "Other ID #1 Name",
                    "OtherID",
                    applicant.OtherID
                  )}
                  {newInput(
                    "Other ID #1 Number",
                    "OtherIDNumber",
                    applicant.OtherIDNumber
                  )}
                  {newInput(
                    "Other ID #2 Name",
                    "OtherID2",
                    applicant.OtherID2
                  )}
                  {newInput(
                    "Other ID #2 Number",
                    "OtherID2Number",
                    applicant.OtherID2Number
                  )}
                  {newInput(
                    "Employer Number",
                    "EmployerCode",
                    applicant.EmployerCode
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
                    to={`/userProfile?applicantID=${applicant.ApplicantID}`}
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
                    to={`/beneficiaryProfile?applicantID=${applicant.ApplicantID}`}
                    className="beneficiary nav-label"
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
                    to={`/employerProfile?applicantID=${applicant.ApplicantID}&employerCode=${applicant.EmployerCode}`}
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

export default UserProfile;
