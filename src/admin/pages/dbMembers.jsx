import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBMembers() {
  const [applicant, setApplicant] = useState([]);
  
  const[search, setSearch] = useState('');
  console.log(search)

  useEffect(() => {
    axios
      .get("http://localhost:5020/applicants")
      .then((response) => {
        setApplicant(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const deleteData = async(ApplicantID) => { 
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/applicants/${ApplicantID}`);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const activePage = useLocation();

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
                <h2 className="db-name">Members</h2>
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
                    onChange={(e) => setSearch(e.target.value)}   
                    placeholder="Search Employee, Beneficiary, Employee"
                  />
                  <button className="search-button">Search</button>
                </div>



                <div className="db-buttons">
                  <button className="reset-button">Reset</button>
                  <button className="save-button">Save</button>
                </div>
              </div>

                    <div className="show-flex">
                        <button className ="show-btns"> Show All Attributes </button>
                        <button className ="show-btns"> ApplicantID </button>
                        <button className ="show-btns"> ApplicantName </button>
                        <button className ="show-btns"> Age </button>
                        <button className ="show-btns"> Salary </button>
                        <button className ="show-btns"> Location </button>
                        </div>



              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>ID</th>
                      <th>Employer or Business Code</th>
                      <th>Name</th>
                      <th>Salutation</th>
                      <th>Alias</th>
                      <th>Age</th>
                      <th>Birthdate</th>
                      <th>Birthplace</th>
                      <th>Civil Status</th>
                      <th>Nationality</th>
                      <th>Height</th>
                      <th>Weight</th>
                      <th>Sex</th>
                      <th>Present Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
                      <th>Permanent Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
                      <th>Occupation</th>
                      <th>Position</th>
                      <th>Nature of Work/Business</th>
                      <th>Source of Funds</th>
                      <th>Gross Annual Income</th>
                      <th>Net Worth</th>
                      <th>Date Hired</th>
                      <th>Date of Regularization</th>
                      <th>Monthly Income</th>
                      <th>SSS ID</th>
                      <th>TIN ID</th>
                      <th>Other ID</th>
                      <th>Other ID Number</th>
                      <th>Other ID #2</th>
                      <th>Other ID #2 Number</th>
                      <th>Mobile Number</th>
                      <th>Telephone Number</th>
                      <th>Email Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.filter((a) => {
                      return search.toLowerCase() === ''? a 
                      : a.ApplicantName.toLowerCase().includes(search)
                    })
                    .map((a,key) => (
                      <tr key={key}>
                        <td className="data-container">
                          <Link
                            to={`/userProfile?applicantID=${a.ApplicantID}`}
                          >
                            <i className="bx bx-show-alt"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <Link
                            to={`/userProfile?applicantID=${a.ApplicantID}&autoEdit=true`}
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                        </td>
                        <td className="data-container">
                          <i className="bx bx-trash" onClick={() => deleteData(a.ApplicantID)}></i>
                        </td>
                        <td className="data-container">
                          {a.ApplicantID}
                        </td>
                        <td className="data-container">
                          {a.EmployerCode}
                        </td>
                        <td className="data-container">
                          {a.ApplicantName}
                        </td>
                        <td className="data-container">
                          {a.Salutation}
                        </td>
                        <td className="data-container">
                          {a.Alias}
                        </td>
                        <td className="data-container">
                          {a.Age}
                        </td>
                        <td className="data-container">
                          {a.Birthdate}
                        </td>
                        <td className="data-container">
                          {a.Birthplace}
                        </td>
                        <td className="data-container">
                          {a.CivilStatus}
                        </td>
                        <td className="data-container">
                          {a.Nationality}
                        </td>
                        <td className="data-container">
                          {a.Height}
                        </td>
                        <td className="data-container">
                          {a.Weight}
                        </td>
                        <td className="data-container">
                          {a.Sex}
                        </td>
                        <td className="data-container">
                          {a.PresentAddress}
                        </td>
                        <td className="data-container">
                          {a.PrsntAdrsCountry}
                        </td>
                        <td className="data-container">
                          {a.PrsntAdrsZIP}
                        </td>
                        <td className="data-container">
                          {a.PermanentAddress}
                        </td>
                        <td className="data-container">
                          {a.PermntAdrsCountry}
                        </td>
                        <td className="data-container">
                          {a.PermntAdrsZIP}
                        </td>
                        <td className="data-container">
                          {a.Occupation}
                        </td>
                        <td className="data-container">
                          {a.Position}
                        </td>
                        <td className="data-container">
                          {a.ApplicantWorkNature}
                        </td>
                        <td className="data-container">
                          {a.SourceOfFunds}
                        </td>
                        <td className="data-container">
                          {a.GrossAnnualIncome}
                        </td>
                        <td className="data-container">
                          {a.NetWorth}
                        </td>
                        <td className="data-container">
                          {a.DateHired}
                        </td>
                        <td className="data-container">
                          {a.DateOfRegularization}
                        </td>
                        <td className="data-container">
                          {a.MonthlyIncome}
                        </td>
                        <td className="data-container">
                          {a.SSSID}
                        </td>
                        <td className="data-container">
                          {a.TINID}
                        </td>
                        <td className="data-container">
                          {a.OtherID}
                        </td>
                        <td className="data-container">
                          {a.OtherIDNumber}
                        </td>
                        <td className="data-container">
                          {a.OtherID2}
                        </td>
                        <td className="data-container">
                          {a.OtherID2Number}
                        </td>
                        <td className="data-container">
                          {a.MobileNumber}
                        </td>
                        <td className="data-container">
                          {a.TelNo}
                        </td>
                        <td className="data-container">
                          {a.EmailAddress}
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

export default DBMembers;
