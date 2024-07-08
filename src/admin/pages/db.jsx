import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBMembers() {
  const [entry, setEntry] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "ApplicantID", "ApplicantName", "Age", "GrossAnnualIncome", "MonthlyIncome",
    "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry"
  ]);
  
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/all")
      .then((response) => {
        setEntry(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch last UserID from login table
    axios
      .get("http://localhost:5020/lastUserID")
      .then((response) => {
        if (response.data.lastUserId) {
          setLastUserId(response.data.lastUserId);
        } else {
          console.error("No users found.");
          setError("No users found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching last UserID:", error);
      });

  }, []);

  const activePage = useLocation();

  const handleAddMember = () => {
    if (lastUserId) {
     navigate(`/apply?userID=${lastUserId}`);

    } else {
      console.error("No user found.");
    }
  };

  const showAllAttributes = () => {
    setVisibleAttributes([
      "ApplicantID", "ApplicantName", "Age", "GrossAnnualIncome", "MonthlyIncome",
      "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry"
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
                <h2 className="db-name">Database</h2>
                <div className="action-buttons">
                  <button className="add-button" onClick={handleAddMember}>Add Member</button>
                  {/* <ul>
                    <Link to="/apply" className="add-button action-btn">
                      Add
                    </Link>
                  </ul> */}
                </div>
              </div>
              <div className="action-db">
                <div className="search-container">
                  <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Member Name"
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
                <button
                  className={`show-btns ${visibleAttributes.includes("ApplicantID") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["ApplicantID"])}
                >
                  ApplicantID
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("ApplicantName") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["ApplicantName"])}
                >
                  ApplicantName
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("Age") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["Age"])}
                >
                  Age
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("Position") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["Position"])}
                >
                  Position
                </button>
                <button
                  className={`show-btns ${visibleAttributes.includes("GrossAnnualIncome") ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["GrossAnnualIncome", "MonthlyIncome"])}
                >
                  Salary
                </button>
                <button
                  className={`show-btns ${(visibleAttributes.includes("PresentAddress") && visibleAttributes.includes("PrsntAdrsCountry")) ? 'active' : ''}`}
                  onClick={() => showSpecificAttributes(["PresentAddress", "PrsntAdrsCountry"])}
                >
                  Location
                </button>
              </div>
              <div className="db">
                <table className="table database-table">
                  <thead>
                    <tr>
                    <th id="id-header">ID</th>
                      <th id="id-header">Employer or Business Code</th>
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
                      <th>Employer or Business Code</th>
                      <th>Name</th>
                      <th>Nature of Work of Employer</th>
                      <th>Telephone Number</th>
                      <th>Present Address</th>
                      <th>Country</th>
                      <th>ZIP</th>
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
                    {entry.filter((e) => {
                      return search.trim() === '' || e.ApplicantName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((e, key) => (
                      <tr key={key}>
                        <td className="data-container">{e.ApplicantID}</td>
                        <td className="data-container">{e.EmployerCode}</td>
                        <td className="data-container">{e.ApplicantName}</td>
                        <td className="data-container">{e.Salutation}</td>
                        <td className="data-container">{e.Alias}</td>
                        <td className="data-container">{e.Age}</td>
                        <td className="data-container">{e.Birthdate}</td>
                        <td className="data-container">{e.Birthplace}</td>
                        <td className="data-container">{e.CivilStatus}</td>
                        <td className="data-container">{e.Nationality}</td>
                        <td className="data-container">{e.Height}</td>
                        <td className="data-container">{e.Weight}</td>
                        <td className="data-container">{e.Sex}</td>
                        <td className="data-container">{e.PresentAddress}</td>
                        <td className="data-container">{e.PrsntAdrsCountry}</td>
                        <td className="data-container">{e.PrsntAdrsZIP}</td>
                        <td className="data-container">{e.PermanentAddress}</td>
                        <td className="data-container">{e.PermntAdrsCountry}</td>
                        <td className="data-container">{e.PermntAdrsZIP}</td>
                        <td className="data-container">{e.Occupation}</td>
                        <td className="data-container">{e.Position}</td>
                        <td className="data-container">{e.ApplicantWorkNature}</td>
                        <td className="data-container">{e.SourceOfFunds}</td>
                        <td className="data-container">{e.GrossAnnualIncome}</td>
                        <td className="data-container">{e.NetWorth}</td>
                        <td className="data-container">{e.DateHired}</td>
                        <td className="data-container">{e.DateOfRegularization}</td>
                        <td className="data-container">{e.MonthlyIncome}</td>
                        <td className="data-container">{e.SSSID}</td>
                        <td className="data-container">{e.TINID}</td>
                        <td className="data-container">{e.OtherID}</td>
                        <td className="data-container">{e.OtherIDNumber}</td>
                        <td className="data-container">{e.OtherID2}</td>
                        <td className="data-container">{e.OtherID2Number}</td>
                        <td className="data-container">{e.MobileNumber}</td>
                        <td className="data-container">{e.TelNo}</td>
                        <td className="data-container">{e.EmailAddress}</td>
                        <td className="data-container employer-data">
                          {e.EmployerCode}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusName}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusNature}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusTelNo}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusAdrs}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusCountry}
                        </td>
                        <td className="data-container employer-data">
                          {e.EmpOrBusZIP}
                        </td>
                        <td className="data-container">{e.BeneficiaryCode}</td>
                        <td className="data-container">{e.ApplicantID}</td>
                        <td className="data-container">{e.BeneficiaryName}</td>
                        <td className="data-container">{e.BeneficiaryDOB}</td>
                        <td className="data-container">{e.BeneficiarySex}</td>
                        <td className="data-container">
                          {e.BeneficiaryRelationship}
                        </td>
                        <td className="data-container">
                          {e.BeneficiaryPrcntShare}
                        </td>
                        <td className="data-container">{e.BeneficiaryType}</td>
                        <td className="data-container">
                          {e.BeneficiaryDesignation}
                        </td>
                        <td className="data-container">{e.BeneficiaryPOB}</td>
                        <td className="data-container">
                          {e.BeneficiaryNationality}
                        </td>
                        <td className="data-container">
                          {e.BeneficiaryPrsntAdrs}
                        </td>
                        <td className="data-container">
                          {e.BeneficiaryCountry}
                        </td>
                        <td className="data-container">{e.BeneficiaryZIP}</td>
                        <td className="data-container">
                          {e.BeneficiaryMobileNum}
                        </td>
                        <td className="data-container">{e.BeneficiaryTelNo}</td>
                        <td className="data-container">
                          {e.BeneficiaryEmailAdrs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="info-nav">
                <ul>
                  <li className={`display-nav ${activePage.pathname === "/dbUsers" ? "active" : ""}`}>
                    <Link to="/dbUsers" className="user nav-label">
                      User
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbMembers" ? "active" : ""}`}>
                    <Link to="/dbMembers" className="applicant nav-label">
                      Member
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbBeneficiaries" ? "active" : ""}`}>
                    <Link to="/dbBeneficiaries" className="beneficiary nav-label">
                      Beneficiary
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbEmployers" ? "active" : ""}`}>
                    <Link to="/dbEmployers" className="employer nav-label">
                      Employer
                    </Link>
                  </li>
                  <li className={`display-nav ${activePage.pathname === "/dbAll" ? "active" : ""}`}>
                    <Link to="/dbAll" className="all nav-label">
                        Joined
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
