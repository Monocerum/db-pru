import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBBeneficiaries() {
  const [beneficiary, setBeneficiary] = useState([]);
  const activePage = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5020/beneficiaries")
      .then((response) => {
        setBeneficiary(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const deleteData = async(ApplicantID, BeneficiaryCode) => { 
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/beneficiaries/${ApplicantID}/${BeneficiaryCode}`);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div>
        <main className="cont">
          <SideNav />
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
            <div className="db-container">
              <div className="db-header">
                <h2 className="db-name">Beneficiaries</h2>
                <div className="action-buttons">
                  <ul>
                    <Link to="/apply" className="add-button action-btn">
                      Add
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    placeholder="Search Employee, Beneficiary, Employee"
                  />
                  <button className="search-button">Search</button>
                </div>
                <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Beneficiary Code</th>
                      <th>Applicant ID</th>
                      <th>Name</th>
                      <th>Birthdate</th>
                      <th>Sex</th>
                      <th>Relationship to Insured</th>
                      <th>Percent Share</th>
                      <th>Type of Beneficiary</th>
                      <th>Designation</th>
                      <th>Place of Birth</th>
                      <th>Nationality</th>
                      <th>Present Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
                      <th>Mobile Number</th>
                      <th>Telephone Number</th>
                      <th>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiary.map((b, key) => (
                      <tr key={key}>
                        <td className="data-container">
                          <Link
                            to={`/beneficiaryDetails?applicantID=${b.ApplicantID}&beneficiaryCode=${b.BeneficiaryCode}`}
                          >
                            <i className="bx bx-show-alt"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <Link
                            to={`/beneficiaryDetails?applicantID=${b.ApplicantID}&beneficiaryCode=${b.BeneficiaryCode}&autoEdit=true`}
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <i className="bx bx-trash" onClick={() => deleteData(b.ApplicantID, b.BeneficiaryCode)}></i>
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryCode}
                        </td>
                        <td className="data-container">
                          {b.ApplicantID}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryName}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryDOB}
                        </td>
                        <td className="data-container">
                          {b.BeneficiarySex}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryRelationship}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryPrcntShare}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryType}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryDesignation}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryPOB}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryNationality}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryPrsntAdrs}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryCountry}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryZIP}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryMobileNum}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryTelNo}
                        </td>
                        <td className="data-container">
                          {b.BeneficiaryEmailAdrs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="info-nav">
                <ul>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbUsers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbUsers" className="user nav-label">
                      User
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbMembers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbMembers" className="applicant nav-label">
                      Member
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbBeneficiaries" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/dbBeneficiaries"
                      className="beneficiary nav-label"
                    >
                      Beneficiary
                    </Link>
                  </li>
                  <li
                    className={`display-nav ${
                      activePage.pathname === "/dbEmployers" ? "active" : ""
                    }`}
                  >
                    <Link to="/dbEmployers" className="employer nav-label">
                      Employer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DBBeneficiaries;
