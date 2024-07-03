import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo-main.svg";

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

  const [applicant, setApplicant] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ApplicantID = searchParams.get("applicantID");

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
                  <h3 className="info-header">Applicant Details</h3>
                </div>
                <div className="user-info">
                  {newInput(
                    "Membership Number",
                    "membershipNum",
                    applicant.ApplicantID
                  )}
                  {newInput("Name", "memberName", applicant.ApplicantName)}
                  {newInput(
                    "Salutation",
                    "memberSalutation",
                    applicant.Salutation
                  )}
                  {newInput(
                    "Other Legal Name/Alias",
                    "memberAlias",
                    applicant.Alias
                  )}
                  {newInput("Age", "memberAge", applicant.Age)}
                  {newInput("Sex", "memberSex", applicant.Sex)}
                  {newInput("Date of Birth", "memberDOB", applicant.Birthdate)}
                  {newInput(
                    "Place of Birth",
                    "memberPOB",
                    applicant.Birthplace
                  )}
                  {newInput("Civil Status", "memberCS", applicant.CivilStatus)}
                  {newInput(
                    "Nationality",
                    "memberNationality",
                    applicant.Nationality
                  )}
                  {newInput("Height", "memberHeight", applicant.Height)}
                  {newInput("Weight", "memberWeight", applicant.Weight)}
                  {newInput(
                    "Mobile Number",
                    "memberMobile",
                    applicant.MobileNumber
                  )}
                  {newInput("Telephone Number", "memberTelno", applicant.TelNo)}
                  {newInput(
                    "Email Address",
                    "memberEmail",
                    applicant.EmailAddress
                  )}
                  {newInput(
                    "Present Address",
                    "memberPsAdrs",
                    applicant.PresentAddress
                  )}
                  {newInput(
                    "Present Country",
                    "memberPsCountry",
                    applicant.PrsntAdrsCountry
                  )}
                  {newInput(
                    "Present ZIP Code",
                    "memberPsZip",
                    applicant.PrsntAdrsZIP
                  )}
                  {newInput(
                    "Permanent Address",
                    "memberPmAdrs",
                    applicant.PermanentAddress
                  )}
                  {newInput(
                    "Permanent Country",
                    "memberPmCountry",
                    applicant.PermntAdrsCountry
                  )}
                  {newInput(
                    "Permanent ZIP Code",
                    "memberPmZip",
                    applicant.PermntAdrsZIP
                  )}
                  {newInput(
                    "Occupation",
                    "memberOccupation",
                    applicant.Occupation
                  )}
                  {newInput("Position", "memberPosition", applicant.Position)}
                  {newInput(
                    "Nature of Work/Business",
                    "memberNature",
                    applicant.ApplicantWorkNature
                  )}
                  {newInput(
                    "Source of Funds",
                    "memberSOF",
                    applicant.SourceOfFunds
                  )}
                  {newInput(
                    "Gross Annual Income",
                    "memberGAI",
                    applicant.GrossAnnualIncome
                  )}
                  {newInput("Net Worth", "memberNW", applicant.NetWorth)}
                  {newInput("Date Hired", "memberHired", applicant.DateHired)}
                  {newInput(
                    "Date of Regularization",
                    "memberRegularization",
                    applicant.DateOfRegularization
                  )}
                  {newInput(
                    "Monthly Income",
                    "memberIncome",
                    applicant.GrossAnnualIncome
                  )}
                  {newInput("SSS/GSIS Number", "memberSSS", applicant.SSSID)}
                  {newInput("TIN ID", "memberTIN", applicant.TINID)}
                  {newInput(
                    "Other ID #1 Name",
                    "memberOtherID1",
                    applicant.OtherID
                  )}
                  {newInput(
                    "Other ID #1 Number",
                    "memberOtherIDNum1",
                    applicant.OtherIDNumber
                  )}
                  {newInput(
                    "Other ID #2 Name",
                    "memberOtherID2",
                    applicant.OtherID2
                  )}
                  {newInput(
                    "Other ID #2 Number",
                    "memberOtherIDNum2",
                    applicant.OtherID2Number
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
                    to={`/userProfile?applicantID=${applicant.ApplicantID}`}
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
                    to={`/beneficiaryProfile?applicantID=${applicant.ApplicantID}`}
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
                    to={`/employerProfile?applicantID=${applicant.ApplicantID}&employerCode=${applicant.EmployerCode}`}
                    className="employer nav-label"
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

export default UserProfile;
