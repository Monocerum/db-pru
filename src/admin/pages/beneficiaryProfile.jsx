import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const BeneficiaryProfile = () => {
  const [primary, setPrimary] = useState({});
  const [secondary, setSecondary] = useState({});
  const [primaryInitialState, setPrimaryInitialState] = useState({});
  const [secondaryInitialState, setSecondaryInitialState] = useState({});
  const [primaryEditActive, setPrimaryEditStatus] = useState(false);
  const [secondaryEditActive, setSecondaryEditStatus] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ApplicantID = searchParams.get("applicantID");

  useEffect(() => {
    if (ApplicantID) {
      axios
        .get(`http://localhost:5020/primarybeneficiaries/${ApplicantID}`)
        .then((response) => {
          setPrimary(response.data);
          setPrimaryInitialState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`http://localhost:5020/secondarybeneficiaries/${ApplicantID}`)
        .then((response) => {
          setSecondary(response.data);
          setSecondaryInitialState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  const EditPrimaryProfile = () => {
    if (window.confirm("Do you want to edit the primary beneficiary profile?")) {
      setPrimaryEditStatus(true);
    }
  };

  const EditSecondaryProfile = () => {
    if (window.confirm("Do you want to edit the secondary beneficiary profile?")) {
      setSecondaryEditStatus(true);
    }
  };

  const cancelPrimaryEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setPrimaryEditStatus(false);
      setPrimary(primaryInitialState);
    }
  };

  const cancelSecondaryEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setSecondaryEditStatus(false);
      setSecondary(secondaryInitialState);
    }
  };

  const savePrimaryEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setPrimaryEditStatus(false);
      axios
        .put(`http://localhost:5020/beneficiaries/${ApplicantID}/${primary.BeneficiaryCode}`, primary)
        .then((response) => {
          setPrimary(primary);
          console.log("Save successful");
        })
        .catch((error) => {
          setPrimary(primaryInitialState);
          console.error("Error saving changes: ", error.response ? error.response.data : error.message);
          alert("Please input appropriate values");
        });
    }
  };

  const saveSecondaryEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setSecondaryEditStatus(false);
      axios
        .put(`http://localhost:5020/beneficiaries/${ApplicantID}/${secondary.BeneficiaryCode}`, secondary)
        .then((response) => {
          setSecondary(secondary);
          console.log("Save successful");
        })
        .catch((error) => {
          setSecondary(secondaryInitialState);
          console.error("Error saving changes: ", error.response ? error.response.data : error.message);
          alert("Please input appropriate values");
        });
    }
  };

  const handlePrimaryChange = (e) => {
    const { name, value } = e.target;
    setPrimary((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSecondaryChange = (e) => {
    const { name, value } = e.target;
    setSecondary((prevState) => ({ ...prevState, [name]: value }));
  };

  const newPrimaryInput = (label, name, value) => (
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
        onChange={handlePrimaryChange}
        disabled={!primaryEditActive}
      />
    </div>
  );

  const newSecondaryInput = (label, name, value) => (
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
        onChange={handleSecondaryChange}
        disabled={!secondaryEditActive}
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
            <div className="primary">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-name beneficiary1Name">
                      {primary.BeneficiaryName}
                    </span>
                  </h2>
                  <h3>Primary Beneficiary of {primary.ApplicantName}</h3>
                </div>
                <div className="edit">
                  <button
                    className={`edit-btn ${primaryEditActive ? "active" : ""}`}
                    id="userEdit"
                    onClick={EditPrimaryProfile}
                    hidden={primaryEditActive}
                  >
                    EDIT
                  </button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Beneficiary Details</h3>
                </div>
                <div className="beneficiary-info">
                  <div className="info" key={"BeneficiaryCode"}>
                    <label htmlFor={"BeneficiaryCode"} className="info-label">
                      {"Beneficiary Number"}
                    </label>
                    <br />
                    <input
                      className="info-input"
                      type="text"
                      id={"BeneficiaryCode"}
                      name={"BeneficiaryCode"}
                      value={primary.BeneficiaryCode}
                      disabled
                    />
                  </div>
                  {newPrimaryInput(
                    "Name",
                    "BeneficiaryName",
                    primary.BeneficiaryName
                  )}
                  {newPrimaryInput(
                    "Sex", 
                    "BeneficiarySex", 
                    primary.BeneficiarySex
                  )}
                  {newPrimaryInput(
                    "Date of Birth",
                    "BeneficiaryDOB",
                    primary.BeneficiaryDOB
                  )}
                  {newPrimaryInput(
                    "Relationship to Insured",
                    "BeneficiaryRelationship",
                    primary.BeneficiaryRelationship
                  )}
                  {newPrimaryInput(
                    "% Share",
                    "BeneficiaryPrcntShare",
                    primary.BeneficiaryPrcntShare
                  )}
                  {newPrimaryInput(
                    "Type of Beneficiary",
                    "BeneficiaryType",
                    primary.BeneficiaryType
                  )}
                  {newPrimaryInput(
                    "Beneficiary Designation",
                    "BeneficiaryDesignation",
                    primary.BeneficiaryDesignation
                  )}
                  {newPrimaryInput(
                    "Place of Birth",
                    "BeneficiaryPOB",
                    primary.BeneficiaryPOB
                  )}
                  {newPrimaryInput(
                    "Nationality",
                    "BeneficiaryNationality",
                    primary.BeneficiaryNationality
                  )}
                  {newPrimaryInput(
                    "Present Address",
                    "BeneficiaryPrsntAdrs",
                    primary.BeneficiaryPrsntAdrs
                  )}
                  {newPrimaryInput(
                    "Present Country",
                    "BeneficiaryCountry",
                    primary.BeneficiaryCountry
                  )}
                  {newPrimaryInput(
                    "Present ZIP Code",
                    "BeneficiaryZIP",
                    primary.BeneficiaryZIP
                  )}
                  {newPrimaryInput(
                    "Mobile Number",
                    "BeneficiaryMobileNum",
                    primary.BeneficiaryMobileNum
                  )}
                  {newPrimaryInput(
                    "Telephone Number",
                    "BeneficiaryTelNo",
                    primary.BeneficiaryTelNo
                  )}
                  {newPrimaryInput(
                    "Email Address",
                    "BeneficiaryEmailAdrs",
                    primary.BeneficiaryEmailAdrs
                  )}
                  <div className="btns">
                    <div className="cancel">
                      <button
                        className="cancel-btn"
                        id="userCancel"
                        onClick={cancelPrimaryEdit}
                        hidden={!primaryEditActive}
                      >
                        CANCEL EDITING
                      </button>
                    </div>
                    <div className="save">
                      <button
                        className="save-btn"
                        id="userSave"
                        onClick={savePrimaryEdit}
                        hidden={!primaryEditActive}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-name beneficiary2Name">
                      {secondary.BeneficiaryName}
                    </span>
                  </h2>
                  <h3>Secondary Beneficiary of {secondary.ApplicantName}</h3>
                </div>
                <div className="edit">
                  <button
                    className={`edit-btn ${secondaryEditActive ? "active" : ""}`}
                    id="userEdit"
                    onClick={EditSecondaryProfile}
                    hidden={secondaryEditActive}
                  >
                    EDIT
                  </button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Beneficiary Details</h3>
                </div>
                <div className="beneficiary-info">
                  <div className="info" key={"BeneficiaryCode"}>
                    <label htmlFor={"BeneficiaryCode"} className="info-label">
                      {"Beneficiary Number"}
                    </label>
                    <br />
                    <input
                      className="info-input"
                      type="text"
                      id={"BeneficiaryCode"}
                      name={"BeneficiaryCode"}
                      value={secondary.BeneficiaryCode}
                      disabled
                    />
                  </div>
                  {newSecondaryInput(
                    "Name",
                    "BeneficiaryName",
                    secondary.BeneficiaryName
                  )}
                  {newSecondaryInput(
                    "Sex", 
                    "BeneficiarySex", 
                    secondary.BeneficiarySex
                  )}
                  {newSecondaryInput(
                    "Date of Birth",
                    "BeneficiaryDOB",
                    secondary.BeneficiaryDOB
                  )}
                  {newSecondaryInput(
                    "Relationship to Insured",
                    "BeneficiaryRelationship",
                    secondary.BeneficiaryRelationship
                  )}
                  {newSecondaryInput(
                    "% Share",
                    "BeneficiaryPrcntShare",
                    secondary.BeneficiaryPrcntShare
                  )}
                  {newSecondaryInput(
                    "Type of Beneficiary",
                    "BeneficiaryType",
                    secondary.BeneficiaryType
                  )}
                  {newSecondaryInput(
                    "Beneficiary Designation",
                    "BeneficiaryDesignation",
                    secondary.BeneficiaryDesignation
                  )}
                  {newSecondaryInput(
                    "Place of Birth",
                    "BeneficiaryPOB",
                    secondary.BeneficiaryPOB
                  )}
                  {newSecondaryInput(
                    "Nationality",
                    "BeneficiaryNationality",
                    secondary.BeneficiaryNationality
                  )}
                  {newSecondaryInput(
                    "Present Address",
                    "BeneficiaryPrsntAdrs",
                    secondary.BeneficiaryPrsntAdrs
                  )}
                  {newSecondaryInput(
                    "Present Country",
                    "BeneficiaryCountry",
                    secondary.BeneficiaryCountry
                  )}
                  {newSecondaryInput(
                    "Present ZIP Code",
                    "BeneficiaryZIP",
                    secondary.BeneficiaryZIP
                  )}
                  {newSecondaryInput(
                    "Mobile Number",
                    "BeneficiaryMobileNum",
                    secondary.BeneficiaryMobileNum
                  )}
                  {newSecondaryInput(
                    "Telephone Number",
                    "BeneficiaryTelNo",
                    secondary.BeneficiaryTelNo
                  )}
                  {newSecondaryInput(
                    "Email Address",
                    "BeneficiaryEmailAdrs",
                    secondary.BeneficiaryEmailAdrs
                  )}
                  <div className="btns">
                    <div className="cancel">
                      <button
                        className="cancel-btn"
                        id="userCancel"
                        onClick={cancelSecondaryEdit}
                        hidden={!secondaryEditActive}
                      >
                        CANCEL EDITING
                      </button>
                    </div>
                    <div className="save">
                      <button
                        className="save-btn"
                        id="userSave"
                        onClick={saveSecondaryEdit}
                        hidden={!secondaryEditActive}
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
                    to={`/userProfile?applicantID=${primary.ApplicantID}`}
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
                    to={`/beneficiaryProfile?applicantID=${primary.ApplicantID}`}
                    className={`beneficiary nav-label ${
                      activePage.pathname === "/employerProfile"
                        ? "disabled"
                        : ""
                    }`}
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
                    to={`/employerProfile?employerCode=${primary.ApplicantID}`}
                    className={`employer nav-label ${
                      activePage.pathname === "/beneficiaryProfile"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (activePage.pathname === "/beneficiaryProfile") {
                        e.preventDefault();
                      }
                    }}
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

export default BeneficiaryProfile;
