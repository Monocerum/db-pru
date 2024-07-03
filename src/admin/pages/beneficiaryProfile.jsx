import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const BeneficiaryProfile = () => {
  const initialState = {
    beneficiary1Num: "B000001",
    beneficiary1Name: "SURNAME, First Name Middle Name",
    beneficiary1DOB: "[Date of Birth]",
    beneficiary1Sex: "[Sex]",
    beneficiary1Rel: "[Relationship]",
    beneficiary1Share: "[% Share]",
    beneficiary1Type: "[Beneficiary Type]",
    beneficiary1Desig: "[Beneficiary Designation]",
    beneficiary1POB: "[Place of Birth]",
    beneficiary1Nationality: "[Nationality]",
    beneficiary1PsAdrs: "[Present Address]",
    beneficiary1PsCountry: "[Present Country]",
    beneficiary1PsZip: "[Present ZIP Code]",
    beneficiary1Mobile: "[Mobile Number]",
    beneficiary1Telno: "[Telephone Number]",
    beneficiary1Email: "[Email Address]",
    beneficiary2Num: "B000002",
    beneficiary2Name: "SURNAME, First Name Middle Name",
    beneficiary2DOB: "[Date of Birth]",
    beneficiary2Sex: "[Sex]",
    beneficiary2Rel: "[Relationship]",
    beneficiary2Share: "[% Share]",
    beneficiary2Type: "[Beneficiary Type]",
    beneficiary2Desig: "[Beneficiary Designation]",
    beneficiary2POB: "[Place of Birth]",
    beneficiary2Nationality: "[Nationality]",
    beneficiary2PsAdrs: "[Present Address]",
    beneficiary2PsCountry: "[Present Country]",
    beneficiary2PsZip: "[Present ZIP Code]",
    beneficiary2Mobile: "[Mobile Number]",
    beneficiary2Telno: "[Telephone Number]",
    beneficiary2Email: "[Email Address]",
  };

  const [primary, setPrimary] = useState({});
  const [secondary, setSecondary] = useState({});

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ApplicantID = searchParams.get("applicantID");

    console.log(ApplicantID);

    if (ApplicantID) {
      axios
        .get(`http://localhost:5020/primarybeneficiaries/${ApplicantID}`)
        .then((response) => {
          setPrimary(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`http://localhost:5020/secondarybeneficiaries/${ApplicantID}`)
        .then((response) => {
          setSecondary(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  const [state, setState] = useState(initialState);
  const [editActive, setEditStatus] = useState(false);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the beneficiary profile?")) {
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
                  <h3 className="info-header">Beneficiary Details</h3>
                </div>
                <div className="beneficiary-info">
                  {newInput(
                    "Beneficiary Number",
                    "beneficiary2Num",
                    primary.BeneficiaryCode
                  )}
                  {newInput(
                    "Name",
                    "beneficiary2Name",
                    primary.BeneficiaryName
                  )}
                  {newInput("Sex", "beneficiary2Sex", primary.BeneficiarySex)}
                  {newInput(
                    "Date of Birth",
                    "beneficiary2DOB",
                    primary.BeneficiaryDOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "beneficiary2Rel",
                    primary.BeneficiaryRelationship
                  )}
                  {newInput(
                    "% Share",
                    "beneficiary2Share",
                    primary.BeneficiaryPrcntShare
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "beneficiary2Type",
                    primary.BeneficiaryType
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "beneficiary2Desig",
                    primary.BeneficiaryDesignation
                  )}
                  {newInput(
                    "Place of Birth",
                    "beneficiary2POB",
                    primary.BeneficiaryPOB
                  )}
                  {newInput(
                    "Nationality",
                    "beneficiary2Nationality",
                    primary.BeneficiaryNationality
                  )}
                  {newInput(
                    "Present Address",
                    "beneficiary2PsAdrs",
                    primary.BeneficiaryPrsntAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "beneficiary2PsCountry",
                    primary.BeneficiaryCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "beneficiary2PsZip",
                    primary.BeneficiaryZIP
                  )}
                  {newInput(
                    "Mobile Number",
                    "beneficiary2Mobile",
                    primary.BeneficiaryMobileNum
                  )}
                  {newInput(
                    "Telephone Number",
                    "beneficiary2Telno",
                    primary.BeneficiaryTelNo
                  )}
                  {newInput(
                    "Email Address",
                    "beneficiary2Email",
                    primary.BeneficiaryEmailAdrs
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
                  <h3 className="info-header">Beneficiary Details</h3>
                </div>
                <div className="beneficiary-info">
                  {newInput(
                    "Beneficiary Number",
                    "beneficiary2Num",
                    secondary.BeneficiaryCode
                  )}
                  {newInput(
                    "Name",
                    "beneficiary2Name",
                    secondary.BeneficiaryName
                  )}
                  {newInput("Sex", "beneficiary2Sex", secondary.BeneficiarySex)}
                  {newInput(
                    "Date of Birth",
                    "beneficiary2DOB",
                    secondary.BeneficiaryDOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "beneficiary2Rel",
                    secondary.BeneficiaryRelationship
                  )}
                  {newInput(
                    "% Share",
                    "beneficiary2Share",
                    secondary.BeneficiaryPrcntShare
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "beneficiary2Type",
                    secondary.BeneficiaryType
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "beneficiary2Desig",
                    secondary.BeneficiaryDesignation
                  )}
                  {newInput(
                    "Place of Birth",
                    "beneficiary2POB",
                    secondary.BeneficiaryPOB
                  )}
                  {newInput(
                    "Nationality",
                    "beneficiary2Nationality",
                    secondary.BeneficiaryNationality
                  )}
                  {newInput(
                    "Present Address",
                    "beneficiary2PsAdrs",
                    secondary.BeneficiaryPrsntAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "beneficiary2PsCountry",
                    secondary.BeneficiaryCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "beneficiary2PsZip",
                    secondary.BeneficiaryZIP
                  )}
                  {newInput(
                    "Mobile Number",
                    "beneficiary2Mobile",
                    secondary.BeneficiaryMobileNum
                  )}
                  {newInput(
                    "Telephone Number",
                    "beneficiary2Telno",
                    secondary.BeneficiaryTelNo
                  )}
                  {newInput(
                    "Email Address",
                    "beneficiary2Email",
                    secondary.BeneficiaryEmailAdrs
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
