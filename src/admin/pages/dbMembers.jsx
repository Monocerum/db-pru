import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styles
import "../../styles.css";

// Assets
import PruLogo from "../../assets/pru-logo.svg";
import SideNav from "../components/sidenav";

function DBMembers() {
  const [applicant, setApplicant] = useState([]);
  const [visibleAttributes, setVisibleAttributes] = useState([
    "ApplicantID", "ApplicantName", "Age", "GrossAnnualIncome", "MonthlyIncome",
    "PresentAddress", "PrsntAdrsCountry", "PermanentAddress", "PermntAdrsCountry"
  ]);
  
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [lastUserId, setLastUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5020/applicants")
      .then((response) => {
        setApplicant(response.data);
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

  const deleteData = async (ApplicantID) => {
    if (window.confirm("Do you want to delete record?")) {
      try {
        await axios.delete(`http://localhost:5020/applicants/${ApplicantID}`);
        setApplicant(applicant.filter(app => app.ApplicantID !== ApplicantID));
      } catch (err) {
        console.log(err);
      }
    }
  };

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
                <h2 className="db-name">Members</h2>
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
                    placeholder="Search Employee Name"
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
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      <th id="icon-header"></th>
                      {visibleAttributes.includes("ApplicantID") && <th id="id-header">ApplicantID</th>}
                      {visibleAttributes.includes("ApplicantName") && <th>Name</th>}
                      {visibleAttributes.includes("Age") && <th>Age</th>}
                      {visibleAttributes.includes("GrossAnnualIncome") && <th>Gross Annual Income</th>}
                      {visibleAttributes.includes("MonthlyIncome") && <th>Monthly Income</th>}
                      {visibleAttributes.includes("PresentAddress") && <th>Present Address</th>}
                      {visibleAttributes.includes("PrsntAdrsCountry") && <th>Country</th>}
                      {visibleAttributes.includes("PermanentAddress") && <th>Permanent Address</th>}
                      {visibleAttributes.includes("PermntAdrsCountry") && <th>Country</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {applicant.filter((a) => {
                      return search.trim() === '' || a.ApplicantName.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((a, key) => (
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
                        {visibleAttributes.includes("ApplicantID") && <td className="data-container">{a.ApplicantID}</td>}
                        {visibleAttributes.includes("ApplicantName") && <td className="data-container">{a.ApplicantName}</td>}
                        {visibleAttributes.includes("Age") && <td className="data-container">{a.Age}</td>}
                        {visibleAttributes.includes("GrossAnnualIncome") && <td className="data-container">{a.GrossAnnualIncome}</td>}
                        {visibleAttributes.includes("MonthlyIncome") && <td className="data-container">{a.MonthlyIncome}</td>}
                        {visibleAttributes.includes("PresentAddress") && <td className="data-container">{a.PresentAddress}</td>}
                        {visibleAttributes.includes("PrsntAdrsCountry") && <td className="data-container">{a.PrsntAdrsCountry}</td>}
                        {visibleAttributes.includes("PermanentAddress") && <td className="data-container">{a.PermanentAddress}</td>}
                        {visibleAttributes.includes("PermntAdrsCountry") && <td className="data-container">{a.PermntAdrsCountry}</td>}
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
