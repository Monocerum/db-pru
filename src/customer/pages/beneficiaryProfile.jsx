import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../customer_styles.css";
import PruLogo from "../../assets/pru-logo-main.svg";

const BeneficiaryProfile = () => {
  const [primary, setPrimary] = useState([]);
  const [secondary, setSecondary] = useState([]);

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
            <div className="primary-container">
              <h3 className="info-header" id="infoHeader">
                BENEFICIARY INFORMATION
              </h3>
              <div className="primary">
                <div className="beneficiary-information">
                  <div className="personal-header">
                    <div className="header-info">
                      <h2>
                        <span id="main-name beneficiary1Name">
                          {primary.BeneficiaryName}
                        </span>
                      </h2>
                      <h3>Primary Beneficiary of {primary.ApplicantName}</h3>
                    </div>
                  </div>
                  <div className="personal-info">
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
                      {newInput(
                        "Sex",
                        "beneficiary2Sex",
                        primary.BeneficiarySex
                      )}
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
                      <h2>
                        <span id="main-name beneficiary2Name">
                          {secondary.BeneficiaryName}
                        </span>
                      </h2>
                      <h3>Secondary Beneficiary of {secondary.ApplicantName}</h3>
                    </div>
                  </div>
                  <div className="personal-info">
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
                      {newInput(
                        "Sex",
                        "beneficiary2Sex",
                        secondary.BeneficiarySex
                      )}
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
                    </div>
                  </div>
                </div>
                <div className="info-nav">
                  <ul>
                    <li
                      className={`display-nav ${
                        activePage.pathname === "/userProfile" ? "active" : ""
                      }`}
                    >
                      <Link
                        to={`/userProfile?applicantID=${primary.ApplicantID}`}
                        className="user"
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
                        className="beneficiary"
                      >
                        Beneficiary
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="user-controls">
                <div className="logOut">
                  <button className="logOut-btn" id="logOut">
                    LOG OUT
                  </button>
                </div>
                <Link
                  to={`/userProfile?applicantID=${primary.ApplicantID}`}
                  className="return-profile"
                >
                  Return to profile.
                </Link>
              </div> */}
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
