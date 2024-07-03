import React, { useState } from "react";
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
                    <span id="main-name beneficiary2Name">
                      {state.beneficiary2Name}
                    </span>
                  </h2>
                  <h3>Secondary Beneficiary</h3>
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
                    "beneficiary1Num",
                    state.beneficiary1Num
                  )}
                  {newInput("Name", "beneficiary1Name", state.beneficiary1Name)}
                  {newInput("Sex", "beneficiary1Sex", state.beneficiary1Sex)}
                  {newInput(
                    "Date of Birth",
                    "beneficiary1DOB",
                    state.beneficiary1DOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "beneficiary1Rel",
                    state.beneficiary1Rel
                  )}
                  {newInput(
                    "% Share",
                    "beneficiary1Share",
                    state.beneficiary1Share
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "beneficiary1Type",
                    state.beneficiary1Type
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "beneficiary1Desig",
                    state.beneficiary1Desig
                  )}
                  {newInput(
                    "Place of Birth",
                    "beneficiary1POB",
                    state.beneficiary1POB
                  )}
                  {newInput(
                    "Nationality",
                    "beneficiary1Nationality",
                    state.beneficiary1Nationality
                  )}
                  {newInput(
                    "Present Address",
                    "beneficiary1PsAdrs",
                    state.beneficiary1PsAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "beneficiary1PsCountry",
                    state.beneficiary1PsCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "beneficiary1PsZip",
                    state.beneficiary1PsZip
                  )}
                  {newInput(
                    "Mobile Number",
                    "beneficiary1Mobile",
                    state.beneficiary1Mobile
                  )}
                  {newInput(
                    "Telephone Number",
                    "beneficiary1Telno",
                    state.beneficiary1Telno
                  )}
                  {newInput(
                    "Email Address",
                    "beneficiary1Email",
                    state.beneficiary1Email
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
                    <span id="main-name">{state.beneficiary1Name}</span>
                  </h2>
                  <h3>Primary Beneficiary</h3>
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
                    state.beneficiary2Num
                  )}
                  {newInput("Name", "beneficiary2Name", state.beneficiary2Name)}
                  {newInput("Sex", "beneficiary2Sex", state.beneficiary2Sex)}
                  {newInput(
                    "Date of Birth",
                    "beneficiary2DOB",
                    state.beneficiary2DOB
                  )}
                  {newInput(
                    "Relationship to Insured",
                    "beneficiary2Rel",
                    state.beneficiary2Rel
                  )}
                  {newInput(
                    "% Share",
                    "beneficiary2Share",
                    state.beneficiary2Share
                  )}
                  {newInput(
                    "Type of Beneficiary",
                    "beneficiary2Type",
                    state.beneficiary2Type
                  )}
                  {newInput(
                    "Beneficiary Designation",
                    "beneficiary2Desig",
                    state.beneficiary2Desig
                  )}
                  {newInput(
                    "Place of Birth",
                    "beneficiary2POB",
                    state.beneficiary2POB
                  )}
                  {newInput(
                    "Nationality",
                    "beneficiary2Nationality",
                    state.beneficiary2Nationality
                  )}
                  {newInput(
                    "Present Address",
                    "beneficiary2PsAdrs",
                    state.beneficiary2PsAdrs
                  )}
                  {newInput(
                    "Present Country",
                    "beneficiary2PsCountry",
                    state.beneficiary2PsCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "beneficiary2PsZip",
                    state.beneficiary2PsZip
                  )}
                  {newInput(
                    "Mobile Number",
                    "beneficiary2Mobile",
                    state.beneficiary2Mobile
                  )}
                  {newInput(
                    "Telephone Number",
                    "beneficiary2Telno",
                    state.beneficiary2Telno
                  )}
                  {newInput(
                    "Email Address",
                    "beneficiary2Email",
                    state.beneficiary2Email
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
                  <Link to="/userProfile" className="user">
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
                  <Link to="/beneficiaryProfile" className="beneficiary">
                    Beneficiary
                  </Link>
                </li>
                <li
                  className={`display-nav ${
                    activePage.pathname === "/employerProfile" ? "active" : ""
                  }`}
                >
                  <Link to="/employerProfile" className="employer">
                    Employer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default BeneficiaryProfile;