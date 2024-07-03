import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const BeneficiaryDetails = () => {
  const [beneficiary, setBeneficiary] = useState({});

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ApplicantID = searchParams.get("applicantID");
    const BeneficiaryCode = searchParams.get("beneficiaryCode");

    console.log(ApplicantID);

    if (ApplicantID) {
      axios
        .get(
          `http://localhost:5020/beneficiaries/${ApplicantID}/${BeneficiaryCode}`
        )
        .then((response) => {
          setBeneficiary(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

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
                      {beneficiary.BeneficiaryName}
                    </span>
                  </h2>
                  <h3>Beneficiary of {beneficiary.ApplicantName}</h3>
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
                    beneficiary.BeneficiaryCode
                  )}
                  {newInput(
                    "Name",
                    "beneficiary2Name",
                    beneficiary.BeneficiaryName
                  )}
                  {newInput(
                    "Sex",
                    "beneficiary2Sex",
                    beneficiary.BeneficiarySex
                  )}
                  {newInput(
                    "Date of Birth",
                    "beneficiary2DOB",
                    beneficiary.BeneficiaryDOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "beneficiary2Rel",
                    beneficiary.BeneficiaryRelationship
                  )}
                  {newInput(
                    "% Share",
                    "beneficiary2Share",
                    beneficiary.BeneficiaryPrcntShare
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "beneficiary2Type",
                    beneficiary.BeneficiaryType
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "beneficiary2Desig",
                    beneficiary.BeneficiaryDesignation
                  )}
                  {newInput(
                    "Place of Birth",
                    "beneficiary2POB",
                    beneficiary.BeneficiaryPOB
                  )}
                  {newInput(
                    "Nationality",
                    "beneficiary2Nationality",
                    beneficiary.BeneficiaryNationality
                  )}
                  {newInput(
                    "Present Address",
                    "beneficiary2PsAdrs",
                    beneficiary.BeneficiaryPrsntAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "beneficiary2PsCountry",
                    beneficiary.BeneficiaryCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "beneficiary2PsZip",
                    beneficiary.BeneficiaryZIP
                  )}
                  {newInput(
                    "Mobile Number",
                    "beneficiary2Mobile",
                    beneficiary.BeneficiaryMobileNum
                  )}
                  {newInput(
                    "Telephone Number",
                    "beneficiary2Telno",
                    beneficiary.BeneficiaryTelNo
                  )}
                  {newInput(
                    "Email Address",
                    "beneficiary2Email",
                    beneficiary.BeneficiaryEmailAdrs
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
                    to={`/userProfile?applicantID=${beneficiary.ApplicantID}&beneficiaryCode=${beneficiary.BeneficiaryCode}`}
                    className="user nav-label"
                  >
                    Member
                  </Link>
                </li>
                <li
                  className={`display-nav ${
                    activePage.pathname === "/beneficiaryDetails"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    to={`/beneficiaryDetails?applicantID=${beneficiary.ApplicantID}&beneficiaryCode=${beneficiary.BeneficiaryCode}`}
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
                    to={`/employerProfile?applicantID=${beneficiary.ApplicantID}&beneficiaryCode=${beneficiary.BeneficiaryCode}`}
                    className={`employer nav-label ${
                      activePage.pathname === "/beneficiaryDetails"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (activePage.pathname === "/beneficiaryDetails") {
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
              <Link to="/dbBeneficiaries" className="return-profile">
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

export default BeneficiaryDetails;
