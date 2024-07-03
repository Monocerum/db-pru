import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../customer_styles.css";
import PruLogo from '../../assets/pru-logo-main.svg';

const UserProfile = () => {
  const [applicant, setApplicant] = useState([]); 

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ApplicantID = searchParams.get('applicantID');

    console.log(ApplicantID);
    
    if (ApplicantID) {
      axios
        .get(`http://localhost:5020/applicants/${ApplicantID}`)
        .then((response) => {
          setApplicant(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

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
        disabled
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
            <div className="primary-container">
              <h3 className="info-header" id="infoHeader">PERSONAL INFORMATION</h3>
              <div className="primary">
                <div className="applicant-information">
                  <div className="personal-header">
                    <div className="header-info">
                      <h2>
                        <span id="main-salutation">{applicant.Salutation}</span>{" "}
                        <span id="main-name">{applicant.ApplicantName}</span>
                      </h2>
                    </div>
                  </div>
                  <div className="personal-info">
                    <div className="user-info">
                        {newInput("Membership Number", "membershipNum", applicant.ApplicantID)}
                        {newInput("Name", "memberName", applicant.ApplicantName)}
                        {newInput("Salutation", "memberSalutation", applicant.Salutation)}
                        {newInput("Other Legal Name/Alias", "memberAlias", applicant.Alias)}
                        {newInput("Age", "memberAge", applicant.Age)}
                        {newInput("Sex", "memberSex", applicant.Sex)}
                        {newInput("Date of Birth", "memberDOB", applicant.Birthdate)}
                        {newInput("Place of Birth", "memberPOB", applicant.Birthplace)}
                        {newInput("Civil Status", "memberCS", applicant.CivilStatus)}
                        {newInput("Nationality", "memberNationality", applicant.Nationality)}
                        {newInput("Height", "memberHeight", applicant.Height)}
                        {newInput("Weight", "memberWeight", applicant.Weight)}
                        {newInput("Mobile Number", "memberMobile", applicant.MobileNumber)}
                        {newInput("Telephone Number", "memberTelno", applicant.TelNo)}
                        {newInput("Email Address", "memberEmail", applicant.EmailAddress)}
                        {newInput("Present Address", "memberPsAdrs", applicant.PresentAddress)}
                        {newInput("Present Country", "memberPsCountry", applicant.PrsntAdrsCountry)}
                        {newInput("Present ZIP Code", "memberPsZip", applicant.PrsntAdrsZIP)}
                        {newInput("Permanent Address", "memberPmAdrs", applicant.PermanentAddress)}
                        {newInput("Permanent Country", "memberPmCountry", applicant.PermntAdrsCountry)}
                        {newInput("Permanent ZIP Code", "memberPmZip", applicant.PermntAdrsZIP)}
                        {newInput("Occupation", "memberOccupation", applicant.Occupation)}
                        {newInput("Position", "memberPosition", applicant.Position)}
                        {newInput("Nature of Work/Business", "memberNature", applicant.ApplicantWorkNature)}
                        {newInput("Source of Funds", "memberSOF", applicant.SourceOfFunds)}
                        {newInput("Gross Annual Income", "memberGAI", applicant.GrossAnnualIncome)}
                        {newInput("Net Worth", "memberNW", applicant.NetWorth)}
                        {newInput("Date Hired", "memberHired", applicant.DateHired)}
                        {newInput("Date of Regularization", "memberRegularization", applicant.DateOfRegularization)}
                        {newInput("Monthly Income", "memberIncome", applicant.GrossAnnualIncome)}
                        {newInput("SSS/GSIS Number", "memberSSS", applicant.SSSID)}
                        {newInput("TIN ID", "memberTIN", applicant.TINID)}
                        {newInput("Other ID #1 Name", "memberOtherID1", applicant.OtherID)}
                        {newInput("Other ID #1 Number", "memberOtherIDNum1", applicant.OtherIDNumber)}
                        {newInput("Other ID #2 Name", "memberOtherID2", applicant.OtherID2)}
                        {newInput("Other ID #2 Number", "memberOtherIDNum2", applicant.OtherID2Number)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-nav">
                <ul>
                  <li className={`display-nav ${activePage.pathname === '/userProfile' ? 'active' : ''}`}>
                    <Link to={`/userProfile?applicantID=${applicant.ApplicantID}`} className="user">Member</Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === '/beneficiaryProfile' ? 'active' : ''}`}>
                    <Link to={`/beneficiaryProfile?applicantID=${applicant.ApplicantID}`} className="beneficiary">Beneficiary</Link>
                  </li>
                </ul>
              </div>
              <div className="user-controls">
                <div className="logOut">
                  <button className="logOut-btn" id="logOut">LOG OUT</button>
                </div>
                <Link to={`/userProfile?applicantID=${applicant.ApplicantID}`} className="return-profile">Return to profile.</Link>
              </div>
            </div>
            <br />
            <br />
            </div>
          </div>
          
      </main>
      <footer></footer>
    </div>
  );
};

export default UserProfile;