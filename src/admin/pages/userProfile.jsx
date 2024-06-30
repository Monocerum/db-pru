import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import "../../styles.css";
import PruLogo from '../../assets/pru-logo-main.svg';

const UserProfile = () => {
  const initialState = {
    membershipNum: "A000001",
    memberName: "SURNAME, First Name Middle Name",
    memberSalutation: "[Salutation]",
    memberAlias: "[Other Legal Name/Alias]",
    memberAge: "[Age]",
    memberSex: "[Sex]",
    memberDOB: "[Date of Birth]",
    memberPOB: "[Place of Birth]",
    memberCS: "[Civil Status]",
    memberNationality: "[Nationality]",
    memberHeight: "[Height]",
    memberWeight: "[Weight]",
    memberMobile: "[Mobile Number]",
    memberTelno: "[Telephone Number]",
    memberEmail: "[Email Address]",
    memberPsAdrs: "[Present Address]",
    memberPsCountry: "[Present Country]",
    memberPsZip: "[Present ZIP Code]",
    memberPmAdrs: "[Permanent Address]",
    memberPmCountry: "[Permanent Country]",
    memberPmZip: "[Permanent ZIP Code]",
    memberOccupation: "[Occupation]",
    memberPosition: "[Position]",
    memberNature: "[Nature of Work/Business]",
    memberSOF: "[Source of Funds]",
    memberGAI: "[Gross Annual Income]",
    memberNW: "[Net Worth]",
    memberHired: "[Date Hired]",
    memberRegularization: "[Date of Regularization]",
    memberIncome: "[Monthly Income]",
    memberSSS: "[SSS/GSIS]",
    memberTIN: "[TIN ID]",
    memberOtherID1: "[ID Name]",
    memberOtherIDNum1: "[ID Number]",
    memberOtherID2: "[ID Name]",
    memberOtherIDNum2: "[ID Number]",
  };

  const [state, setState] = useState(initialState); 
  const [editActive, setEditStatus] = useState(false);

  const EditProfile = () => {
    if (window.confirm("Do you want to edit the user profile?")) {
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
            <div className="member-info">
              <div className="personal-header">
                <div className="header-info">
                  <h2>
                    <span id="main-salutation">{state.memberSalutation}</span>{" "}
                    <span id="main-name">{state.memberName}</span>
                  </h2>
                  <h3>Company Name</h3>
                </div>
                <div className="edit">
                  <button className={`edit-btn ${editActive ? 'active' : ''}`} id="userEdit" onClick={EditProfile} hidden={editActive}>EDIT</button>
                </div>
              </div>
              <div className="personal-info">
                <div className="personal-info-header">
                  <h3 className="info-header">Applicant Details</h3>
                </div>
                <div className="user-info">
                  {newInput("Membership Number", "membershipNum", state.membershipNum)}
                  {newInput("Name", "memberName", state.memberName)}
                  {newInput("Salutation", "memberSalutation", state.memberSalutation)}
                  {newInput("Other Legal Name/Alias", "memberAlias", state.memberAlias)}
                  {newInput("Age", "memberAge", state.memberAge)}
                  {newInput("Sex", "memberSex", state.memberSex)}
                  {newInput("Date of Birth", "memberDOB", state.memberDOB)}
                  {newInput("Place of Birth", "memberPOB", state.memberPOB)}
                  {newInput("Civil Status", "memberCS", state.memberCS)}
                  {newInput("Nationality", "memberNationality", state.memberNationality)}
                  {newInput("Height", "memberHeight", state.memberHeight)}
                  {newInput("Weight", "memberWeight", state.memberWeight)}
                  {newInput("Mobile Number", "memberMobile", state.memberMobile)}
                  {newInput("Telephone Number", "memberTelno", state.memberTelno)}
                  {newInput("Email Address", "memberEmail", state.memberEmail)}
                  {newInput("Present Address", "memberPsAdrs", state.memberPsAdrs)}
                  {newInput("Present Country", "memberPsCountry", state.memberPsCountry)}
                  {newInput("Present ZIP Code", "memberPsZip", state.memberPsZip)}
                  {newInput("Permanent Address", "memberPmAdrs", state.memberPmAdrs)}
                  {newInput("Permanent Country", "memberPmCountry", state.memberPmCountry)}
                  {newInput("Permanent ZIP Code", "memberPmZip", state.memberPmZip)}
                  {newInput("Occupation", "memberOccupation", state.memberOccupation)}
                  {newInput("Position", "memberPosition", state.memberPosition)}
                  {newInput("Nature of Work/Business", "memberNature", state.memberNature)}
                  {newInput("Source of Funds", "memberSOF", state.memberSOF)}
                  {newInput("Gross Annual Income", "memberGAI", state.memberGAI)}
                  {newInput("Net Worth", "memberNW", state.memberNW)}
                  {newInput("Date Hired", "memberHired", state.memberHired)}
                  {newInput("Date of Regularization", "memberRegularization", state.memberRegularization)}
                  {newInput("Monthly Income", "memberIncome", state.memberIncome)}
                  {newInput("SSS/GSIS Number", "memberSSS", state.memberSSS)}
                  {newInput("TIN ID", "memberTIN", state.memberTIN)}
                  {newInput("Other ID #1 Name", "memberOtherID1", state.memberOtherID1)}
                  {newInput("Other ID #1 Number", "memberOtherIDNum1", state.memberOtherIDNum1)}
                  {newInput("Other ID #2 Name", "memberOtherID2", state.memberOtherID2)}
                  {newInput("Other ID #2 Number", "memberOtherIDNum2", state.memberOtherIDNum2)}
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

export default UserProfile;