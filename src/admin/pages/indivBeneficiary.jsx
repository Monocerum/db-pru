import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

const BeneficiaryDetails = () => {
  const [beneficiary, setBeneficiary] = useState({});
  const [initialState, setInitialState] = useState({});
  const [editActive, setEditStatus] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ApplicantID = searchParams.get("applicantID");
  const BeneficiaryCode = searchParams.get("beneficiaryCode");
  const autoEdit = searchParams.get("autoEdit");

  useEffect(() => {
    if (ApplicantID && BeneficiaryCode) {
      axios
        .get(
          `http://localhost:5020/beneficiaries/${ApplicantID}/${BeneficiaryCode}`
        )
        .then((response) => {
          setBeneficiary(response.data);
          setInitialState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (autoEdit === "true") {
      setEditStatus(true);
    }
  }, [location.search]);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the beneficiary profile?")) {
      setEditStatus(true);
    }
  };

  const cancelEdit = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      setEditStatus(false);
      setBeneficiary(initialState);
    }
  };

  const saveEdit = () => {
    if (window.confirm("Do you want to save?")) {
      setEditStatus(false);

      axios
        .put(`http://localhost:5020/beneficiaries/${ApplicantID}/${beneficiary.BeneficiaryCode}`, beneficiary)
        .then((response) => {
          setBeneficiary(beneficiary);
          console.log("Save successful");
        })
        .catch((error) => {
          setBeneficiary(initialState);
          console.error("Error saving changes: ", error.response ? error.response.data : error.message);
          alert("Please input appropriate values");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeneficiary((prevState) => ({ ...prevState, [name]: value }));
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
                      value={beneficiary.BeneficiaryCode}
                      disabled
                    />
                  </div>
                  {newInput(
                    "Name",
                    "BeneficiaryName",
                    beneficiary.BeneficiaryName
                  )}
                  {newInput(
                    "Sex",
                    "BeneficiarySex",
                    beneficiary.BeneficiarySex
                  )}
                  {newInput(
                    "Date of Birth",
                    "BeneficiaryDOB",
                    beneficiary.BeneficiaryDOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "BeneficiaryRelationship",
                    beneficiary.BeneficiaryRelationship
                  )}
                  {newInput(
                    "% Share",
                    "BeneficiaryPrcntShare",
                    beneficiary.BeneficiaryPrcntShare
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "BeneficiaryType",
                    beneficiary.BeneficiaryType
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "BeneficiaryDesignation",
                    beneficiary.BeneficiaryDesignation
                  )}
                  {newInput(
                    "Place of Birth",
                    "BeneficiaryPOB",
                    beneficiary.BeneficiaryPOB
                  )}
                  {newInput(
                    "Nationality",
                    "BeneficiaryNationality",
                    beneficiary.BeneficiaryNationality
                  )}
                  {newInput(
                    "Present Address",
                    "BeneficiaryPrsntAdrs",
                    beneficiary.BeneficiaryPrsntAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "BeneficiaryCountry",
                    beneficiary.BeneficiaryCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "BeneficiaryZIP",
                    beneficiary.BeneficiaryZIP
                  )}
                  {newInput(
                    "Mobile Number",
                    "BeneficiaryMobileNum",
                    beneficiary.BeneficiaryMobileNum
                  )}
                  {newInput(
                    "Telephone Number",
                    "BeneficiaryTelNo",
                    beneficiary.BeneficiaryTelNo
                  )}
                  {newInput(
                    "Email Address",
                    "BeneficiaryEmailAdrs",
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
