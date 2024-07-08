import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBBeneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "BeneficiaryCode", "ApplicantID", "BeneficiaryName", "BeneficiaryDOB", 
    "BeneficiarySex", "BeneficiaryRelationship", "BeneficiaryPrcntShare", 
    "BeneficiaryType", "BeneficiaryDesignation", "BeneficiaryPOB", 
    "BeneficiaryNationality", "BeneficiaryPrsntAdrs", "BeneficiaryCountry", 
    "BeneficiaryZIP", "BeneficiaryMobileNum", "BeneficiaryTelNo", 
    "BeneficiaryEmailAdrs"
  ]);
  const activePage = useLocation();

  const [search, setSearch] = useState('');
  console.log(search);

  useEffect(() => {
    axios
      .get("http://localhost:5020/beneficiaries")
      .then((response) => {
        setBeneficiaries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteData = async (ApplicantID, BeneficiaryCode) => { 
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/beneficiaries/${ApplicantID}/${BeneficiaryCode}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const showAllAttributes = () => {
    setVisibleAttributes([
      "BeneficiaryCode", "ApplicantID", "BeneficiaryName", "BeneficiaryDOB", 
      "BeneficiarySex", "BeneficiaryRelationship", "BeneficiaryPrcntShare", 
      "BeneficiaryType", "BeneficiaryDesignation", "BeneficiaryPOB", 
      "BeneficiaryNationality", "BeneficiaryPrsntAdrs", "BeneficiaryCountry", 
      "BeneficiaryZIP", "BeneficiaryMobileNum", "BeneficiaryTelNo", 
      "BeneficiaryEmailAdrs"
    ]);
  };

  const showSpecificAttributes = (attributes) => {
    setVisibleAttributes(attributes);
  };

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
                {/* <div className="action-buttons">
                  <ul>
                    <Link to="/apply" className="add-button action-btn">
                      Add
                    </Link>
                  </ul>
                </div> */}
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Beneficiary Name"
                  />
                  <button className="search-button">Search</button>
                </div>

                <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>

              <div className="show-flex">
                <button className="show-btns" onClick={showAllAttributes}>Show All Attributes</button>
                <button className="show-btns" onClick={() => showSpecificAttributes(["BeneficiaryCode"])}>BeneficiaryCode</button>
                <button className="show-btns" onClick={() => showSpecificAttributes(["BeneficiaryName"])}>BeneficiaryName</button>
                <button className="show-btns" onClick={() => showSpecificAttributes(["BeneficiaryPrsntAdrs", "BeneficiaryCountry"])}>Location</button>
              </div>

              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      {visibleAttributes.map((attr) => (
                        <th key={attr} className="id-header">{attr}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaries.filter((b) => {
                      return search.trim() === '' || b.BeneficiaryName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((b, key) => (
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
                        {visibleAttributes.map((attr) => (
                          <td key={`${attr}-${key}`} className="data-container">{b[attr]}</td>
                        ))}
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