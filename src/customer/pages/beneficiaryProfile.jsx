import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../customer_styles.css";
import PruLogo from '../../assets/pru-logo-main.svg';

const BeneficiaryProfile = () => {
  const [primary, setPrimary] = useState([]); 
  const [secondary, setSecondary] = useState([]); 

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ApplicantID = searchParams.get('applicantID');

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
              <h3 className="info-header" id="infoHeader">BENEFICIARY INFORMATION</h3>
              <div className="primary">
                <div className="beneficiary-information">
                  <div className="personal-header">
                    <div className="header-info">
                      {primary.map((beneficiary, key) => (
                        <div key={key}>
                          <h2><span id="main-name beneficiary1Name">{beneficiary.BeneficiaryName}</span></h2>
                          <h3>Primary Beneficiary of {beneficiary.ApplicantName}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="personal-info">
                    <div className="beneficiary-info">
                    {primary.map((beneficiary, key) => (
                        <div key={key}>
                          {newInput("Beneficiary Number", "beneficiary2Num", beneficiary.BeneficiaryCode)}
                          {newInput("Name", "beneficiary2Name", beneficiary.BeneficiaryName)}
                          {newInput("Sex", "beneficiary2Sex", beneficiary.BeneficiarySex)}
                          {newInput("Date of Birth", "beneficiary2DOB", beneficiary.BeneficiaryDOB)}
                          {newInput("Relationship to Insured", "beneficiary2Rel", beneficiary.BeneficiaryRelationship)}
                          {newInput("% Share", "beneficiary2Share", beneficiary.BeneficiaryPrcntShare)}
                          {newInput("Type of Beneficiary", "beneficiary2Type", beneficiary.BeneficiaryType)}
                          {newInput("Beneficiary Designation", "beneficiary2Desig", beneficiary.BeneficiaryDesignation)}
                          {newInput("Place of Birth", "beneficiary2POB", beneficiary.BeneficiaryPOB)}
                          {newInput("Nationality", "beneficiary2Nationality", beneficiary.BeneficiaryNationality)}
                          {newInput("Present Address", "beneficiary2PsAdrs", beneficiary.BeneficiaryPrsntAdrs)}
                          {newInput("Present Country", "beneficiary2PsCountry", beneficiary.BeneficiaryCountry)}
                          {newInput("Present ZIP Code", "beneficiary2PsZip", beneficiary.BeneficiaryZIP)}
                          {newInput("Mobile Number", "beneficiary2Mobile", beneficiary.BeneficiaryMobileNum)}
                          {newInput("Telephone Number", "beneficiary2Telno", beneficiary.BeneficiaryTelNo)}
                          {newInput("Email Address", "beneficiary2Email", beneficiary.BeneficiaryEmailAdrs)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary-container">
              <div className="secondary">
                <div className="beneficiary-information">
                  <div className="personal-header">
                    <div className="header-info">
                    {secondary.map((beneficiary, key) => (
                        <div key={key}>
                          <h2><span id="main-name beneficiary2Name">{beneficiary.BeneficiaryName}</span></h2>
                          <h3>Primary Beneficiary of {beneficiary.ApplicantName}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="personal-info">
                    <div className="beneficiary-info">
                    {secondary.map((beneficiary, key) => (
                        <div key={key}>
                          {newInput("Beneficiary Number", "beneficiary2Num", beneficiary.BeneficiaryCode)}
                          {newInput("Name", "beneficiary2Name", beneficiary.BeneficiaryName)}
                          {newInput("Sex", "beneficiary2Sex", beneficiary.BeneficiarySex)}
                          {newInput("Date of Birth", "beneficiary2DOB", beneficiary.BeneficiaryDOB)}
                          {newInput("Relationship to Insured", "beneficiary2Rel", beneficiary.BeneficiaryRelationship)}
                          {newInput("% Share", "beneficiary2Share", beneficiary.BeneficiaryPrcntShare)}
                          {newInput("Type of Beneficiary", "beneficiary2Type", beneficiary.BeneficiaryType)}
                          {newInput("Beneficiary Designation", "beneficiary2Desig", beneficiary.BeneficiaryDesignation)}
                          {newInput("Place of Birth", "beneficiary2POB", beneficiary.BeneficiaryPOB)}
                          {newInput("Nationality", "beneficiary2Nationality", beneficiary.BeneficiaryNationality)}
                          {newInput("Present Address", "beneficiary2PsAdrs", beneficiary.BeneficiaryPrsntAdrs)}
                          {newInput("Present Country", "beneficiary2PsCountry", beneficiary.BeneficiaryCountry)}
                          {newInput("Present ZIP Code", "beneficiary2PsZip", beneficiary.BeneficiaryZIP)}
                          {newInput("Mobile Number", "beneficiary2Mobile", beneficiary.BeneficiaryMobileNum)}
                          {newInput("Telephone Number", "beneficiary2Telno", beneficiary.BeneficiaryTelNo)}
                          {newInput("Email Address", "beneficiary2Email", beneficiary.BeneficiaryEmailAdrs)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="info-nav">
                  <ul>
                  {primary.map((beneficiary, key) => (
                    <React.Fragment key={key}>
                      <li className={`display-nav ${activePage.pathname === '/userProfile' ? 'active' : ''}`}>
                        <Link to={`/userProfile?applicantID=${beneficiary.ApplicantID}`} className="user">Member</Link>
                      </li>
                      <li className={`display-nav ${activePage.pathname === '/beneficiaryProfile' ? 'active' : ''}`}>
                        <Link to={`/beneficiaryProfile?applicantID=${beneficiary.ApplicantID}`} className="beneficiary">Beneficiary</Link>
                      </li>
                    </React.Fragment>
                  ))}
                  </ul>
                </div>
              </div>
              <div className="user-controls">
                  <div className="logOut">
                    <button className="logOut-btn" id="logOut">LOG OUT</button>
                  </div>
                  {primary.map((beneficiary, key) => (
                    <React.Fragment key={key}>
                      <Link to={`/userProfile?applicantID=${beneficiary.ApplicantID}`} className="return-profile">Return to profile.</Link>
                    </React.Fragment>
                  ))}
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

export default BeneficiaryProfile;