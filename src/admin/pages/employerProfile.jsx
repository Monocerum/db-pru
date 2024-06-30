import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import "../../styles.css";
import PruLogo from '../../assets/pru-logo-main.svg';

const EmployerProfile = () => {
  const initialState = {
    employerNum: "E000001",
    employerName: "[Company Name]",
    employerNature: "[Nature of Work/Business]",
    employerTelno: "[Telephone Number]",
    employerPsAdrs: "[Present Address]",
    employerPsCountry: "[Present Country]",
    employerPsZip: "[Present ZIP Code]",
  };

  const [state, setState] = useState(initialState); 
  const [editActive, setEditStatus] = useState(false);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the employer/work/business profile?")) {
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
                <img src={PruLogo} alt="Pru Life U.K." className="profile-img" />
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
                  <h2><span id="main-name">{state.employerName}</span></h2>
                </div>
                <div className="edit">
                  <button className={`edit-btn ${editActive ? 'active' : ''}`} id="employerEdit" onClick={EditProfile} hidden={editActive}>EDIT</button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Employer Details</h3>
                </div>
                <div className="employer-info">
                  {newInput("Employer Number", "employerNum", state.employerNum)}
                  {newInput("Name", "employerName", state.employerName)}
                  {newInput("Nature of Work/Business", "employerNature", state.employerNature)}
                  {newInput("Telephone Number", "employerTelno", state.employerTelno)}
                  {newInput("Present Address", "employerPsAdrs", state.employerPsAdrs)}
                  {newInput("Present Country", "employerPsCountry", state.employerPsCountry)}
                  {newInput("Present ZIP Code", "employerPsZip", state.employerPsZip)}
                  <div className="btns">
                    <div className="cancel">
                      <button className="cancel-btn" id="userCancel" onClick={cancelEdit} hidden={!editActive}>
                        CANCEL EDITING
                      </button>
                    </div>
                    <div className="save">
                      <button className="save-btn" id="userSave" onClick={saveEdit} hidden={!editActive}>
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
                <li className={`display-nav ${activePage.pathname === '/userProfile' ? 'active' : ''}`}>
                  <Link to="/userProfile" className="user">Member</Link>
                </li>
                <li className={`display-nav ${activePage.pathname === '/beneficiaryProfile' ? 'active' : ''}`}>
                  <Link to="/beneficiaryProfile" className="b1">Beneficiary</Link>
                </li>
                <li className={`display-nav ${activePage.pathname === '/employerProfile' ? 'active' : ''}`}>
                  <Link to="/employerProfile" className="employer">Employer</Link>
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

export default EmployerProfile;